import { Organization } from "@clerk/backend";
import { OrganizationResource } from "@clerk/types";

export function formatOrganization(
  organization: Partial<Organization> | Partial<OrganizationResource>
) {
  return {
    imageUrl: organization.imageUrl,
    name: organization.name,
    slug: organization.slug,
  };
}
