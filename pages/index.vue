<template>
  <div class="h-screen w-screen bg-black">
    <Camera
      class="w-screen h-screen"
      :resolution="{ width: 480, height: 800 }"
      :playsinline="true"
      ref="camera"
      autoplay
    >
      <div
        class="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
      >
        <div
          class="w-2/3 h-2/3 border border-b-0 border-r-0 border-white absolute top-0 left-0"
        ></div>
        <div
          class="w-2/3 h-2/3 border border-t-0 border-l-0 border-white absolute bottom-0 right-0"
        ></div>
      </div>
      <div
        v-if="roomInfo"
        class="absolute flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 shadow-sm z-50 border rounded-2xl p-16"
      >
        <div
          @click="
            roomInfo = false;
            input2 = '';
            input3 = '';
            input4 = '';
          "
          class="bg-white text-black absolute top-0 right-0 rounded-full flex justify-center items-center"
        >
          <font-awesome-icon icon="times-circle" class="text-3xl" />
        </div>
        <img :src="img" class="!w-full aspect-square object-cover" alt="" />
        <Select />
        <input
          type="text"
          placeholder="Pièce"
          class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none"
          name=""
          v-model="input2"
          id=""
        />
        <div class="flex gap-4">
          <input
            type="text"
            placeholder="Pièce"
            class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none w-full"
            name=""
            v-model="input3"
            id=""
          />
          <input
            type="number"
            placeholder="Pièce"
            class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none w-20"
            name=""
            v-model="input4"
            id=""
          />
        </div>
        <button
          @click="ajouter"
          class="bg-black text-white rounded-md font-semibold w-fit mx-auto text-2xl mt-2 px-4 py-2"
        >
          Ajouter
        </button>
      </div>
    </Camera>
  </div>
  <button
    v-if="!roomInfo"
    class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full aspect-square"
    @click="snapshot"
  >
    <font-awesome-icon icon="camera" class="text-4xl" />
  </button>
  <div
    @click="showInfo = !showInfo"
    :class="showInfo ? 'right-0' : '-right-[40vw]'"
    class="w-[50vw] px-4 bg-white h-screen fixed top-0 transition-all duration-1000 ease-in-out z-50"
  >
    <div
      class="w-16 h-16 bg-black text-white absolute top-8 aspect-square rounded-full text-xl border flex justify-center items-center -left-8"
    >
      {{ allImage.length }}
    </div>
    <div class="w-full overflow-auto h-full pb-32">
      <div class="h-32"></div>

      <div class="w-full grid grid-cols-2 gap-4">
        <template v-for="image in allImage">
          <div class="w-full !aspect-square">
            <img :src="image.img" class="object-cover w-full !aspect-square" />
          </div>
        </template>
      </div>
      <div
        class="cursor-pointer h-28 w-[50vw] flex justify-center items-center bg-[#00DC8D] text-4xl fixed right-0 bottom-0 uppercase transition-all duration-1000 ease-in-out"
        :class="showInfo ? 'right-0' : '-right-[40vw]'"
      >
        TERMINER
      </div>
    </div>
  </div>
</template>

<script setup>
import Camera from "simple-vue-camera";
const camera = ref();
const roomInfo = ref(false);
const showInfo = ref(false);
const allImage = ref([]);
const img = ref("");
const snapshot = async () => {
  const blob = await camera.value?.snapshot();
  img.value = window.URL.createObjectURL(blob);
  roomInfo.value = true;
};
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const ajouter = () => {
  if (input2.value != "" && input3.value != "" && input4.value != "") {
    allImage.value.push({
      img: img,
      room: "room.value",
      input2: input2.value,
      input3: input3.value,
      input4: input4.value,
    });
    input2.value = "";
    input3.value = "";
    input4.value = "";
    roomInfo.value = false;
  }
};
</script>
