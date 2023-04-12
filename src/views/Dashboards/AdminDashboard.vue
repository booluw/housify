<template>
  <div class="px-5 md:px-14">
    <h1 class="text-2xl mt-5">Welcome, Admin</h1>
    <el-table :data="agents" style="width: 100%">
      <el-table-column label="Name" style="width: 25%">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Phone" style="width: 25%">
        <template slot-scope="scope">
          <a :href="`tel:${scope.row.phone}`" title="Click to call" class="text-blue-500">
            {{ scope.row.phone }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="150">
        <template slot-scope="scope">
          <button
            class="bg-red-500 text-white py-3 px-7 rounded-lg shadow"
            @click="toggleVerification(scope.row)"
            v-if="scope.row.verified"
          >
            Unverify
          </button>
          <button  
            class="bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
            @click="toggleVerification(scope.row)"
            type="primary"
            v-else
          >
            Verify
          </button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchAllAgents, updateAgent } from "@/services/houses.js"

export default {
  data() {
    return {
      agents: []
    }
  },
  methods: {
    async fetchAgents() {
      try {
        this.agents = await fetchAllAgents();
      } catch (error) {
        console.log(error)
        this.$message.error(error)
      }
    },
    async toggleVerification(agent) {
      try {
        agent.verified = !agent.verified
        await updateAgent(agent)
        this.$message.success("Landlord has been updated")
        this.fetchAgents();
      } catch (error) {
        console.log(error)
        this.$message.error(error)
      }
    }
  },
  mounted() {
    this.fetchAgents()
  }
}
</script>
