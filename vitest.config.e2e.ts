import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'], // Essa config pega arquivos apenas com essa extensão
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'], // Arquivo chamado antes de cada arquivo de teste e2e
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
