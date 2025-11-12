import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import ComponentContainer from "./components/component-container";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TypeTable } from 'fumadocs-ui/components/type-table';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    TypeTable: (props) => (
      <TypeTable {...props} />
    ),
    ComponentContainer,
    SignedIn,
    SignedOut,
    ...components,
  };
}
