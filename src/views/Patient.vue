<template>
  <div class="my-3">
    <div class="container">
      <h4 class="my-3">🙎‍♂️ List of Patient</h4>
      <div class="card">
        <div class="card-header">
          <div class="float-left">
            <span class="btn">
              <span>Patients</span>
            </span>
          </div>
          <div class="float-right">
            <b-button variant="outline-primary" @click="manageCreatePatient">
              <span class="font-weight-bold">Add Patient</span></b-button
            >
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Identity Card</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-for="patient in patients" :key="patient.id">
                <tr>
                  <td>{{ patient.fullName }}</td>
                  <td>{{ patient.email }}</td>
                  <td>{{ patient.identityCard }}</td>
                  <td>{{ patient.phoneNumber }}</td>
                  <td>
                    <b-button
                      block
                      variant="outline-info"
                      @click="manageUpdatePatient(patient)"
                    >
                      View
                    </b-button>
                    <b-button
                      block
                      variant="outline-danger"
                      @click="deletePatient(patient.id)"
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
    <b-modal id="modal-patient" centered no-close-on-backdrop>
      <template #modal-header>
        <span>User</span>
      </template>
      <b-form>
        <b-form-group label="Full Name">
          <b-form-input
            required
            v-model="form.fullName"
            placeholder="Full Name"
          />
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input
            required
            v-model="form.email"
            type="email"
            placeholder="Email"
          />
        </b-form-group>
        <b-form-group label="Identity Card Number">
          <b-form-input
            required
            v-model="form.identityCard"
            placeholder="Identity Card Number"
          />
        </b-form-group>
        <b-form-group label="Password" v-if="!form.id">
          <b-form-input
            required
            v-model="form.password"
            type="password"
            placeholder="Password"
          />
        </b-form-group>
        <b-form-group label="Phone Number">
          <b-form-input
            required
            v-model="form.phoneNumber"
            type="number"
            placeholder="Phone Number"
          />
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button
          v-if="form.id"
          variant="outline-primary"
          @click="updatePatient"
        >
          Update
        </b-button>
        <b-button v-else variant="outline-primary" @click="createPatient"
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
      patients: [],
      form: {
        email: "",
        fullName: "",
        identityCard: "",
        password: "",
        phoneNumber: "",
      },
    };
  },
  mounted() {
    this.getPatients();
  },
  methods: {
    getPatients() {
      this.$http.get("patient").then((res) => {
        this.patients = res.data;
      });
    },
    createPatient() {
      this.$http.post("patient", this.form).then(() => {
        this.form = {
          email: "",
          fullName: "",
          identityCard: "",
          password: "",
          phoneNumber: "",
        };
        this.getPatients();
        this.$bvModal.hide("modal-patient");
      });
    },
    manageCreatePatient() {
      this.$bvModal.show("modal-patient");
    },
    updatePatient() {
      this.$http.patch(`patient/${this.form.id}`, this.form).then(() => {
        this.form = {
          email: "",
          fullName: "",
          identityCard: "",
          phoneNumber: "",
        };
        this.getPatients();
        this.$bvModal.hide("modal-patient");
      });
    },
    deletePatient(id) {
      this.$http.delete(`patient/${id}`).then(() => {
        this.form = {
          email: "",
          fullName: "",
          identityCard: "",
          phoneNumber: "",
        };
        this.getPatients();
      });
    },
    manageUpdatePatient(patient) {
      this.form = patient;
      this.$bvModal.show("modal-patient");
    },
    dismissModal() {
      this.form = {
        email: "",
        fullName: "",
        identityCard: "",
        phoneNumber: "",
      };
      this.$bvModal.hide("modal-patient");
    },
  },
};
</script>
