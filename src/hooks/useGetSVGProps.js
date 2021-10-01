import { ref, reactive, computed, watch, onMounted } from "vue";

export default function useGetSVGProps(position){
    const svgProps = computed(() => {
        if (position.init) {
          return {
            attr: {
              transform: `matrix(1 0 0 1 ${position.x} ${position.y})`,
              width: position.width + "px",
              height: position.height + "px",
              cursor: position.isDraging ? "grab" : "pointer"
            }
          };
        } else {
          return {
            attr: {}
          };
        }
      });
      return {
        svgProps
      };
}