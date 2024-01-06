<template>
  <div :class="$style.markerLegend">
    <div
      v-for="mapping of mappings"
      :key="mapping.label"
      :class="$style.markerItem"
    >
      <img :src="`/images/pin_${mapping.color}.png`" height="24px" />
      <span :class="$style.markerItemLabel">{{ mapping.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarkerColor } from "~/types/marker"

interface Props {
  mappings: { label: string; color: MarkerColor }[]
}

const props = defineProps<Props>()
const { mappings } = toRefs(props)
</script>

<style module>
.markerLegend {
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  font-family: Inter, Arial, sans-serif;
  font-size: 16px;
}

.markerLegend > *:not(:last-child) {
  margin-right: 10px;
}

.markerItem {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.markerItemLabel {
  margin-left: 5px;
}
</style>
