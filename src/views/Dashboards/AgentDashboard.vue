<template>
  <div class="px-5 md:px-14">
    <div class="flex justify-between items-start m-5">
      <h1 class="text-3xl">Welcome</h1>
      <button
        class="mt-3 bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
        @click="housesModal =  true"
      >
        Add New Lodge
      </button>
    </div>
    <el-table :data="houses" style="width: 100%" :loading="loading">
      <el-table-column label="" width="50">
        <template slot-scope="scope">
          <img :src="scope.row.imgs[0]" class="w-20" />
        </template>
      </el-table-column>
      <el-table-column label="Name" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Price" width="100">
        <template slot-scope="scope">
          ₦{{ Number(scope.row.price).toLocaleString("en") }}
        </template>
      </el-table-column>
      <el-table-column label="Location" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.location || "Not Available" }}
        </template>
      </el-table-column>
      <el-table-column label="Action" width="200">
        <template slot-scope="scope">
          <button
            @click="toggleAvailability(scope.row)"
            v-if="scope.row.available"
            class="mt-3 w-full bg-red-500 text-white py-3 px-7 rounded-lg shadow"
          >
            Mark as Unavailable
          </button>
          <button          
            class="mt-3 w-full bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
            @click="toggleAvailability(scope.row)"
            v-else
          >
            Mark as Available
          </button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Ask for Room mate"
      :visible.sync="housesModal"
      width="100%"
      fullscreen
    >
      <el-form :model="house" class="w-full md:w-1/2">
        <input
          type="file"
          ref="upload"
          class="hidden"
          accept="image/*"
          @change="uploadToCloudinary"
        />
        <div
          v-if="house.imgs.length === 0"
          @click="focusInput()"
          class="w-full h-48 mb-5 rounded bg-secondary bg-opacity-50 flex flex-col items-center justify-center"
        >
          <i class="el-icon-picture-outline text-3xl block my-0 mx-auto"></i>
          <p class="text-sm mt-2">No Image, click to upload</p>
        </div>
        <div class="relative mb-3" v-else>
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
        <el-button @click="focusInput()" type="secondary" plain v-if="house.imgs.length !== 0">Upload More Images</el-button>
        <el-form-item label="Name of Lodge">
          <el-input v-model="house.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Location">
          <el-input v-model="house.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            type="textarea"
            v-model="house.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Price per room">
          <el-input
            v-model="house.price"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Does this lodge have a private transformer?">
          <el-radio v-model="house.transformer" :label="true">Yes</el-radio>
          <el-radio v-model="house.transformer" :label="false">No</el-radio>
        </el-form-item>
        <el-form-item label="Does this lodge have a overhead tank?">
          <el-radio v-model="house.water" :label="true">Yes</el-radio>
          <el-radio v-model="house.water" :label="false">No</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="housesModal = false">Cancel</el-button>
        <button
          class="ml-3 bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
          :disabled="loading"
          @click="submitNewHouse()"
        >
          Submit
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addHouse, fetchAgentHouses, updateHouse } from "@/services/houses.js";
import axios from "axios";

export default {
  name: "AgentDashboard",
  data() {
    return {
      housesModal: false,
      loading: false,
      houses: [],
      house: {
        profiles_id: localStorage.getItem("user"),
        water: false,
        transformer: false,
        location: "",
        name: "",
        description: "",
        imgs: [],
        price: "",
      },
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
    focusInput() {
      this.$nextTick(() => {
        this.$refs.upload.click();
      });
    },
    async loadAgentHouses() {
      this.loading = true
      try {
        this.houses = await fetchAgentHouses(localStorage.getItem("user"))
      } catch (error) {
        console.log(error)
        this.$message.error(error)
      }
      this.loading = false
    },
    async uploadToCloudinary(e) {
      let formData = new FormData();
      formData.append("upload_preset", "houses");
      formData.append("folder", "houses");
      formData.append("file", e.target.files[0]);
      axios
        .post("https://api.cloudinary.com/v1_1/daet6vnyr/upload", formData)
        .then((response) => {
          this.house.imgs.push(response.data.url);
          this.$message.success("Image uploaded")
        })
        .catch((error) => {
          this.$message.error(error)
          console.log(error);
        });
    },
    async submitNewHouse() {
      this.loading = true;
      try {
        await addHouse(this.house);
        this.$message.success("Lodge added")
        this.housesModal = false
        this.houses = {
          profiles_id: localStorage.getItem("user"),
          water: false,
          transformer: false,
          location: "",
          name: "",
          description: "",
          imgs: [],
          price: "",
        }
        this.fetchAgentHouses()
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
      this.loading = false;
    },
    async toggleAvailability(house) {
      try {
        house.available = !house.available
        await updateHouse(house)
        this.$message.success("House updated!")
        this.loadAgentHouses()
      } catch (error) {
        console.log(error);
        this.$message.error(error)
      }
    }
  },
  mounted() {
    this.loadAgentHouses()
  }
};
</script>
