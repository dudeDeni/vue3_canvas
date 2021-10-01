<template>
    <canvas
        ref="el"
        :style="style"
        class="canvas"
    >
    </canvas> 
    <pre>{{ position }}</pre>
    <car-component></car-component>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import useMakeDragable from "@/hooks/useMakeDragable";
import useImageLoader from "@/hooks/useImageLoader";
import Roads from "@/assets/roads.jpg";
import CarTopView from "@/assets/blue_car.png";


export default {
    name: 'CanvasWindow',
    data() {
        return {
            
        }
    },
    setup() {
        const el = ref(null);
        const {position, style} = useMakeDragable(el);
        const {} = useImageLoader(el);
        

        const renderCar = () => {
            
            const ctx = el.value.getContext("2d"); 
            const car = new Image();
            car.src = CarTopView;
            car.onload = function() {
                ctx.drawImage(car, 0, -10, 300, 200);
            };
             
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
                renderBackground();
                renderCar();
                console.log(el.value)

            }
        })


        return {
            el,
            position,
            style,
            
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