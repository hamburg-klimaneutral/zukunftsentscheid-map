function parseData() {}

export default function useSpreadsheetReader() {
  async function fetchAsJSON(dataSourceUrl: string) {
    const query = new google.visualization.Query(dataSourceUrl)
    const response: google.visualization.QueryResponse = await new Promise(
      (resolve) => query.send(resolve),
    )
    if (response.isError()) {
      console.error(response)
      throw new Error("Failed to get visualization")
    }
    return JSON.parse(response.getDataTable().toJSON())
  }

  return {
    fetchAsJSON,
  }
}
