<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="float-left">
            <span class="btn">Staff</span>
          </div>
          <div class="float-right">
            <b-button variant="outline-primary" @click="manageCreateStaff">
              <span class="font-weight-bold">Add Staff</span></b-button
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
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-for="staff in staffs" :key="staff.id">
                <tr>
                  <td>{{ staff.fullName }}</td>
                  <td>{{ staff.email }}</td>
                  <td>
                    <span v-if="staff.role == 0"> Admin </span>
                    <span v-else-if="staff.role == 1"> Nurse </span>
                  </td>
                  <td>
                    <b-button
                      block
                      variant="outline-info"
                      @click="manageUpdateStaff(staff)"
                    >
                      View
                    </b-button>
                    <b-button
                      block
                      variant="outline-danger"
                      @click="deleteStaff(staff.id)"
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
    <b-modal id="modal-staff" centered no-close-on-backdrop>
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
        <b-form-group label="Password">
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
        <b-form-group label="Role">
          <b-form-select
            required
            v-model="form.role"
            :options="roles"
          ></b-form-select>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button v-if="form.id" variant="outline-primary" @click="updateStaff">
          Update
        </b-button>
        <b-button v-else variant="outline-primary" @click="createStaff"
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
      staffs: [],
      roles: [
        {
          value: 0,
          text: "Admin",
        },
        {
          value: 1,
          text: "Nurse",
        },
      ],
      form: {
        email: "",
        fullName: "",
        role: "",
        password: "",
        phoneNumber: "",
      },
    };
  },
  mounted() {
    this.getStaffs();
  },
  methods: {
    getStaffs() {
      this.$http.get("staff").then((res) => {
        this.staffs = res.data;
      });
    },
    createStaff() {
      this.$http.post("staff", this.form).then(() => {
        this.form = {
          email: "",
          fullName: "",
          role: "",
          password: "",
          phoneNumber: "",
        };
        this.getStaffs();
        this.$bvModal.hide("modal-staff");
      });
    },
    manageCreateStaff() {
      this.$bvModal.show("modal-staff");
    },
    updateStaff() {
      this.$http.patch(`staff/${this.form.id}`, this.form).then(() => {
        this.form = {
          email: "",
          fullName: "",
          role: "",
          password: "",
          phoneNumber: "",
        };
        this.getStaffs();
        this.$bvModal.hide("modal-staff");
      });
    },
    deleteStaff(id) {
      this.$http.delete(`staff/${id}`).then(() => {
        this.form = {
          email: "",
          fullName: "",
          role: "",
          password: "",
          phoneNumber: "",
        };
        this.getStaffs();
      });
    },
    manageUpdateStaff(staff) {
      this.form = staff;
      this.$bvModal.show("modal-staff");
    },
    dismissModal() {
      this.form = {
        email: "",
        fullName: "",
        role: "",
        password: "",
        phoneNumber: "",
      };
      this.$bvModal.hide("modal-staff");
    },
  },
};
</script>
