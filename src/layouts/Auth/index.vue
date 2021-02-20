<template>
  <a-row>
    <a-col :span="24">
      <isc-auth-banner/>
      <router-view />
    </a-col>
  </a-row>
</template>

<script>
import IscAuthBanner from "@/components/auth/banner";
export default {
  name: "index",
  components: {IscAuthBanner},
}
</script>
<style lang="less" scoped>

</style>
