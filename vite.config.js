import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port:'8080',
  },
  // 打包配置
	build: {
		// 打包后的文件输出目录
		outDir: "dist",
		// cssCodeSplit: true,
		lib: {
			//指定组件编译入口文件
			entry: "./src/packages/index.js",
			// 组件库名称
			name: "vue3-waterfall-x", 
			// 文件名称
			fileName: "vue3-waterfall-x",
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				}
			},
		},
	}
})
