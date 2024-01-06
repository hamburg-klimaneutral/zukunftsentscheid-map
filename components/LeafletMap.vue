<template>
  <ClientOnly>
    <div ref="mapContainer" :class="$style.map" />
  </ClientOnly>
</template>
<script lang="ts" setup>
import "leaflet/dist/leaflet.css"
import { LatLngExpression, Map } from "leaflet"
import type { MapMarker } from "~/types/marker"

interface Props {
  markers: MapMarker[]
  zoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  markers: undefined,
  zoom: 11,
})

const center: LatLngExpression = [53.5744583, 9.9903783]

const { $leaflet } = useNuxtApp()
const mapContainer = ref<HTMLElement | string>("")
let map: Map

const setupMap = () => {
  const newMap = $leaflet.map(mapContainer.value, {
    center,
    zoom: props.zoom,
  })

  // add map background
  $leaflet
    .tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png?",
      // "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )
    .addTo(newMap)

  props.markers.forEach(({ position, options, tooltip }) => {
    const marker = $leaflet.marker(position, options)
    if (tooltip) {
      marker.bindTooltip(JSON.parse(JSON.stringify(tooltip))).openTooltip()
    }
    marker.addTo(newMap)
  })

  map = newMap
}

watchEffect((onCleanup) => {
  if (!mapContainer.value) {
    return
  }

  setupMap()

  onCleanup(() => {
    map.off()
    map.remove()
  })
})
</script>
<script lang="ts">
export default {
  name: "LeafletMap",
}
</script>

<style module>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
