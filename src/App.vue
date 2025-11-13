<template>
  <div>
    <Waterfall :list="dataInfo">
      <template v-slot:default="itemInfo">
        <div>
          <img class="img_style" :src="itemInfo.item.url"/>
        </div>
      </template>
    </Waterfall>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Waterfall from './packages/waterfall/waterfall.vue';

let dataInfo = ref([
  {url:'https://img1.baidu.com/it/u=1791653389,599136142&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=960'},
  {url: 'https://img1.baidu.com/it/u=2172818577,3783888802&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422'},
  {url: 'https://img2.baidu.com/it/u=2612741288,182099192&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'},
])
</script>
<style scoped>
.img_style {
  border-radius: 10px;
  width: 100%;
}
</style>