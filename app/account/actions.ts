"use server";

import { changePasswordSchema } from "@/lib/validation/changePassword";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export async function changePassword(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const result = changePasswordSchema.safeParse({
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!result.success) {
        return { message: result.error.issues[0].message, type: "error" };
    }

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
        return { message: "Nicht angemeldet. Bitte melde dich erneut an.", type: "error" };
    }

    // verify the current password by re-authenticating with it
    const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: result.data.currentPassword,
    });

    if (reauthError) {
        return { message: "Das aktuelle Passwort ist falsch.", type: "error" };
    }

    const { error } = await supabase.auth.updateUser({
        password: result.data.newPassword,
    });

    if (error) {
        return { message: error.message, type: "error" };
    }

    return { message: "Passwort erfolgreich geändert.", type: "success" };
}

export async function deleteAccount(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const confirmText = formData.get("confirmText");
  
    if (typeof confirmText !== "string" || confirmText.trim().toLowerCase() !== "löschen") {
      return { message: `Bitte gib „löschen" ein, um zu bestätigen.`, type: "error" };
    }
  
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
      return { message: "Nicht angemeldet. Bitte melde dich erneut an.", type: "error" };
    }
  
    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(user.id);
  
    if (error) {
      return { message: "Konto konnte nicht gelöscht werden. Bitte versuche es erneut.", type: "error" };
    }
  
    await supabase.auth.signOut();
    redirect("/");
}