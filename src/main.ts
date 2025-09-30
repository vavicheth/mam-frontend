import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";
import { vTooltip } from "./utils/vTooltip";
import clickToSeeCodeDirective from "./utils/clickToSeeCode";
import customPopover from "./utils/popover";

import "swiper/css/bundle";

import "./assets/css/remixicon.css";
import "./assets/style.css";

const app = createApp(App).use(router);
app.use(VueApexCharts);
app.component("QuillEditor", QuillEditor);
app.directive("tooltip", vTooltip);
app.directive("click-to-see-code", clickToSeeCodeDirective);
app.directive("custom-popover", customPopover);
app.mount("#app");
