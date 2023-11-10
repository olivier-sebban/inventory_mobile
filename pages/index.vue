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
        class="absolute top-0 left-0 flex items-center justify-center small-max:px-10 bg-black/50 transition-all w-screen z-[999] h-screen"
        v-if="roomInfo"
      >
        <div
          class="relative flex flex-row small:flex-col gap-4 bg-white/50 shadow-sm z-[50] border rounded-2xl p-4 small:w-full w-fit max-w-full small:max-w-xs"
        >
          <div
            @click="roomInfo = false"
            class="bg-white text-black absolute top-0 right-0 rounded-full flex small:flex-row flex-col justify-center items-center z-50"
          >
            <font-awesome-icon icon="times-circle" class="text-3xl" />
          </div>
          <img :src="img" class="small:!w-full w-1/2 aspect-square object-cover" alt="" />
          <div class="flex flex-col gap-4 flex-1">
            <Select
              :data="room"
              :selected="roomSelect"
              @update:modelValue="
                (val) => {
                  roomSelect = val;
                }
              "
            />
            <input
              type="text"
              placeholder="Pièce"
              class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none w-full"
              name=""
              v-model="input2"
              id=""
            />
            <div class="flex small:flex-row flex-col gap-4">
              <input
                type="text"
                placeholder="Intitulé de l’objet"
                class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none w-full"
                name=""
                v-model="input3"
                id=""
              />
              <input
                type="number"
                placeholder="0"
                min="0"
                class="bg-white px-4 py-1.5 border-[#A8A8A8] placeholder:text-[#A8A8A8] text-[#A8A8A8] ring-0 outline-none w-full small:w-20"
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
        </div>
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
    @click.stop.prevent.passive="
      () => {
        showInfo = !showInfo;
        shareInfo = false;
        userInfo = false;
      }
    "
    :class="showInfo ? 'right-0 w-screen' : '-right-[40vw] w-[50vw]'"
    class="h-screen fixed top-0 transition-all duration-1000 ease-in-out z-40"
  >
    <div class="w-[50vw] ml-auto h-full bg-white pl-4 relative">
      <div>
        <font-awesome-icon icon="times-circle" class="absolute top-0 right-0 text-2xl" />
      </div>
      <div
        class="w-16 h-16 bg-black text-white absolute top-8 aspect-square rounded-full text-xl border flex justify-center items-center -left-8"
      >
        {{ Object.values(allImage).reduce((total, pieces) => total + pieces.length, 0) }}
      </div>
      <div class="w-full overflow-auto h-full pb-20">
        <div class="h-24"></div>

        <div class="w-full flex flex-col gap-6">
          <template v-for="(info, key) in allImage">
            <div>
              <h2 class="font-bold text-base uppercase mb-2">{{ key }}</h2>
              <div class="grid grid-cols-2 gap-0">
                <div class="w-full relative !aspect-square pr-4" v-for="i in info">
                  <font-awesome-icon
                    @click.self.stop="
                      () => {
                        allImage[key].splice(allImage[key].indexOf(i), 1);
                        if (allImage[key].length == 0) {
                          delete allImage[key];
                        }
                        showInfo = true;
                        shareInfo = false;
                        userInfo = false;
                      }
                    "
                    icon="times-circle"
                    class="absolute z-50 -top-2 right-2 p-1 text-red-500 text-sm"
                  />
                  <img :src="i.img" class="object-cover w-full !aspect-square" />
                  <p>{{ i.intitule }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
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
    :class="shareInfo && showInfo ? 'translate-y-0' : 'translate-y-full'"
    class="w-screen fixed transition-all duration-1000 bg-primary text-white bottom-0 grid grid-cols-4 left-0 gap-9 z-50 sm:p-16 px-5 py-12"
  >
    <div @click="share(i)" v-for="i in dataShare" class="flex flex-col gap-2">
      <div
        v-if="i.iconUrl"
        :style="
          'height: 48px; width:100%;display: inline-block;-webkit-mask: url(' +
          i.iconUrl +
          ')  no-repeat 50% 50%;mask: url(' +
          i.iconUrl +
          ')  no-repeat 50% 50%;-webkit-mask-size: contain;mask-size: contain;'
        "
        class="bg-opacity-100"
        :class="!isPrimaryLight ? 'bg-white' : 'bg-black'"
      ></div>
      <p
        class="text-xs text-center"
        :class="!isPrimaryLight ? 'text-white' : 'text-black'"
      >
        {{ i.label }}
      </p>
    </div>
  </div>
  <div
    :class="[
      shareInfo && showInfo && userInfo ? 'translate-y-0' : 'translate-y-full',
      !isPrimaryLight ? 'text-white' : 'text-black',
    ]"
    class="w-screen max-h-screen overflow-y-auto fixed min-h-[50vh] bottom-0 transition-all duration-1000 bg-primary grid grid-cols-1 left-0 gap-9 z-50"
  >
    <div class="w-full h-full grid grid-cols-1 relative gap-9 sm:p-16 p-5">
      <p class="text-[17px] text-center font-semibold">
        Nous avons besoin de quelques informations pour vous envoyer votre inventaire
      </p>
      <div class="flex flex-col gap-0 mb-32">
        <template v-for="i in input_structure">
          <div v-if="i.type == 'text'" class="px-6 py-5 border border-tertiary w-full">
            <input
              type="text"
              v-model="info[i.name]"
              class="bg-inherit outline-none ring-0"
              :class="
                !isPrimaryLight ? 'placeholder:text-white' : 'placeholder:text-black'
              "
              :placeholder="i.placeholder"
            />
          </div>
          <div v-if="i.type == 'checkbox'" class="mt-2">
            <label class="flex gap-2 items-center">
              <input
                type="checkbox"
                v-model="info[i.name]"
                name=""
                id=""
                class="outline-none ring-0 w-5 border-white aspect-square"
              />
              <p class="text-lg">{{ i.placeholder }}</p>
            </label>
          </div>
        </template>
      </div>
      <div class="absolute bottom-0 w-full right-0">
        <div
          @click="envoyer"
          class="cursor-pointer text-black text-2xl font-semibold ml-auto w-fit min-w-[50vw] bg-[#00DC8D] py-6 px-14 flex justify-center items-center"
        >
          VALIDER
        </div>
      </div>
    </div>
  </div>
  <div class="md:hidden w-screen h-screen object-cover max-md:hidden" />
  <div
    v-if="shareResult != null"
    class="fixed top-0 z-[999999] left-0 w-screen h-screen max-h-screen bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white max-w-sm mx-auto rounded-lg p-4 small:py-16 relative">
      <div
        @click="
          roomInfo = false;
          shareResult = null;
          showInfo = !showInfo;
          shareInfo = false;
          userInfo = false;
        "
        class="bg-white text-black absolute top-0 right-0 rounded-full flex small:flex-row flex-col justify-center items-center z-50"
      >
        <font-awesome-icon icon="times-circle" class="text-3xl" />
      </div>
      <p class="w-3/4 mx-auto mb-8 text-center">
        {{ shareResult?.title }}
      </p>
      <a :href="shareResult?.link" class="w-1/2 mx-auto flex justify-center items-center">
        <img :src="shareResult?.img" class="w-full" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { customAlphabet } from "nanoid";
