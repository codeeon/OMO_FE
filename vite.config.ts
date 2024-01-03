import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({
      compiler: true,
    }),
  ],
  define: {
    'process.env': {},
  },
});
