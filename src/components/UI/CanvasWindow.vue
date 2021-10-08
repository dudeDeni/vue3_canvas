<template>
    <canvas
        ref="el"
        class="canvas"
    >
    </canvas>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed } from "vue";
import Roads from "@/assets/Intersection.svg";
import CarTopView from "@/assets/CarTopView.svg";
import BlueCar from "@/assets/blue_car.png";


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
        const carVisible =  ref();
        let raf;

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
                    ctx.drawImage(bg, 0, -45, 300, 250);
                    resolve()
                };
            }) 
        }
        ///////// Draging logic ////////////
        const position = reactive({
            init: false,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            isDragging: false,
            dragStartX: null,
            dragStartY: null,
        });

        const drawCar = () => {
            const ctx = el.value.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            const car = new Image();
            car.src = CarTopView;
            ctx.beginPath();
            car.onload = function() {
                ctx.drawImage(car, position.x, position.y, 28, 50);
            };
            ctx.closePath();
        };

        const renderImg = () => {
            const canvas = el.value;
            const ctx = canvas.getContext("2d");
            renderBackground();
            ctx.save()
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            drawCar();
        };
        
        const onMouseDown = e => {
            let {layerX, layerY } = e;
            position.dragStartX = layerX/5 - position.x;
            position.dragStartY = layerY/5 - position.y;

            position.isDragging = true;
            console.log("e.layerX", layerX)
            console.log("clientX", e.clientX)
            console.log("pageX", e.pageX)
            console.log("position", position.x, position.y)

            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mousemove", onMouseMove);
            
        };
        const onMouseMove = e => {
            let { layerX, layerY } = e;
            position.x = layerX/5 - position.dragStartX;
            position.y = layerY/5 - position.dragStartY;
            
        };
        const onMouseUp = e => {
            position.isDragging = false;
            position.dragStartX = null;
            position.dragStartY = null;

            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        };

        onMounted(() => {
            drawCar()
        })

        watch(el, (el, prevElement, onCleanup) => {
            document.addEventListener("mousedown", onMouseDown);

            onCleanup(() => {
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("mousemove", onMouseMove);
                if (el instanceof HTMLElement) {
                    document.removeEventListener("mousedown", onMouseDown);
                }
            })
        });

        watch(position, (position, prevPos) => {
            if(position){
                renderImg()
            }
        })

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
                    drawCar();
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
  border: 3px solid black;
}

</style>