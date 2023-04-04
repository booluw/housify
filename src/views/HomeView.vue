<template>
  <div>
    <div class="bg-primary text-secondary p-5 md:p-20 h-52 md:h-96 relative overflow-hidden">
      <h1 class="font-bold text-2xl mt-5">
        Find accomodations before anyone else
      </h1>
      <i
        class="icofont-home text-secondary text-9xl absolute -bottom-9 -right-6"
      ></i>
    </div>
    <section class="px-5 py-10 md:px-20 bg-white">
      <h2 class="text-xl text-primary font-semibold">Houses for rent</h2>
      <div class="flex flex-col md:flex-row flex-wrap gap-5 mt-5 md:mt-10">
        <router-link
          :to="`/house/${house.house_id}`"
          class="w-full md:w-52 overflow-hidden md:pr-5 md:border-r"
          v-for="house in houses"
          :key="house.house_id"
        >
          <div class="w-full h-48 bg-primary rounded-2xl overflow-hidden">
            <img
              :src="house.imgs[1]"
              class="h-full w-auto transition-all hover:transition-all hover:scale-105"
            />
          </div>
          <div class="pt-3">
            <h3 class="font-semibold text-primary text-xl">{{ house.name }}</h3>
            <p class="opacity-60 mb-2">
              {{ house.location }}
            </p>
            <p class="text-primary">
              ₦{{ Number(house.price).toLocaleString("en") }}/Yr
            </p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchHouses } from "@/services/houses.js";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      range: {
        start: 0,
        end: 20,
      },
      houses: [],
    };
  },
  methods: {
    async fetchAllHouses() {
      try {
        const response = await fetchHouses(this.range);
        this.houses = response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchAllHouses();
  },
};
</script>
