import { EnhancedEmailAddress } from "@/registry/blocks/email-management/email-management-1/types";
import { EnhancedExternalAccount } from "@/registry/blocks/social-accounts/social-accounts-1/types";
import { Session, User } from "@clerk/nextjs/server";
import type { EmailAddressResource, UserResource } from "@clerk/types";
import { FaMicrosoft } from "react-icons/fa";

export const MockUser: Partial<UserResource> | Partial<User> = {
  id: "user_mock_123",
  fullName: "Robert Kinney",
  firstName: "Robert",
  lastName: "Kinney",
  imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Brian&scale=80",
  emailAddresses: [
    {
      emailAddress: "robertskinney@outlook.com",
      id: "email_1",
    } as Partial<EmailAddressResource> as EmailAddressResource,
  ],
  primaryEmailAddress: {
    emailAddress: "robertskinney@outlook.com",
    id: "email_1",
  } as Partial<EmailAddressResource> as EmailAddressResource,
  username: "robskinney",
};

export const MockEmails: Partial<EnhancedEmailAddress>[] = [
  {
    id: "idn_34lryiCi625eiUNFObUlQQciRyn",
    emailAddress: "robertskinney@outlook.com",
    verification: {
      status: "verified",
      strategy: "from_oauth_google",
      externalVerificationRedirectURL: null,
      attempts: null,
      expireAt: null,
      nonce: null,
      message: null,
    },
    isPrimary: true,
    linkedTo: [
      {
        id: "idn_34lrylyJKroko6TBBVoxkOBMQKd",
        type: "oauth_google",
        providerName: "Google",
      },
      {
        id: "idn_34no4iVTHJAMPxOA40rTrUqTBTA",
        type: "oauth_microsoft",
        providerName: "Microsoft",
      },
    ],
  },
  {
    id: "idn_351TeSgnTS6l4oNWgBcBY2iqH32",
    emailAddress: "other@gmail.com",
    verification: {
      status: "verified",
      strategy: "admin",
      externalVerificationRedirectURL: null,
      attempts: null,
      expireAt: null,
      nonce: null,
      message: null,
    },
    isPrimary: false,
    linkedTo: [],
  },
];

export const MockSocialAccounts: Partial<EnhancedExternalAccount>[] = [
  {
    id: "idn_35Mfds74EC8HQTvCKD9dqTPD2J1",
    provider: "oauth_microsoft",
    identificationId: "idn_35Mfds74EC8HQTvCKD9dqTPD2J1",
    emailAddress: "robertskinney@outlook.com",
    firstName: "Robert",
    lastName: "Kinney",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Brian&scale=80",
    verification: {
      status: "verified",
      strategy: "oauth_microsoft",
      externalVerificationRedirectURL: null,
      attempts: null,
      expireAt: 1762925546043,
      nonce: null,
      message: null,
    },
    providerName: "Microsoft",
    providerIcon: FaMicrosoft,
  },
];

export function generateMockSessions() {
  const now = Date.now();

  const sessions: Partial<Session>[] = [
    {
      id: `sess_${Math.random().toString(36).substring(2, 10)}`,
      clientId: `client_${Math.random().toString(36).substring(2, 10)}`,
      userId: `user_${Math.random().toString(36).substring(2, 10)}`,
      status: "active",
      lastActiveAt: now - 1000 * 60 * 5, // 5 minutes ago
      expireAt: now + 1000 * 60 * 60 * 24, // 24 hours from now
      abandonAt: now + 1000 * 60 * 60 * 48, // 48 hours from now
      createdAt: now - 1000 * 60 * 10, // 10 minutes ago
      updatedAt: now - 1000 * 60 * 5, // 5 minutes ago
      latestActivity: {
        id: `sess_activity_${Math.random().toString(36).substring(2, 10)}`,
        isMobile: false,
        ipAddress: "f6e6:991a:9715:10aa:411d:5bc3:36c5:617d",
        city: "New York City",
        country: "US",
        browserVersion: "141.0.0.0",
        browserName: "Chrome",
        deviceType: "Macintosh",
      },
      actor: null,
    },
    {
      id: `sess_${Math.random().toString(36).substring(2, 10)}`,
      clientId: `client_${Math.random().toString(36).substring(2, 10)}`,
      userId: `user_${Math.random().toString(36).substring(2, 10)}`,
      status: "active",
      lastActiveAt: now - 1000 * 60 * 5, // 5 minutes ago
      expireAt: now + 1000 * 60 * 60 * 24, // 24 hours from now
      abandonAt: now + 1000 * 60 * 60 * 48, // 48 hours from now
      createdAt: now - 1000 * 60 * 10, // 10 minutes ago
      updatedAt: now - 1000 * 60 * 5, // 5 minutes ago
      latestActivity: {
        id: `sess_activity_${Math.random().toString(36).substring(2, 10)}`,
        isMobile: true,
        ipAddress: "3f2a:0b9c:abcd:1f2e:77a0:04d1:9e2b:0c3f",
        city: "New York City",
        country: "US",
        browserVersion: "13.0.3",
        browserName: "Safari",
        deviceType: "iPhone",
      },
      actor: null,
    },
  ];

  return sessions;
}
