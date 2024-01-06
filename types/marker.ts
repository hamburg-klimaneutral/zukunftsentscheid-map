import type { LatLngExpression, MarkerOptions } from "leaflet"

export interface MapMarker {
  position: LatLngExpression
  tooltip?: string
  options?: MarkerOptions
}

export type MarkerColor = "dunkelgruen" | "pink" | "tuerkis"
