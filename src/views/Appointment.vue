<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="float-left">
            <span class="btn">Appointments</span>
          </div>
          <div class="float-right">
            <b-button
              variant="outline-primary"
              @click="manageCreateAppointment"
            >
              <span class="font-weight-bold">Create Appointment</span></b-button
            >
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-for="appointment in appointments" :key="appointment.id">
                <tr>
                  <span v-for="patient in patients" :key="patient.id">
                    <td v-if="appointment.patientId == patient.id">
                      {{ patient.fullName }}
                    </td>
                  </span>
                  <td>{{ appointment.date }}</td>
                  <td>{{ appointment.time }}</td>
                  <span v-for="service in services" :key="service.id">
                    <td v-if="appointment.serviceId == service.id">
                      {{ service.title }}
                    </td>
                  </span>
                  <td>
                    <span v-if="appointment.status == 1"> Active </span>
                    <span v-else-if="appointment.status == 0">
                      Not Active
                    </span>
                  </td>
                  <td>
                    <b-button
                      block
                      variant="outline-info"
                      @click="manageUpdateAppointment(appointment)"
                    >
                      <b-icon icon="eye-fill" aria-hidden="true"></b-icon>
                      View
                    </b-button>
                    <b-button
                      block
                      variant="outline-danger"
                      @click="deleteAppointments(appointment.id)"
                    >
                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                      Delete
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE Modal -->
    <b-modal id="modal-appointment" centered no-close-on-backdrop>
      <template #modal-header>
        <h5>Appointment</h5>
      </template>
      <b-form>
        <b-form-group label="Date">
          <b-form-datepicker
            required
            v-model="form.date"
            id="appointment-datepicker"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Time">
          <b-form-timepicker
            required
            v-model="form.time"
            locale="my"
          ></b-form-timepicker>
        </b-form-group>
        <b-form-group label="Patient">
          <b-form-select
            required
            v-model="form.patientId"
            :options="patients"
            value-field="id"
            text-field="fullName"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Service">
          <b-form-select
            required
            v-model="form.serviceId"
            :options="services"
            value-field="id"
            text-field="title"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Description" v-if="form.id">
          <span v-for="service in services" :key="service.id">
            <span v-if="form.serviceId == service.id">
              <b-form-textarea
                required
                disabled
                rows="3"
                max-rows="8"
                :value="service.description"
                id="textarea"
              >
              </b-form-textarea>
            </span>
          </span>
        </b-form-group>
        <b-form-group label="Status">
          <b-form-select
            required
            v-model="form.status"
            :options="status"
          ></b-form-select>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button
          v-if="form.id"
          variant="outline-primary"
          @click="updateAppointments"
        >
          Update
        </b-button>
        <b-button v-else variant="outline-primary" @click="createAppointment"
          >Create</b-button
        >
        <b-button variant="outline-secondary" @click="dismissAppointments"
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
      appointments: [],
      services: [],
      patients: [],
      form: {
        date: "",
        time: "",
        description: "",
        patientId: "",
        serviceId: "",
        status: "",
      },
      status: [
        { value: 1, text: "Active" },
        { value: 0, text: "Not Active" },
      ],
    };
  },
  mounted() {
    this.getAppointments();
    this.getPatients();
    this.getServices();
  },
  methods: {
    getAppointments() {
      this.$http.get("appointment").then((res) => {
        this.appointments = res.data;
      });
    },
    getPatients() {
      this.$http.get("patient").then((res) => {
        this.patients = res.data;
      });
    },
    getServices() {
      this.$http.get("service").then((res) => {
        this.services = res.data;
      });
    },
    createAppointment() {
      this.$http.post("appointment", this.form).then(() => {
        this.form = {
          date: "",
          time: "",
          patientId: "",
          serviceId: "",
          status: "",
        };
        this.getAppointments();
        this.$bvModal.hide("modal-appointment");
      });
    },
    updateAppointments() {
      this.$http.patch(`appointment/${this.form.id}`, this.form).then(() => {
        this.form = {
          date: "",
          time: "",
          patientId: "",
          serviceId: "",
          status: "",
        };
        this.getAppointments();
        this.$bvModal.hide("modal-appointment");
      });
    },
    deleteAppointments(id) {
      this.$http.delete(`appointment/${id}`).then(() => {
        this.form = {
          date: "",
          time: "",
          patientId: "",
          serviceId: "",
          status: "",
        };
        this.getAppointments();
      });
    },
    manageCreateAppointment() {
      this.$bvModal.show("modal-appointment");
    },
    manageUpdateAppointment(appointment) {
      this.form = appointment;
      this.$bvModal.show("modal-appointment");
    },
    dismissAppointments() {
      this.form = {
        date: "",
        time: "",
        patientId: "",
        serviceId: "",
        status: "",
      };
      this.$bvModal.hide("modal-appointment");
    },
  },
};
</script>
