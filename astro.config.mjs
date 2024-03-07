import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import devtoolbarTailwind from "astro-devtoolbar-tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://linkhub.doneber.dev',
  integrations: [preact(), tailwind(), devtoolbarTailwind()]
});