import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { VantResolver } from "@vant/auto-import-resolver";
// import postCssPxToRem from "postcss-pxtorem";
// const VITE_BASE_URL =import.meta.env.VITE_BASE_URL

export default ({ mode }) => {
  const VITE_BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL;

  return defineConfig({
    plugins: [
      vue(),
      // AutoImport({
      //   resolvers: [VantResolver()],
      // }),
      // Components({
      //   resolvers: [VantResolver()],
      // }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // postcss.config.js配置
    css: {
      postcss: {
        plugins: [
          // postCssPxToRem({
          //   rootValue: 37.5, // 1rem的大小
          //   // rootValue({ file }) {
          //   //   return file.indexOf("vant") !== -1 ? 37.5 : 75;
          //   // },
          //   propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          //   selectorBlackList: ["van"], // 过滤掉.norem-开头的class，不进行rem转换
          //   propBlackList: ["font-size,fontSize"], //黑名单
          //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          // }),
        ],
      },
    },

    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        "/proxyApi": {
          target: VITE_BASE_URL + "/service" || "/",
          // target: "https://sit.yzy-dht.com", // 代理目标地址
          // 代理websockets
          ws: true,
          // 开启代理 (允许跨域)
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxyApi/, ""), // 可选的重写路径
        },
      },
      // proxy: {
      //   "/api": {
      //     target: "https://echarts.apache.org/examples",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
    },
    // 打包
    // process.env.NODE_ENV
    base: mode === "production" ? "./" : "/",
    build: {
      // target: ["modules"], // 设置最终构建的浏览器兼容目标
      // 打包后文件的存放路径
      outDir: "dist",
      // 生成静态资源的存放路径
      assetsDir: "assets",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 打包文件的后缀
      chunkSuffix: "chunk",
      // 构建后是否生成 manifest.json 文件
      // manifest: true,
      // 构建后是否生成.htaccess 文件
      brotliSize: true,
      minify: "esbuild", // 使用 esbuild 默认的代码压缩
    },
    esbuild: {
      drop: ["debugger"],
      pure: ["console.log"],
    },
  });
};
