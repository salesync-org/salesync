import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      public: `${path.resolve(__dirname, "./public/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      ui: `${path.resolve(__dirname, "./src/components/ui/")}`,
      pages: path.resolve(__dirname, "./src/pages/"),
      assets: path.resolve(__dirname, "./src/assets/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      utils: path.resolve(__dirname, "./src/utils/"),
      constants: path.resolve(__dirname, "./src/constants/"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
    },
  },
});
