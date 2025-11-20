"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { OrganizationUpdateFormValues } from ".";

export async function updateOrganization(data: OrganizationUpdateFormValues) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to update organization.");
  }

  const client = await clerkClient();

  await client.organizations.updateOrganization(data.id, {
    name: data.name,
    slug: data.slug,
  });

  if (data.picture && data.picture.size > 0) {
    await client.organizations.updateOrganizationLogo(data.id, {
      file: data.picture,
      uploaderUserId: userId,
    });
  }
}
