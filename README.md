# shadcn-ui-clerk-blocks

You can use the `shadcn` CLI to pull blocks from our component registry.

> [!IMPORTANT]  
> This registry currently supports [Next.js](https://nextjs.org/) projects that use [shadcn/ui](https://ui.shadcn.com/) and [Clerk](https://clerk.com/) for authentication.

## Getting Started

Please be sure to have Clerk installed in your app by adding a `<ClerkProvider>` to your Root Layout. Additionally, a `.env` file must be present with a `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, which can be found on the Clerk dashboard. Full Clerk quickstart documentation is available [here](https://clerk.com/docs/nextjs/getting-started/quickstart).

Once this setup has been completed, you are ready to begin copying components. Copy the relevant commands for the package manager used in your project and run them within the terminal of your project's folder.

## Additional

- This project was built using Next.js 16 on the App Router, but should support Next.js 15 apps. I plan on providing additional variants to support other frameworks, starting with Vite / TanStack Start.
- Data is fetched and cache'd using built-in libraries. I plan on providing additional examples for using React Query at a later date.
- If necessary, each component is split up into sub-components to allow for easier editing and understanding of their structure.
- Currently pnpm, npm, yarn, and bun are documented package managers on the website. Please submit a request if you'd like me to add any additional managers.
