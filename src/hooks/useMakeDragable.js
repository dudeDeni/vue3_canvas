import { ref, reactive, computed, watch, onMounted } from "vue";
import CarTopView from "@/assets/blue_car.png";

export default function useMakeDragable(element) {
    
    const position = reactive({
        init: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isDragging: false,
        dragStartX: null,
        dragStartY: null
    });

    const style = computed(() => {
        if (position.init) {
            return {
                position: "absolute",
                left: position.x + "px",
                top: position.y + "px",
                width: position.width + "px",
                height: position.height + "px",
                "box-shadow": position.isDragging
                ? "3px 6px 16px rgba(0, 0, 0, 0.15)"
                : "",
                transform: position.isDragging ? "translate(-3px, -6px)" : "",
                cursor: position.isDragging ? "grab" : "pointer"
            };
        }
        return {};
    });

    const onMouseDown = e => {
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
    };
    const onMouseUp = e => {
        position.isDragging = false;
        position.dragStartX = null;
        position.dragStartY = null;

        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
    };


    watch(element, (element, prevElement, onCleanup) => {
        let rect;

        if (element instanceof HTMLElement) {
            rect = element.getBoundingClientRect(element);
        } else if (element instanceof SVGGraphicsElement) {
            rect = element.getBBox(element);
        }
        if (rect === undefined) return {
        position: {}
        };

        position.init = true;
        position.x = Math.round(rect.x);
        position.y = Math.round(rect.y);
        position.width = Math.round(rect.width);
        position.height = Math.round(rect.height);

        element.addEventListener("mousedown", onMouseDown);

        onCleanup(() => {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
            if (element instanceof HTMLElement) {
                element.removeEventListener("mousedown", onMouseDown);
            }
        })
    });

    

    return {
        position, style
    }
}