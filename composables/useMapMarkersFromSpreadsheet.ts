import type { LatLngExpression } from "leaflet"
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

interface Location {
  name: string
  address: string
  pickup: boolean
  dropOff: boolean
  tooltip: string
  position: LatLngExpression
}

function readValue(value: SpreadsheetValue): string {
  return value?.v || ""
}

interface TableDataAsHash {
  NAME: string
  ADRESSE: string
  ABHOLUNG: string
  SAMMELORT: string
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

function isValid() {
  return true
}

function tableDataToLocations(data: TableDataAsHash[]): Location[] {
  return data.filter(isValid).map((entry) => ({
    name: entry.NAME,
    address: entry.ADRESSE,
    pickup: entry.ABHOLUNG === "Ja",
    dropOff: entry.SAMMELORT === "Ja",
    tooltip: entry.TOOLTIP,
    position: entry.KOORDINATEN.split(",", 2).map(
      parseFloat,
    ) as LatLngExpression,
  }))
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
