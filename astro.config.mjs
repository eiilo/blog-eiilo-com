import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output only: `npm run build` writes plain files to dist/,
// which the GitHub Pages workflow publishes as they are.
export default defineConfig({
  site: "https://blog.eiilo.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});
