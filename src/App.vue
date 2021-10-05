<template>
  <div class="container">
    <div>
      <my-button @click="spawnCar">Spawn car</my-button>
      <my-button @click="removeCar">Remove car</my-button>
    </div>
    <div>
      <canvas-window :carVisible="carVisible"></canvas-window>
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
.container {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  position: absolute;

}

</style>