import Roads from "@/assets/roads.jpg";
import CarTopView from "@/assets/blue_car.png";
import { watch } from "@vue/runtime-core";

export default function useImageLoader(element) {
    watch(element, (element, prevElement) => {
        if (!element instanceof HTMLElement) return;
        const ctx = element.getContext("2d");  
        const bg = new Image();
        bg.src = Roads;
        bg.onload = function() {
                ctx.drawImage(bg, 0, -10, 300, 200);
                const car = new Image();
                car.src = CarTopView;
                car.onload = function() {
                    ctx.drawImage(car, 0, -10, 300, 200);
                };
        };
    });
    

    return {}

}