export type FormattedSession = {
  id: string;
  isMobile?: boolean;
  deviceType?: string;
  status: string;
  browserName?: string;
  browserVersion?: string;
  ipAddress?: string;
  city: string;
  updatedAt: number;
};
