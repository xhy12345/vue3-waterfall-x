<template>
  <div class="waterfall-container" :style="containerStyle">
    <div 
      v-for="(column, columnIndex) in columns" 
      :key="columnIndex"
      class="waterfall-column"
      :style="{ marginRight: columnIndex < count - 1 ? `${gap}px` : 0 }"
      :ref="el => { if (el) columnRefs[columnIndex] = el }"
    >
      <div 
        v-for="item in column" 
        :key="item.key || item.index"
        class="waterfall-item"
        :ref="el => setItemRef(el, columnIndex, item.index)"
      >
        <slot v-if="$slots.default" :item="item" />
        <div v-else>
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, defineProps, onMounted, onUnmounted } from 'vue'

// 定义组件名称
const name = 'Waterfall'

// 定义props
const props = defineProps({
  // 展示的列数
  count: {
    type: Number,
    default: 2
  },
  // 列间距
  gap: {
    type: Number,
    default: 10
  },
  // 数据列表
  list: {
    type: Array,
    default: () => []
  }
})

// 列数据数组
const columns = ref([])

// 列高度数组
const columnHeights = ref([])

// 列引用数组
const columnRefs = ref([])

// 项目引用映射
const itemRefs = ref(new Map())

// 容器样式
const containerStyle = computed(() => {
  return {
    display: 'flex',
    width: '100%'
  }
})

// 设置项目引用
const setItemRef = (el, columnIndex, itemIndex) => {
  if (el && columnIndex !== undefined && itemIndex !== undefined) {
    const key = `${columnIndex}-${itemIndex}`
    itemRefs.value.set(key, el)
  }
}

// 初始化列
const initColumns = () => {
  columns.value = Array(props.count).fill().map(() => [])
  columnHeights.value = Array(props.count).fill(0)
  itemRefs.value.clear()
  // 初始化列引用数组
  columnRefs.value = Array(props.count).fill(null)
}

// 获取最矮列的索引
const getShortestColumnIndex = () => {
  return columnHeights.value.indexOf(Math.min(...columnHeights.value))
}

// 将项目添加到最矮列
const addItemToShortestColumn = (item, index) => {
  // 为每个item添加索引信息，方便追踪
  const itemWithMeta = {
    ...item
  }
  
  const columnIndex = getShortestColumnIndex()
  columns.value[columnIndex].push(itemWithMeta)
  
  // 这里我们暂时设置一个估计高度，实际应该在item渲染后获取真实高度
  const estimatedHeight = 100 // 默认估计高度
  columnHeights.value[columnIndex] += estimatedHeight + 10 // 10是item之间的margin
}

// 更新列真实高度
const updateColumnRealHeights = async () => {
  await nextTick()
  
  // 更新每列的真实高度
  columnHeights.value = columnRefs.value.map(colRef => {
    return colRef && colRef.offsetHeight ? colRef.offsetHeight : 0
  })
}

// 重新布局项目
const layoutItems = async () => {
  try {
    initColumns()
    if (!props.list || props.list.length === 0) {
      return
    }
    // 首先将所有项目按照瀑布流算法分配到各列
    props.list.forEach((item, index) => {
      addItemToShortestColumn(item, index)
    })
    // 等待DOM更新后更新真实高度
    await updateColumnRealHeights()
  } catch (error) {
    console.warn('Waterfall layout error:', error)
  }
}

// 监听list变化
watch(
  () => props.list,
  async () => {
    await layoutItems()
  },
  { deep: true, immediate: true }
)

// 监听count变化
watch(
  () => props.count,
  async () => {
    await layoutItems()
  }
)

// 监听gap变化
watch(
  () => props.gap,
  async () => {
    await updateColumnRealHeights()
  }
)

// 处理窗口大小变化
const handleResize = () => {
  layoutItems()
}

// 组件挂载后执行布局
onMounted(() => {
  layoutItems()
  window.addEventListener('resize', handleResize)
})

// 组件卸载前清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.waterfall-container {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.waterfall-item {
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  break-inside: avoid;
  /* 平滑过渡效果 */
  transition: all 0.3s ease;
}

/* 最后一个元素移除底部margin */
.waterfall-column :last-child {
  margin-bottom: 0;
}
</style>