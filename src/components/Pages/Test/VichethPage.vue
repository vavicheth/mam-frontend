<template>
  <h1>Hello, My name VICHETH</h1>
</template>

<script setup lang="ts">

import {defineComponent} from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import TermsConditions from "@/components/Others/Settings/TermsConditions/index.vue";


export default defineComponent({
  name: "VichethPage",
  components: {
    PageTitle,
    TermsConditions,
  },
});


</script>

<style scoped lang="scss">

</style>