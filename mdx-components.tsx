import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import ComponentContainer from "./components/component-container";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";

const generator = createGenerator({
  tsconfigPath: './tsconfig.json',
  // where to resolve relative paths (normally cwd)
  basePath: './',
  // disable file system cache
  cache: false,
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ComponentContainer,
    SignedIn,
    SignedOut,
    ...components,
  };
}
