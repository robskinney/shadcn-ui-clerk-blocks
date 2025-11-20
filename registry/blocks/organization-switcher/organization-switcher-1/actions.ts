"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type UpdateLogoParams = {
  file: Blob | File;
  uploaderUserId?: string;
};

export async function updateOrganizationPicture(
  orgId: string,
  params: UpdateLogoParams
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to update organization picture.");
  }

  const client = await clerkClient();

  await client.organizations.updateOrganizationLogo(orgId, params);
}
