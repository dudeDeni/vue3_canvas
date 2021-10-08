<template>
  <div>
    <div class="grid grid-rows-1 items-center justify-center">
      <div class="grid grid-cols-2 gap-x-28 my-10">
        <my-button @click="spawnCar" class="text-white">SPAWN CAR</my-button>
        <my-button @click="removeCar" class="text-white">REMOVE CAR</my-button>
      </div>
      <div class="">
        <canvas-window :carVisible="carVisible"></canvas-window>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, watchEffect } from "vue";

export default {
    name: 'App',

  setup() {
    const carVisible = ref(false);

    const spawnCar = () => {
      carVisible.value = true
    }
    const removeCar = () => {
      carVisible.value = false
    }

    return {
      carVisible,
      spawnCar,
      removeCar
    }

  }
    
}
</script>

<style>

</style>