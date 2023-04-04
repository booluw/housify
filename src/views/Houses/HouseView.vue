<template>
  <div class="relative min-h-screen">
    <div class="relative">
      <div
        class="absolute top-0 bottom-0 flex items-center left-0 bg-black bg-opacity-30"
      >
        <i
          class="icofont-rounded-left text-5xl text-secondary"
          @click="slideBack()"
        ></i>
      </div>
      <img :src="house.imgs[position]" class="w-full h-auto" />
      <div
        class="absolute top-0 bottom-0 flex items-center right-0 bg-black bg-opacity-30"
      >
        <i
          class="icofont-rounded-right text-5xl text-secondary"
          @click="slideFront()"
        ></i>
      </div>
    </div>
    <div class="p-5">
      <h1 class="text-primary text-2xl font-bold">{{ house.name }}</h1>
      <div class="">
        Agent: <b>{{ house.agent.name }}</b>
        <i
          class="icofont-badge"
          :class="house.agent.verified ? 'text-blue-500' : 'text-red-500'"
          :title="`Agent is${!house.agent.verified ? ' not' : ''} verified`"
        ></i>
      </div>
    </div>
    <div class="p-5">
      <h2 class="">Benefits:</h2>
      <div class="my-5 flex gap-3">
        <div class="border-primary border-r pr-2">
          <i
            class="icofont-water-drop text-3xl"
            :class="house.water ? 'text-blue-500' : 'text-red-500'"
            :title="house.water ? 'Water available': 'Water not available'"
          ></i>
        </div>
        <div class="border-primary border-r pr-2">
          <i
            class="icofont-power-zone text-3xl"
            :class="house.transformer ? 'text-blue-500' : 'text-red-500'"
            :title="house.transformer ? 'Private transformer': 'General transformer'"
          ></i>
        </div>
        <div class="border-primary border-r pr-2">
          {{ house.location }}
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 right-0 left-0 p-5 bg-primary bg-opacity-25">
      <el-button type="primary" class="w-full">
        Book for ₦{{ Number(house.price).toLocaleString("en") }}/Yr
      </el-button>
      <p class="text-xs text-center text-red-500 mt-3">
        You'll be given the agent's contact. Do not pay unless you see what
        you're paying for.
      </p>
    </div>
    {{ house }}
  </div>
</template>

<script>
import { fetchHouse } from "@/services/houses";

export default {
  name: "HouseView",
  data() {
    return {
      house: {},
      position: 0,
    };
  },
  methods: {
    slideBack() {
      if (this.position === 0) {
        return;
      } else {
        this.position--;
      }
    },
    slideFront() {
      if (this.position === this.house.imgs.length - 1) {
        this.position = 0;
      } else {
        this.position++;
      }
    },
    async fetchThisHouse() {
      try {
        const response = await fetchHouse(this.$route.params.id);
        this.house = response[0];
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
    },
  },
  mounted() {
    this.fetchThisHouse();
  },
};
</script>
