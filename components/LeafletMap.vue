<template>
  <ClientOnly>
    <div ref="mapContainer" :class="$style.map" />
  </ClientOnly>
</template>
<script lang="ts" setup>
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet"
import type { MapMarker } from "~/types/marker"

interface Props {
  markers: MapMarker[]
  zoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  markers: undefined,
  zoom: 12,
})

const center: LatLngExpression = [53.5544583, 9.9903783]

const { $leaflet } = useNuxtApp()
const mapContainer = ref<HTMLElement | string>("")
const map = ref()

const setupMap = () => {
  map.value = $leaflet.map(mapContainer.value, {
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
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        // attribution:
        //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )
    .addTo(map.value)

  props.markers.forEach(({ position, options }) =>
    $leaflet.marker(position, options).addTo(map.value),
  )
}

watchEffect((onCleanup) => {
  if (!mapContainer.value) {
    return
  }

  setupMap()

  onCleanup(() => {
    map.value.off()
    map.value.remove()
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
