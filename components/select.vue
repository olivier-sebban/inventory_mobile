<template>
  <Listbox as="div" v-model="selected">
    <div class="relative mt-2">
      <ListboxButton
        class="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-[#A8A8A8] shadow-sm ring-0 outline-none sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{ selected.attributes.name }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-[#A8A8A8]" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="person in data"
            :key="person.id"
            :value="person"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-black text-white' : 'text-[#A8A8A8]',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span
                :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                >{{ person.attributes.name }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blacbg-black',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  selected: {
    type: Object,
    required: false,
  },
});
const dataRoom = ref(props.data);
const autre = {
  attributes: {
    id: "autre",
    name: "Autre",
  },
};

if (autre.attributes.id !== dataRoom.value[0].attributes.id) {
  dataRoom.value.unshift(autre);
}
const selected = ref(null);
const emit = defineEmits(["update:modelValue"]);
if (props.selected) {
  selected.value = props.selected;
} else {
  selected.value = dataRoom.value[0];
}
emit("update:modelValue", selected.value);
watch(
  () => selected.value,
  (val) => emit("update:modelValue", val)
);

watch(
  () => props.selected,
  (val) => {
    selected.value = val;
  }
);
</script>
