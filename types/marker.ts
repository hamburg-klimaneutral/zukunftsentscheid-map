import type { LatLngExpression, MarkerOptions } from "leaflet"

export interface MapMarker {
  position: LatLngExpression
  options?: MarkerOptions
}
