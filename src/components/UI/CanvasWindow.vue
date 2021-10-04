<template>
    <canvas
        ref="el"
        :style="style"
        class="canvas"
    >
    </canvas> 
    <pre>{{ position }}</pre>
    
</template>

<script>
import { ref, onMounted, watch, watchEffect, computed } from "vue";
import useMakeDragable from "@/hooks/useMakeDragable";
import useImageLoader from "@/hooks/useImageLoader";
import Roads from "@/assets/roads.jpg";
import CarTopView from "@/assets/blue_car.png";


export default {
    name: 'CanvasWindow',
    props: {
        carVisible:{
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const el = ref(null);
        const {position, style} = useMakeDragable(el);
        const {} = useImageLoader(el);
        const carVisible =  ref(props.carVisible);

        const renderCar = async () => {
            
            if (carVisible.value) {
                const ctx = el.value.getContext("2d"); 
                const car = new Image();
                car.src = CarTopView;

                car.onload = function() {
                    ctx.drawImage(car, 10, 20, 50, 50);
                    console.log('car spawned')
                };
            }
            console.log(carVisible.value) 
        }

        const renderBackground = () => {
            const ctx = el.value.getContext("2d");  
            const bg = new Image();
            bg.src = Roads;
            return new Promise((resolve , reject) =>{
                bg.onload = function() {
                    ctx.drawImage(bg, 0, -10, 300, 200);
                    resolve()
                };
            }) 
        }

        watch(el, async () => {
            if(el.value){
                await renderBackground();
                renderCar();
            }
        })

        return {
            el,
            position,
            style,
            renderCar,
            carVisible
        };
    },
    

}
</script>

<style>
.canvas {
  width: 1400px;
  height: 750px;
  margin-top: 100px;
  border: 3px solid black;
}

</style>