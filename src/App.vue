<template>
  <div class="container">

    <div>
      <my-button @click="carSpawn">Spawn car</my-button>
      <my-button @click="removeCar">Remove car</my-button>
    </div>
    <div>
      <canvas-window></canvas-window>
    </div>
  </div>
</template>

<script>

export default {
    name: 'App',
    
    setup() {
      return {
        carSpawn: () => {
          console.log('car spawned')
        }
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