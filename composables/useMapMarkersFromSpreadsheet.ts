import type { LatLngExpression, LatLngTuple } from "leaflet"
import useSpreadsheetReader from "~/composables/useSpreadsheetReader"

interface SpreadsheetCol {
  id: string
  label: string
  type: string
}

interface SpreadsheetValue {
  v: string
}

interface SpreadsheetRow {
  c: SpreadsheetValue[]
}

interface SpreadsheetJSON {
  cols: SpreadsheetCol[]
  rows: SpreadsheetRow[]
}

export interface Location {
  name: string
  address: string
  features: {
    pickup: boolean
    dropOff: boolean
    signing: boolean
  }
  tooltip: string
  position: LatLngTuple
}

function readValue(value: SpreadsheetValue): string {
  return value?.v || ""
}

interface TableDataAsHash {
  NAME: string
  ADRESSE: string
  ABHOLUNG: string
  SAMMELORT: string
  UNTERSCHREIBEN: string
  STATUS: string
  TOOLTIP: string
  KOORDINATEN: string
}

function parseJSONData(json: SpreadsheetJSON): TableDataAsHash[] {
  const [header, skip, ...dataRows] = json.rows
  const headerValues = header.c.map(readValue)
  const rowValues = dataRows.map((row) => row.c.map(readValue))
  return rowValues.map(
    (values) =>
      Object.fromEntries(
        values.map((value, index) => [headerValues[index], value]),
      ) as unknown as TableDataAsHash,
  )
}

function isValid(location: Location): boolean {
  if (
    location.position.length !== 2 ||
    location.position.some((coordinate) => Number.isNaN(coordinate))
  ) {
    console.debug(`location "${location.name}" has invalid position`)
    return false
  }
  return true
}

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatTooltip(entry: TableDataAsHash) {
  const lines: string[] = [
    `<b>${escapeHtml(entry.NAME.trim())}</b>`,
    escapeHtml(entry.ADRESSE.trim()),
    entry.TOOLTIP.trim() &&
      `<br />${escapeHtml(entry.TOOLTIP.trim())}`.replace(/\n/g, "<br />"),
  ]
  return lines.join("<br />")
}

function tableDataToLocations(data: TableDataAsHash[]): Location[] {
  return data
    .map((entry) => ({
      name: entry.NAME,
      address: entry.ADRESSE,
      features: {
        pickup: entry.ABHOLUNG === "Ja",
        dropOff: entry.SAMMELORT === "Ja",
        signing: entry.UNTERSCHREIBEN === "Ja",
      },
      tooltip: formatTooltip(entry),
      position: entry.KOORDINATEN.split(",", 2).map(parseFloat) as LatLngTuple,
    }))
    .filter((data) => isValid(data))
}

export default function useMapMarkersFromSpreadsheet() {
  const {
    public: { dataSourceUrl },
  } = useRuntimeConfig()
  const { fetchAsJSON } = useSpreadsheetReader()

  return {
    async fetchLocations() {
      const data = await fetchAsJSON(dataSourceUrl)
      const dataAsHashes = parseJSONData(data)
      return tableDataToLocations(dataAsHashes)
    },
  }
}
