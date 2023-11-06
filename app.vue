<template>
  <NuxtLoadingIndicator style="opacity: 1 !important" />
  <div class="md:hidden">
    <NuxtPage />
  </div>
  <img
    src="@/assets/img/gettyimages.jpg"
    class="w-screen h-screen object-cover max-md:hidden"
    alt=""
  />
</template>
<script setup>
// onMounted(() => {
//   const noOp = function () {};
//   console.clear();
//   window.console = {
//     log: noOp,
//     dir: noOp,
//     info: noOp,
//     debug: noOp,
//     warn: noOp,
//     error: noOp,
//   };
// });
</script>
