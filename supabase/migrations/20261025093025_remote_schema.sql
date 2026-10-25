SET local check_function_bodies = off;

CREATE TABLE "public"."expense" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"   timestamp with time zone NOT NULL DEFAULT now(),
  "store"        text                     NOT NULL,
  "spend_at"     date                     NOT NULL,
  "amount_cents" integer                  NOT NULL,
  CONSTRAINT "Spending_pkey" PRIMARY KEY (id),
  "user_id"      uuid                     NOT NULL DEFAULT auth.uid()
);

ALTER TABLE "public"."expense"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

CREATE TRIGGER expense_set_updated_at
  BEFORE UPDATE ON public.expense
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

GRANT EXECUTE ON FUNCTION "public"."set_updated_at"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."set_updated_at"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."set_updated_at"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."set_updated_at"() TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."expense" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."expense" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."expense" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."expense" TO "service_role";

ALTER TABLE "public"."expense"
  ADD CONSTRAINT "spending_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE INDEX expense_user_spend_at_idx ON public.expense USING btree (user_id, spend_at DESC);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."expense"
  FOR DELETE
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."expense"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));

CREATE POLICY "Enable users to view their own data only" ON "public"."expense"
  FOR SELECT
  TO "authenticated"
  USING ((( SELECT auth.uid() AS uid) = user_id));

CREATE POLICY "Users can update their own expenses" ON "public"."expense"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

