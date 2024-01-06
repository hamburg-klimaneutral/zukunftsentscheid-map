import { Icon, type IconOptions } from "leaflet"
import type { MarkerColor } from "~/types/marker"

export default function useCustomLeafletIcons() {
  const { $leaflet } = useNuxtApp()

  function generateIcon(color: MarkerColor): Icon<IconOptions> {
    return $leaflet.icon({
      iconUrl: `/images/pin_${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      tooltipAnchor: [10, 0],
    })
  }

  return {
    generateIcon,
  }
}
