'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { credentialsSchema, requestPasswordResetSchema, updatePasswordSchema } from '@/lib/validation/auth';
import { FormState } from './types';

import { z } from "zod";
import { headers } from 'next/headers';
import { mapAuthError } from '@/lib/mapAuthError';

async function getOrigin(): Promise<string> {
    const originHeader = (await headers()).get('origin');
    return originHeader ?? process.env.NEXT_PUBLIC_SITE_URL!
}

function firstIssueMessage(error: z.ZodError): string {
    return error.issues[0]?.message ?? 'Eingabe ungültig.';
}

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient();

    const result = credentialsSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error), type: 'error' };
    }

    const { error } = await supabase.auth.signInWithPassword(result.data);

    if (error) {
        return { message: mapAuthError(error.message), type: 'error' };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signup(prevState: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient();

    const result = credentialsSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error), type: 'error' };
    }

    const { error } = await supabase.auth.signUp(result.data);

    if (error) {
        return { message: mapAuthError(error.message), type: 'error' };
    }

    return {
        message: 'Fast geschafft! Bitte bestätige deine Email-Adresse über den Link, den wir dir geschickt haben.',
        type: 'success',
    };
}

export async function loginWithGoogle() {
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
              encodeURIComponent('Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.')
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
    const supabase = await createClient();
    const origin = await getOrigin();

    const result = requestPasswordResetSchema.safeParse({
        email: formData.get('email'), 
    });

    if (!result.success) {
        return { message: firstIssueMessage(result.error), type: 'error' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
        redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      return { message: mapAuthError(error.message), type: 'error' };
    }

    return {
      message: 'Falls ein Konto mit dieser Email-Adresse existiert, haben wir dir einen Link zum Zurücksetzen geschickt.',
      type: 'success',
    };
}

export async function updatePassword(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const supabase = await createClient();

    const result = updatePasswordSchema.safeParse({
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!result.success) {
      return { message: firstIssueMessage(result.error), type: 'error' };
    }

    const { error } = await supabase.auth.updateUser({ password: result.data.password });

    if (error) {
        return { message: mapAuthError(error.message), type: 'error' };
    }

    redirect('/');
}