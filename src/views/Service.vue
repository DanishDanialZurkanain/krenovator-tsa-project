<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="float-left">
            <span class="btn">Services</span>
          </div>
          <div class="float-right">
            <b-button variant="outline-primary" @click="manageCreateService">
              <span class="font-weight-bold">Create Service</span></b-button
            >
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-for="service in services" :key="service.id">
                <tr>
                  <td>{{ service.title }}</td>
                  <td>{{ service.description }}</td>
                  <td>
                    <b-button
                      block
                      variant="outline-info"
                      @click="manageUpdateService(service)"
                    >
                      View
                    </b-button>
                    <b-button
                      block
                      variant="outline-danger"
                      @click="deleteService(service.id)"
                      >Delete</b-button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE Modal -->
    <b-modal id="modal-service" centered no-close-on-backdrop>
      <template #modal-header>
        <span>Service</span>
      </template>
      <b-form>
        <b-form-group label="Title">
          <b-form-input v-model="form.title" placeholder="Title" />
        </b-form-group>
        <b-form-group label="Description">
          <b-form-textarea
            id="textarea"
            v-model="form.description"
            placeholder="Todo's Description"
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button
          v-if="form.id"
          variant="outline-primary"
          @click="updateService"
        >
          Update
        </b-button>
        <b-button v-else variant="outline-primary" @click="createService"
          >Create</b-button
        >
        <b-button variant="outline-secondary" @click="dismissModal"
          >Close</b-button
        >
      </template>
    </b-modal>
    <!-- NOTE Endo of Modal -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [],
      form: {
        title: "",
        description: "",
      },
    };
  },
  mounted() {
    this.getServices();
  },
  methods: {
    getServices() {
      this.$http.get("/service").then((res) => {
        this.services = res.data;
      });
    },
    createService() {
      this.$http.post("/service", this.form).then(() => {
        this.form = {
          title: "",
          description: "",
        };
        this.getServices();
        this.$bvModal.hide("modal-service");
      });
    },
    updateService() {
      this.$http.patch(`service/${this.form.id}`, this.form).then(() => {
        this.form = {
          title: "",
          description: "",
        };
        this.getServices();
        this.$bvModal.hide("modal-service");
      });
    },
    deleteService(id) {
      this.$http.delete(`appointment/${id}`).then(() => {
        this.form = {
          title: "",
          description: "",
        };
        this.getAppointments();
      });
    },
    manageCreateService() {
      this.$bvModal.show("modal-service");
    },
    manageUpdateService(services) {
      this.form = services;
      this.$bvModal.show("modal-service");
    },
    dismissModal() {
      this.form = {
        title: "",
        description: "",
      };
      this.$bvModal.hide("modal-service");
    },
  },
};
</script>
