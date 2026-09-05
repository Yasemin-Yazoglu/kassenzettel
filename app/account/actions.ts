"use server";

import { changePasswordSchema } from "@/lib/validation/changePassword";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { mapAuthErrorToKey } from "@/lib/mapAuthError";

export async function changePassword(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const tValidation = await getTranslations("Validation");
    const tErrors = await getTranslations("AuthErrors");
    const tActions = await getTranslations("AccountActions");

    const result = changePasswordSchema.safeParse({
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!result.success) {
        const key = result.error.issues[0].message;
        return { message: tValidation.has(key) ? tValidation(key) : tValidation("currentPasswordRequired"), type: "error" };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        current_password: result.data.currentPassword,
        password: result.data.newPassword,
    });

    if (error) {
        return { message: tErrors(mapAuthErrorToKey(error)), type: "error" };
    }

    return { message: tActions("passwordChanged"), type: "success" };
}

export async function deleteAccount(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const t = await getTranslations("AccountActions");
    const tModal = await getTranslations("DeleteAccountModal");
    const confirmWord = tModal("confirmWord");

    const confirmText = formData.get("confirmText");

    if (typeof confirmText !== "string" || confirmText.trim().toLowerCase() !== confirmWord.toLowerCase()) {
      return { message: t("deleteConfirmMismatch", { word: confirmWord }), type: "error" };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { message: t("notAuthenticated"), type: "error" };
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(user.id);

    if (error) {
      return { message: t("deleteFailed"), type: "error" };
    }

    await supabase.auth.signOut();
    redirect("/");
}