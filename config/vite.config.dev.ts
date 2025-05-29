import { mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConfig from './vite.config.base'

const REMOTE_HOST = 'http://dbcloud-test.yun.hiysg.com'
// const REMOTE_HOST = 'http://192.168.0.102:8080'
// const REMOTE_HOST = 'http://madi.gate.bjknrt.com'
// const REMOTE_HOST = 'http://sjf.gate.bjknrt.com'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      host: '0.0.0.0',
      proxy: {
        '^/dev-api': {
          target: REMOTE_HOST,
          changeOrigin: true,
          rewrite: (p: string) => p.replace(/^\/dev-api/, REMOTE_HOST.indexOf('192') > -1 ? '' : '/prod-api'),
        },
        '^/profile': {
          target: REMOTE_HOST,
          changeOrigin: true,
        },
        '^/proxy': {
          target: REMOTE_HOST,
          changeOrigin: true,
        },
        '^/upload': {
          target: 'http://dbcloud.oss-cn-beijing.aliyuncs.com/upload',
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig,
)
