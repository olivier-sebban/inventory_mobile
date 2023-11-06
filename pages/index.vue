<template>
  <div class="h-screen w-screen bg-black">
    <Camera class="w-screen h-screen" :playsinline="true" ref="camera" autoplay>
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
          class="bg-black text-white rounded-md font-semibold w-fit mx-auto text-xl mt-2 px-4 py-2"
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
    @click="
      showInfo = !showInfo;
      shareInfo = false;
      userInfo = false;
    "
    :class="showInfo ? 'right-0' : '-right-[40vw]'"
    class="w-[50vw] px-4 bg-white h-screen fixed top-0 transition-all duration-1000 ease-in-out z-40"
  >
    <div
      class="w-16 h-16 bg-black text-white absolute top-8 aspect-square rounded-full text-xl border flex justify-center items-center -left-8"
    >
      {{ allImage.length }}
    </div>
    <div class="w-full overflow-auto h-full pb-20">
      <div class="h-32"></div>

      <div class="w-full grid grid-cols-2 gap-4">
        <template v-for="image in allImage">
          <div class="w-full !aspect-square">
            <img :src="image.img" class="object-cover w-full !aspect-square" />
          </div>
        </template>
      </div>
    </div>
  </div>
  <div
    @click="
      terminer();
      showInfo = true;
    "
    class="cursor-pointer h-20 w-[50vw] z-50 flex justify-center items-center bg-[#00DC8D] text-2xl sm:text-3xl fixed bottom-0 uppercase transition-all duration-1000 ease-in-out"
    :class="showInfo ? 'right-0' : '-right-[40vw]'"
  >
    TERMINER
  </div>
  <div
    :class="shareInfo && showInfo ? 'bottom-0' : '-bottom-full'"
    class="w-screen fixed transition-all duration-1000 bg-black text-white grid grid-cols-4 left-0 gap-9 z-50 sm:p-16 px-5 py-12"
  >
    <div @click="share" class="flex flex-col gap-2">
      <img src="@/assets/img/copy.svg" class="w-[55px] aspect-square mx-auto" alt="" />
      <p class="text-xs text-center">Copy url</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img
        src="@/assets/img/whatsapp.svg"
        class="w-[55px] aspect-square mx-auto"
        alt=""
      />
      <p class="text-xs text-center">WhatsApp</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img src="@/assets/img/insta.svg" class="w-[55px] aspect-square mx-auto" alt="" />
      <p class="text-xs text-center">Direct</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img
        src="@/assets/img/telegram.svg"
        class="w-[55px] aspect-square mx-auto"
        alt=""
      />
      <p class="text-xs text-center">Telegram</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img
        src="@/assets/img/messenger.svg"
        class="w-[55px] aspect-square mx-auto"
        alt=""
      />
      <p class="text-xs text-center">Messenger</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img src="@/assets/img/twiiter.svg" class="w-[55px] aspect-square mx-auto" alt="" />
      <p class="text-xs text-center">twiiter</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img src="@/assets/img/message.svg" class="w-[55px] aspect-square mx-auto" alt="" />
      <p class="text-xs text-center">Messages</p>
    </div>
    <div @click="share" class="flex flex-col gap-2">
      <img src="@/assets/img/plus.svg" class="w-[55px] aspect-square mx-auto" alt="" />
      <p class="text-xs text-center">More</p>
    </div>
  </div>
  <div
    :class="shareInfo && showInfo && userInfo ? 'bottom-0' : '-bottom-full'"
    class="w-screen fixed min-h-[50vh] transition-all duration-1000 bg-black text-white grid grid-cols-1 left-0 gap-9 z-50 sm:p-16 p-5"
  >
    <p class="text-[17px] text-center font-semibold">
      Nous avons besoin de quelques informations pour vous envoyer votre inventaire
    </p>
    <div class="flex flex-col gap-0 mb-32">
      <div class="px-6 py-5 border border-white w-full">
        <input
          type="text"
          class="text-white bg-inherit outline-none ring-0 placeholder:text-gray-300"
          placeholder="EMAIL"
        />
      </div>
      <div class="px-6 py-5 border border-white border-t-0 w-full">
        <input
          type="text"
          class="text-white bg-inherit outline-none ring-0 placeholder:text-gray-300"
          placeholder="NOM"
        />
      </div>
      <div class="px-6 py-5 border border-white w-full border-t-0">
        <input
          type="text"
          class="text-white bg-inherit outline-none ring-0 placeholder:text-gray-300"
          placeholder="TEL"
        />
      </div>
      <div class="mt-2">
        <label class="flex gap-2 items-center">
          <input
            type="checkbox"
            name=""
            id=""
            class="outline-none ring-0 w-5 bg-black border-white aspect-square"
          />
          <p class="text-lg text-white">etes vous interessé par des produits</p>
        </label>
      </div>
    </div>
    <div class="absolute bottom-0 w-full right-0">
      <div
        class="text-black text-2xl font-semibold ml-auto w-fit min-w-[50vw] bg-[#00DC8D] py-6 px-14 flex justify-center items-center"
      >
        VALIDER
      </div>
    </div>
  </div>
  <div class="md:hidden w-screen h-screen object-cover max-md:hidden" />
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
const shareInfo = ref(false);
const userInfo = ref(false);
const terminer = () => {
  if (showInfo.value) {
    shareInfo.value = true;
  }
};

const share = () => {
  if (showInfo.value && shareInfo.value) {
    userInfo.value = true;
  }
};
</script>
