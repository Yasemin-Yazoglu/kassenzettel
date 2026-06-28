'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/lib/supabase/server'
import { loginSchema } from '@/app/lib/validation/auth';
import { FormState } from './types';

import { z } from "zod";

// TODO: Move action to lib/services/auth

export async function login(initialState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    const pretty = z.prettifyError(result.error);
    return { message: pretty, type: 'error' }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { message: error.message, type: 'error' }
  }

  // TODO: Handle success
  // revalidatePath('/', 'layout');
  // redirect('/account');
  return { message: '' }
}

export async function signup(initialState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    const pretty = z.prettifyError(result.error);
    return { message: pretty, type: 'error' }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    if (error.message.toLowerCase().includes('rate limit')) {
      return { message: 'Zu viele Versuche. Bitte warte einen Moment.', type: 'error' };
    }
    return { message: error.message, type: 'error' };
  }

  return {
    message: 'Fast geschafft! Bitte bestätige deine Email-Adresse über den Link, den wir dir geschickt haben.',
    type: 'success',
  };
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  // TODO: Handle error and success
  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}