<template>
  <LeafletMap :markers="markers" />
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

function isDropOffLocation(location: Location) {
  return location.features.signing || location.features.dropOff
}

const markers: MapMarker[] = locations
  .filter(isDropOffLocation)
  .filter((location) => !location.features.isEmptied)
  .map((location) => ({
    position: location.position,
    tooltip: location.tooltip,
    options: { icon: generateIcon("pink") },
  }))
</script>
