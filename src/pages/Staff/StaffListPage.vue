<template>
  <PageTitle pageTitle="Staff List" subTitle="Settings" />

  <Members />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/Common/PageTitle.vue";
import Members from "@/components/Modules/Members/index.vue";

export default defineComponent({
  name: "StaffListPage",
  components: {
    PageTitle,
    Members,
  },
});
</script>
