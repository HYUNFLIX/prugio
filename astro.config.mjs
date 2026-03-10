import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dongrae-eduforet.com',
  integrations: [tailwind()],
  trailingSlash: 'never',
});
