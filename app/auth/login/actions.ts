'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { credentialsSchema, requestPasswordResetSchema, updatePasswordSchema } from '@/lib/validation/auth';
import { FormState } from './types';

import { z } from "zod";
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { mapAuthErrorToKey } from '@/lib/mapAuthError';

async function getOrigin(): Promise<string> {
    const originHeader = (await headers()).get('origin');
    return originHeader ?? process.env.NEXT_PUBLIC_SITE_URL!
}

function firstIssueMessage(
    error: z.ZodError,
    t: Awaited<ReturnType<typeof getTranslations<'Validation'>>>
): string {
    const key = error.issues[0]?.message;
    return key && t.has(key) ? t(key) : t("passwordTooShort"); // Fallback, siehe Hinweis unten
}

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
    const tValidation = await getTranslations('Validation');
    const tErrors = await getTranslations('AuthErrors');
    const supabase = await createClient();

    const result = credentialsSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error, tValidation), type: 'error' };
    }

    const { error } = await supabase.auth.signInWithPassword(result.data);

    if (error) {
        return { message: tErrors(mapAuthErrorToKey(error)), type: 'error' };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signup(prevState: FormState, formData: FormData): Promise<FormState> {
    const tValidation = await getTranslations('Validation');
    const tErrors = await getTranslations('AuthErrors');
    const supabase = await createClient();

    const result = credentialsSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error, tValidation), type: 'error' };
    }

    const { error } = await supabase.auth.signUp(result.data);

    if (error) {
        return { message: tErrors(mapAuthErrorToKey(error)), type: 'error' };
    }

    const tActions = await getTranslations('AuthActions');
    return {
        message: tActions('signupSuccess'),
        type: 'success',
    };
}

export async function loginWithGoogle() {
    const tErrors = await getTranslations('AuthErrors');
    const supabase = await createClient();
    const origin = await getOrigin();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        redirect(
            '/auth/login?error=' +
              encodeURIComponent(tErrors('loginFailed'))
        );
    }

    if (data.url) {
        redirect(data.url);
    }
}

export async function requestPasswordReset(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const tValidation = await getTranslations('Validation');
    const tErrors = await getTranslations('AuthErrors');
    const tActions = await getTranslations('AuthActions');
    const supabase = await createClient();
    const origin = await getOrigin();

    const result = requestPasswordResetSchema.safeParse({
        email: formData.get('email'),
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error, tValidation), type: 'error' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
        redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      return { message: tErrors(mapAuthErrorToKey(error)), type: 'error' };
    }

    return {
      message: tActions('passwordResetSent'),
      type: 'success',
    };
}

export async function updatePassword(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const tValidation = await getTranslations('Validation');
    const tErrors = await getTranslations('AuthErrors');
    const supabase = await createClient();

    const result = updatePasswordSchema.safeParse({
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!result.success) {
      return { message: firstIssueMessage(result.error, tValidation), type: 'error' };
    }

    const { error } = await supabase.auth.updateUser({ password: result.data.password });

    if (error) {
        return { message: tErrors(mapAuthErrorToKey(error)), type: 'error' };
    }

    redirect('/');
}