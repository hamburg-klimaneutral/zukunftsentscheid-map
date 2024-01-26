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

const { generateIcon } = useCustomLeafletIcons()
const { fetchLocations } = useMapMarkersFromSpreadsheet()
const locations = await fetchLocations()

const legendMappings: { label: string; color: MarkerColor }[] = [
  {
    label: "Muss abgeholt werden",
    color: "pink",
  },
  {
    label: "Wird abgeholt",
    color: "dunkelgruen",
  },
  {
    label: "Erledigt",
    color: "tuerkis",
  },
]

function generateIconColor({
  features: { isEmptied, isGoingToBeEmpties },
}: Location): MarkerColor {
  if (isEmptied) {
    return "tuerkis"
  }
  if (isGoingToBeEmpties) {
    return "dunkelgruen"
  }
  return "pink"
}

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
    options: { icon: generateIcon(generateIconColor(location)) },
  }
})
</script>

<style module>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
