import { defineConfig } from 'vite'

export default defineConfig({
  base: '/doping-scatterplot-graph/',
  esbuild: {
    supported: {
      'top-level-await': true
    }
  }
})