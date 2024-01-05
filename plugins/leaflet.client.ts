import leaflet from 'leaflet'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      leaflet,
    },
  }
})
