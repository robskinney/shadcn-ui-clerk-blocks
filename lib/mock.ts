import { FormattedEmailAddress } from "@/registry/blocks/email-management/email-management-1/types";
import { FormattedSession } from "@/registry/blocks/session-management/session-management-1/types";
import { User } from "@clerk/nextjs/server";
import type {
  EmailAddressResource,
  IdentificationLinkJSON,
  UserResource,
} from "@clerk/types";

export const MockUser: Partial<UserResource> | Partial<User> = {
  id: "user_mock_123",
  fullName: "Robert Kinney",
  firstName: "Robert",
  lastName: "Kinney",
  imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Brian&scale=80",
  emailAddresses: [
    {
      id: "idn_34lryiCi625eiUNFObUlQQciRyn",
      emailAddress: "robertskinney@outlook.com",
      linkedTo: [
        {
          id: "idn_34lrylyJKroko6TBBVoxkOBMQKd",
          type: "oauth_google",
        },
        {
          id: "idn_34no4iVTHJAMPxOA40rTrUqTBTA",
          type: "oauth_microsoft",
        },
      ],
      verification: {
        status: "verified",
      },
    },
    {
      id: "idn_351TeSgnTS6l4oNWgBcBY2iqH32",
      emailAddress: "other@gmail.com",
      linkedTo: [],
      verification: {
        status: "unverified",
      },
    },
  ] as EmailAddressResource[],
  primaryEmailAddressId: "idn_34lryiCi625eiUNFObUlQQciRyn",
  primaryEmailAddress: {
    emailAddress: "robertskinney@outlook.com",
    id: "idn_34lryiCi625eiUNFObUlQQciRyn",
  } as Partial<EmailAddressResource> as EmailAddressResource,
  username: "robskinney",
};

export const MockEmails: Partial<FormattedEmailAddress>[] = [
  {
    id: "idn_34lryiCi625eiUNFObUlQQciRyn",
    emailAddress: "robertskinney@outlook.com",
    isVerified: true,
    isPrimary: true,
    linkedTo: [
      {
        id: "idn_34lrylyJKroko6TBBVoxkOBMQKd",
        type: "oauth_google",
      },
      {
        id: "idn_34no4iVTHJAMPxOA40rTrUqTBTA",
        type: "oauth_microsoft",
      },
    ] as IdentificationLinkJSON[],
  },
  {
    id: "idn_351TeSgnTS6l4oNWgBcBY2iqH32",
    emailAddress: "other@gmail.com",
    isVerified: false,
    isPrimary: false,
    linkedTo: [],
  },
];

export function generateMockSessions() {
  const now = Date.now();

  return [
    {
      id: `sess_${Math.random().toString(36).substring(2, 10)}`,
      isMobile: false,
      deviceType: "Macintosh",
      status: "active",
      browserName: "Chrome",
      browserVersion: "141.0.0.0",
      ipAddress: "f6e6:991a:9715:10aa:411d:5bc3:36c5:617d",
      city: "New York City",
      updatedAt: now - 1000 * 60 * 5,
    },
    {
      id: `sess_${Math.random().toString(36).substring(2, 10)}`,
      isMobile: true,
      deviceType: "iPhone",
      status: "active",
      browserName: "Safari",
      browserVersion: "13.0.3",
      ipAddress: "3f2a:0b9c:abcd:1f2e:77a0:04d1:9e2b:0c3f",
      city: "New York City",
      updatedAt: now - 1000 * 60 * 5,
    },
  ] as FormattedSession[];
}
