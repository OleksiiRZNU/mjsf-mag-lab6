import Vue from "vue";
import { provider } from "@/providers";

export const prepareTodo = () => {
    Vue.mixin({
        beforeCreate() {
            this.$services = provider();
        }
    })
}