import nuxtStorage from "nuxt-storage";
import Camera from "simple-vue-camera";
const route = useRoute();

const url = useRequestURL();
let hostname = url.hostname;
const domainParts = hostname.split(".");
hostname = domainParts.slice(-2).join(".");

if (nuxtStorage.localStorage?.getData("uuid") == null) {
  const nanoid = customAlphabet("1234567890abcdef", 10);
  nuxtStorage.localStorage?.setData("uuid", nanoid(10), 60, "d");
}
let uuid = 0;
if (route.query?.id) {
  uuid = route.query?.id;
  nuxtStorage.localStorage?.setData("uuid", uuid, 60, "d");
} else {
  uuid = nuxtStorage.localStorage?.getData("uuid");
}

const config = useRuntimeConfig();
const info = ref({});
const api_structure = config.public.apiStructure;
const api_room = config.public.apiRoom;
const apiSaveInventory = config.public.apiSaveInventory;

const structure = ref(null);
const rooms = ref(null);
const dataShare = ref(null);
const input_structure = ref(null);
const isPrimaryLight = ref(false);
const isSecondaryLight = ref(false);
const isTertiaryLight = ref(false);
const color_primary = ref(null);
const color_secondary = ref(null);
const color_tertiary = ref(null);

const isColorLight = (hexColor) => {
  hexColor = hexColor?.replace(/^#/, "");
  const r = parseInt(hexColor?.slice(0, 2), 16);
  const g = parseInt(hexColor?.slice(2, 4), 16);
  const b = parseInt(hexColor?.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200;
};
const apiStructure = api_structure.replace("localhost", hostname);

$fetch(apiStructure, {
  onResponse: async ({ response: res }) => {
    const data = await res;
    structure.value = data._data?.data[0]?.attributes;
    dataShare.value = structure.value.toolbox[0].inventaire[0].options[0].actions;

    color_primary.value = structure.value.toolbox[0]?.inventaire[0].color1;
    color_secondary.value = structure.value.toolbox[0]?.inventaire[0].color2;
    color_tertiary.value = structure.value.toolbox[0]?.inventaire[0].color3;

    isPrimaryLight.value = isColorLight(color_primary.value);
    isSecondaryLight.value = isColorLight(color_secondary.value);
    isTertiaryLight.value = isColorLight(color_tertiary.value);

    document.documentElement.style.setProperty("--primary", color_primary.value);
    document.documentElement.style.setProperty("--secondary", color_secondary.value);
    document.documentElement.style.setProperty("--tertiary", color_tertiary.value);

    input_structure.value =
      structure.value?.toolbox[0]?.inventaire[0]?.options[0]?.formContact[0]?.inputs;
    const clarity = structure.value?.toolbox[0].clarity;
    const google_tag = structure.value?.google_tag;
    const Gtag =
      google_tag != 0 && google_tag != "0"
        ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${google_tag}')`
        : "";

    const clr =
      clarity != 0 && clarity != "0"
        ? `(function(c,l,a,r,i,t,y){
	c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
	t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
	y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
	})(window, document, "clarity", "script", '${clarity}');`
        : "";

    useHead({
      script: [
        {
          innerHTML: Gtag,
          type: "text/plain",
          "data-cookiecategory": "analytics",
        },
        {
          innerHTML: clr,
          type: "text/plain",
          "data-cookiecategory": "targeting",
        },
      ],
    });
  },
});

const room = ref(null);

$fetch(api_room, {
  onResponse: async ({ response: res }) => {
    const data = await res;
    room.value = data._data?.data;
  },
});

const camera = ref();
const roomInfo = ref(false);
const showInfo = ref(false);
const allImage = ref({});
const img = ref("");
const imgBlob = ref(null);
const snapshot = async () => {
  const blob = await camera.value?.snapshot();
  img.value = window.URL.createObjectURL(blob);
  imgBlob.value = blob;
  roomInfo.value = true;
};
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const roomSelect = ref(null);
const ajouter = () => {
  if (
    roomSelect.value != null &&
    input3.value != "" &&
    input2.value != "" &&
    input4.value != ""
  ) {
    if (!allImage.value[roomSelect.value.attributes.name + " : " + input2.value]) {
      allImage.value[roomSelect.value.attributes.name + " : " + input2.value] = [];
    }

    allImage.value[roomSelect.value.attributes.name + " : " + input2.value].push({
      img_blob: imgBlob.value,
      img: img.value,
      room: roomSelect.value,
      nom: input2.value,
      intitule: input3.value,
      nb: input4.value,
    });

    imgBlob.value = null;
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

const error = ref(false);
const action = ref(0);
const shareResult = ref(null);
const share = (e) => {
  if (showInfo.value && shareInfo.value) {
    userInfo.value = true;
    action.value = e.action;
  }
};
const envoyer = () => {
  const listR = [];
  const listI = [];
  for (const i in allImage.value) {
    listR.push({ ...allImage.value[i][0].room, room: allImage.value[i][0].nom });
  }
  for (const i in allImage.value) {
    for (const item in allImage.value[i]) {
      console.log(item);
      listI.push({
        img_blob: allImage.value[i][item].img_blob,
        room: allImage.value[i][item].room,
        room_name: allImage.value[i][item].nom,
        intitule: allImage.value[i][item].intitule,
        nb: allImage.value[i][item].nb,
      });
    }
  }
  error.value = false;
  input_structure.value.forEach((element) => {
    if (element.required) {
      if (info.value[element.name] == undefined || info.value[element.name] == "") {
        error.value = true;
      }
    }
  });

  if (!error.value) {
    const data = {
      uid: uuid,
      domain: hostname,
      rooms: listR,
      items: listI,
      customer: info.value,
      action: action.value,
      url: url.origin,
    };
    const { data: dataRes } = useFetch(apiSaveInventory, {
      method: "POST",
      body: JSON.stringify(data),
      onResponse: (data) => {
        shareResult.value = data.response._data;
        console.log(data.response._data);
      },
    });
  } else {
  }
};
</script>
