export default defineNuxtPlugin(async () => {
  google.charts.load("current")
  await new Promise((resolve) => google.charts.setOnLoadCallback(resolve))
})
