import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite';

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

//https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const env = loadEnv(mode, process.cwd());
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  
  return defineConfig({
    plugins: [
      vue(),
      VueDevTools(),
      tsconfigPaths(),
      ViteImageOptimizer({}),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      },
      extensions: ['*', '.vue', '.ts']
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@assets/styles/_variables.scss";`,
        },
      },
    },
    optimizeDeps: { 
      exclude: ["swiper/vue", "swiper/types", "swiper/modules",], 
    },
    server: {
      port: 5173,
      // strictPort: true,
      // watch: {
      //   usePolling: true,
      // },
      // hmr: {
      //     port: 5173,
      //     host: "localhost",
      //     protocol: "ws",
      //     clientPort: 5173
          
      // },
      // proxy: {
			// 	"/api": {
			// 		target: env.VITE_API_URL,
			// 		changeOrigin: true,
			// 		secure: false,
			// 		rewrite: (p) => p.replace(/^\/api/, ""),
			// 	},
			// },
			// cors: false,
    },
    build: {
      rollupOptions: {
          output:{
              manualChunks(id) {
                  if (id.includes('node_modules')) {
                      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
              }
          }
      }
    }
  });
}



