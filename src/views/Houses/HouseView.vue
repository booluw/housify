<template>
  <div class="relative min-h-screen md:px-14">
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
        Landlord: <b>{{ house.agent.name }}</b>
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
            :title="house.water ? 'Water available' : 'Water not available'"
          ></i>
        </div>
        <div class="border-primary border-r pr-2">
          <i
            class="icofont-power-zone text-3xl"
            :class="house.transformer ? 'text-blue-500' : 'text-red-500'"
            :title="
              house.transformer ? 'Private transformer' : 'General transformer'
            "
          ></i>
        </div>
        <div class="border-primary border-r pr-2">
          {{ house.location }}
        </div>
      </div>
    </div>
    <div class="p-5">
      <h2 class="">Description:</h2>
      <p class="">
        {{ house.description || "No Description" }}
      </p>
    </div>
    <div class="p-5">
      <h2 class="">Looking for a roommate?</h2>
      <div class="mb-40" v-if="roommates.length !== 0">
        <div
          class="mt-3 bg-gray-100 rounded p-5"
          v-for="roommate in roommates"
          :key="roommate.id"
        >
          <b>{{ roommate.name }}</b> is looking for a roommate.
          <p class="my-3 italic border-t pt-2">
            {{ roommate.conditions }}
          </p>
          <a
            :href="`tel:${roommate.phone_number}`"
            class="text-primary font-bold"
            >Click to call {{ roommate.name }}</a
          >
        </div>
      </div>
      <div class="mt-3 mb-32">
        <el-button type="secondary" class="w-full" @click="roommateModal = true"
          >Ask for Room mate</el-button
        >
      </div>
    </div>
    <div class="fixed bottom-0 right-0 left-0 p-5 bg-secondary">
      <button
        class="mt-3 w-full bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
        @click="bookLodgeModal = true"
      >
        Book for ₦{{ Number(house.price).toLocaleString("en") }}/Yr
      </button>
    </div>
    <el-dialog title="Ask for Room mate" :visible.sync="roommateModal" width="100%" fullscreen>
      <el-form :model="form" class="w-full md:w-1/2">
        <el-form-item label="Your name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your phone number">
          <el-input v-model="form.phone_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your conditions">
          <el-input type="textarea" v-model="form.conditions" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roommateModal = false">Cancel</el-button>
        <button
          class="bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
          :disabled="loading"
          @click="submitRoomMate()"
        >
          Submit
        </button>
      </span>
    </el-dialog>
    <el-dialog :title="`Book a room in ${house.name}`" :visible.sync="bookLodgeModal" width="100%" fullscreen>
      <div class="">
        Please contact <b>{{ house.agent.name }}</b> for this lodge.
        <br />
        Contact <b>{{ house.agent.name }}</b> on <b>{{ house.agent.phone }}</b>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bookLodgeModal = false">Cancel</el-button>
        <a
          :href="`tel:${house.agent.phone}`"
          class="ml-4 bg-blue-500 text-white py-3 px-7 rounded-lg"
        >
          Click to call {{ house.agent.name }}
        </a>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchHouse, fetchRoommates, setRoommates } from "@/services/houses";

export default {
  name: "HouseView",
  data() {
    return {
      house: {},
      position: 0,
      roommates: [],
      roommateModal: false,
      bookLodgeModal: false,
      formLabelWidth: '120px',
      form: {
        name: "",
        phone_number: "",
        conditions: "",
        house_id: this.$route.params.id
      },
      loading: false
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
    async fetchRoomMates() {
      try {
        let response = await fetchRoommates(this.$route.params.id);
        this.roommates = response;
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
    },
    async submitRoomMate() {
      this.loading = true
      try {
        const response = await setRoommates(this.form);
        console.log(response);
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchThisHouse();
    this.fetchRoomMates();
  },
};
</script>
