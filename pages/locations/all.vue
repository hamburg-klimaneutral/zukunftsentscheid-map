<template>
  <div>
    <LeafletMap :markers="markers" />
  </div>
</template>

<script setup lang="ts">
import useCustomLeafletIcons from "~/composables/useCustomLeafletIcons"
import useMapMarkersFromSpreadsheet, {
  type Location,
} from "~/composables/useMapMarkersFromSpreadsheet"
import type { MapMarker } from "~/types/marker"

const { generateIcon } = useCustomLeafletIcons()
const { fetchLocations } = useMapMarkersFromSpreadsheet()
const locations = await fetchLocations()

const markers = computed<MapMarker[]>(() => {
  return locations.map((location) => ({
    position: location.position,
    tooltip: location.tooltip,
    options: { icon: generateIcon("pink") },
  }))
})
</script>