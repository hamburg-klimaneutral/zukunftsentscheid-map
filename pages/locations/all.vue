<template>
  <LeafletMap :markers="markers" />
</template>

<script setup lang="ts">
import useCustomLeafletIcons from "~/composables/useCustomLeafletIcons"
import useMapMarkersFromSpreadsheet from "~/composables/useMapMarkersFromSpreadsheet"
import type { MapMarker } from "~/types/marker"

const { generateIcon } = useCustomLeafletIcons()
const { fetchLocations } = useMapMarkersFromSpreadsheet()
const locations = await fetchLocations()

function formatYesNo(yes: boolean) {
  return yes ? "Ja" : "Nein"
}

const markers: MapMarker[] = locations.map((location) => {
  const featureLines = [
    `Unterschreiben: ${formatYesNo(location.features.signing)}`,
    `Abholen: ${formatYesNo(location.features.pickup)}`,
    `Sammelbox: ${formatYesNo(location.features.dropOff)}`,
  ]
  return {
    position: location.position,
    tooltip: `${location.tooltip}<br /><br />${featureLines.join("<br />")}`,
    options: { icon: generateIcon("pink") },
  }
})
</script>
