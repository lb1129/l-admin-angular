import { resolve } from 'node:path'

module.exports = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'node_modules')
    }
  }
}
