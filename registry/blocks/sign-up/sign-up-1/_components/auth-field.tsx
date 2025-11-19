import { getAuthFieldInfo } from "@/registry/lib/format-auth-fields";

import * as Clerk from "@clerk/elements/common";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AuthFieldProps = {
  field: string;
};

export default function AuthField({ field }: AuthFieldProps) {
  const fieldInfo = getAuthFieldInfo(field);

  return (
    <Clerk.Field name={fieldInfo.name} className="space-y-2 w-full">
      <Clerk.Label asChild>
        <Label>{fieldInfo.alias}</Label>
      </Clerk.Label>

      <Clerk.Input type={fieldInfo.key} asChild>
        <Input
          autoComplete={fieldInfo.autoComplete}
          placeholder={fieldInfo.placeholder}
          required
        />
      </Clerk.Input>

      <Clerk.FieldError className="block text-sm text-destructive" />
    </Clerk.Field>
  );
}
