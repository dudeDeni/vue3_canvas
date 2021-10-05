<template>
    <canvas
        ref="el"
        class="canvas"
    >
    </canvas> 
    <pre>{{ position }}</pre>
    
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed } from "vue";
import Roads from "@/assets/roads.jpg";
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
                    ctx.drawImage(bg, 0, -10, 300, 200);
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
            car.src = BlueCar;
            ctx.beginPath();
            car.onload = function() {
                ctx.drawImage(car, position.x, position.y, 60, 50);
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
            e.stopPropagation();
            let {clientX, clientY } = e;
            position.dragStartX = clientX - position.x;
            position.dragStartY = clientY - position.y;

            position.isDragging = true;

            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mousemove", onMouseMove);
            
        };
        const onMouseMove = e => {
            let { clientX, clientY } = e;
            position.x = clientX - position.dragStartX;
            position.y = clientY - position.dragStartY;
            raf = window.requestAnimationFrame(renderImg);
        };
        const onMouseUp = e => {
            position.isDragging = false;
            position.dragStartX = null;
            position.dragStartY = null;

            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
            window.cancelAnimationFrame(raf);
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
  margin-top: 100px;
  border: 3px solid black;
}

</style>