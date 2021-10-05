import { ref, reactive, computed, watch, onMounted } from "vue";
import CarTopView from "@/assets/blue_car.png";

export default function useMakeDragable(el) {
    
    watch(el.value, async (el, prevElement) => {
        if(el.value){
            renderImg();
            position.drawCar();

        }
    })
    
    const position = reactive({
        init: false,
        x: 0,
        y: 0,
        moveX: 5,
        moveY: 2,
        width: 0,
        height: 0,
        isDragging: false,
        dragStartX: null,
        dragStartY: null,

        drawCar: (el) => {
            const ctx = el.value.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            const car = new Image();
            car.src = CarTopView;
            ctx.beginPath();
            car.onload = function() {
                ctx.drawImage(car, this.x, this.y, 20, 40);
                console.log('Blue car spawned')
            };
            ctx.closePath();
        },
    });

    const renderImg = (el) => {
        const canvas = el.value;
        const ctx = el.value.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        position.drawCar();
        position.x += position.moveX;
        position.y += position.moveY;
        window.requestAnimationFrame(renderImg);
    }
    
    const onMouseDown = e => {
        let {clientX, clientY } = e;
        position.dragStartX = clientX - position.x;
        position.dragStartY = clientY - position.y;

        position.isDragging = true;

        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);
        const raf = window.requestAnimationFrame(renderImg);
        return raf
    };
    const onMouseMove = e => {
        let { clientX, clientY } = e;
        position.x = clientX - position.dragStartX;
        position.y = clientY - position.dragStartY;
    };
    const onMouseUp = e => {
        position.isDragging = false;
        position.dragStartX = null;
        position.dragStartY = null;

        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        window.cancelAnimationFrame;
    };

    watch(el, (el, prevElement, onCleanup) => {
        let rect;

        if (el instanceof HTMLElement) {
            rect = el.getBoundingClientRect(el);
        } else if (el instanceof SVGGraphicsElement) {
            rect = el.getBBox(el);
        }
        if (rect === undefined) return {
        position: {}
        };

        position.init = true;
        position.x = Math.round(rect.x);
        position.y = Math.round(rect.y);
        position.width = Math.round(rect.width);
        position.height = Math.round(rect.height);

        el.addEventListener("mousedown", onMouseDown);

        onCleanup(() => {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
            if (el instanceof HTMLElement) {
                el.removeEventListener("mousedown", onMouseDown);
            }
        })
    });

    

    return {
        position,
    }
}