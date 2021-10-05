<template>
    <canvas
        ref="el"
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
import CarTopView from "@/assets/CarTopView.svg";


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
        const {position} = useMakeDragable(el);
        const {} = useImageLoader(el);
        const carVisible =  ref();

        const renderCar = async () => {
            const canvas = el.value;
            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            const car = new Image();
            car.src = CarTopView;

            car.onload = function() {
                ctx.drawImage(car, 10, 20, 20, 40);
                console.log('car spawned')
            };
        }

        const renderBackground = () => {
            const ctx = el.value.getContext("2d");
            ctx.imageSmoothingEnabled = false;  
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
            }
        })
        watch(
            () => props.carVisible,
            (carVisible, prevCarVisible) => {
                console.log("watcher: ", carVisible, prevCarVisible)
                if(props.carVisible) {
                    renderCar()
                }else {
                    renderBackground()
                }
            }
        )

        return {
            el,
            position,
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