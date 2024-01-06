<template>
  <div :class="$style.root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>

<style module>
.root {
  width: 100vw;
  height: 100vh;
}
</style>
