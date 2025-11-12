import {
  defineDocs,
  defineConfig,
} from "fumadocs-mdx/config";
import { createGenerator, remarkAutoTypeTable } from "fumadocs-typescript";

const generator = createGenerator();

export const docs = defineDocs({
  dir: "content",
});

export default defineConfig({
  lastModifiedTime: "git",
    mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
  },
});
