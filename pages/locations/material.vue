<template>
  <div :class="$style.wrapper">
    <MarkerLegend :mappings="legendMappings" />
    <LeafletMap :markers="markers" />
  </div>
</template>

<script setup lang="ts">
import MarkerLegend from "~/components/MarkerLegend"
import useCustomLeafletIcons from "~/composables/useCustomLeafletIcons"
import useMapMarkersFromSpreadsheet, {
  type Location,
} from "~/composables/useMapMarkersFromSpreadsheet"
import type { MapMarker, MarkerColor } from "~/types/marker"

const legendMappings: { label: string; color: MarkerColor }[] = [
  {
    label: "Abholung & Sammelbox",
    color: "pink",
  },
  {
    label: "Abholung",
    color: "dunkelgruen",
  },
  {
    label: "Sammelbox",
    color: "tuerkis",
  },
]

const { generateIcon } = useCustomLeafletIcons()
const { fetchLocations } = useMapMarkersFromSpreadsheet()
const locations = await fetchLocations()

function isMaterialLocation({ features: { dropOff, pickup } }: Location) {
  return dropOff || pickup
}

function generateIconColor({
  features: { dropOff, pickup },
}: Location): MarkerColor {
  if (dropOff && pickup) {
    return "pink"
  }
  if (dropOff) {
    return "tuerkis"
  }
  return "dunkelgruen"
}

const markers: MapMarker[] = locations
  .filter(isMaterialLocation)
  .filter((location) => !location.features.isEmptied)
  .map((location) => ({
    position: location.position,
    tooltip: location.tooltip,
    options: { icon: generateIcon(generateIconColor(location)) },
  }))
</script>

<style module>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
