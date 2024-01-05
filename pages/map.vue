<template>
  <div>
    <LeafletMap :markers="markers" />
  </div>
</template>

<script setup lang="ts">
import { Icon, IconOptions } from "leaflet"
import type { MapMarker } from "~/types/marker"

const { $leaflet } = useNuxtApp()

const iconStyle: Icon<IconOptions> = $leaflet.icon({
  iconUrl: "/images/leaflet-black.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "map-marker-pink",
})

const markers = ref<MapMarker[]>([
  { position: [53.5523375, 9.9756278], options: { icon: iconStyle } },
])
</script>

<style>
.map-marker-dark {
  filter: invert(24%) sepia(68%) saturate(396%) hue-rotate(126deg)
    brightness(97%) contrast(85%);
}
.map-marker-pink {
  filter: invert(15%) sepia(48%) saturate(6670%) hue-rotate(314deg)
    brightness(95%) contrast(113%);
}
.map-marker-light {
  filter: invert(100%) sepia(10%) saturate(5891%) hue-rotate(112deg)
    brightness(85%) contrast(95%);
}
</style>
