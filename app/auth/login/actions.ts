'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/lib/supabase/server'
import { loginSchema } from '@/app/lib/validation/auth';

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(data);

  // TODO: Handle error
  if (!result.success) {
    redirect('/error');
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  // TODO: Handle error and success

  if (error) {
    redirect("/error");
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // TODO: Validate inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  // TODO: Handle error and success
  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
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