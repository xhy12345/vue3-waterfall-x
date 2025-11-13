# Vue3 Waterfall X

一个轻量级、高性能的Vue3瀑布流组件，支持动态数据加载和自定义渲染。

[GitHub源码仓库地址](https://github.com/xhy12345/vue3-waterfall-x)

如果觉得好用，欢迎给个Star ⭐️ 支持一下！

## 特性

- ✨ 支持自定义列数
- 📏 可配置列间距
- 📱 响应式设计，移动端友好
- 🔄 自动监听数据变化
- 🎨 支持自定义插槽渲染
- ⚡ 高性能，实时计算列高度

## 安装

```bash
npm install vue3-waterfall-x --save
```

### ⚠️ 重要版本要求

> **🔧 环境要求：**
> - `@vitejs/plugin-vue` 版本必须 **≥ 6.0.1** 
> - `vite` 版本必须 **≥ 7.2.2**
> 
> 请确保你的项目依赖满足以上版本要求，否则可能会出现兼容性问题！

### 📦 开发依赖安装

如果你的项目需要本地开发，请确保安装正确版本的依赖：

```bash
npm install --save-dev @vitejs/plugin-vue@^6.0.1 vite@^7.2.2
```

## 基本使用

```vue
<template>
  <Waterfall :list="dataInfo" :count="3" :gap="20">
    <template v-slot:default="{ item }">
      <div>
        <img class="img_style" :src="item.url" />
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { ref } from 'vue';
import Waterfall from './packages/waterfall/waterfall.vue';

let dataInfo = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' },
  // ...更多数据
]);
</script>

<style scoped>
.img_style {
  width: 100%;
  border-radius: 8px;
}
</style>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `list` | Array | [] | 数据列表，支持动态变化 |
| `count` | Number | 2 | 展示的列数 |
| `gap` | Number | 10 | 列与列之间的间距（单位：px） |



## 动态数据

组件会自动监听`list`数据的变化，并重新布局：

```vue
<script setup>
import { ref } from 'vue';
import Waterfall from './packages/waterfall/waterfall.vue';

let dataInfo = ref([]);

// 模拟异步加载数据
setTimeout(() => {
  dataInfo.value = [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
  ];
}, 1000);
</script>
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT