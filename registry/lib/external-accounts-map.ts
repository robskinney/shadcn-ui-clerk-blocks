import {
  FaGoogle,
  FaMicrosoft,
  FaGithub,
  FaApple,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export const ExternalAccountsMap: Record<
  string,
  { name: string; icon: React.ComponentType<{ className?: string }> }
> = {
  oauth_google: { name: "Google", icon: FaGoogle },
  oauth_microsoft: { name: "Microsoft", icon: FaMicrosoft },
  oauth_github: { name: "GitHub", icon: FaGithub },
  oauth_apple: { name: "Apple", icon: FaApple },
  oauth_facebook: { name: "Facebook", icon: FaFacebook },
  oauth_linkedin: { name: "LinkedIn", icon: FaLinkedin },
};
