<template>
  <div class="d-flex align-items-center min-vh-100">
    <div class="container">
      <h4 class="my-3">📄 Register Form</h4>
      <div class="card">
        <div class="card-body">
          <b-form>
            <b-form-group label="Full Name">
              <b-form-input
                required
                v-model="form.fullName"
                placeholder="Full Name"
              />
            </b-form-group>
            <b-form-group label="Identity Card">
              <b-form-input
                required
                v-model="form.identityCard"
                placeholder="Identity Card"
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
            <b-form-group v-if="!form.id" label="Password">
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
            <b-form-group label="Register As">
              <b-form-select
                required
                v-model="form.role"
                :options="roles"
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <div class="card-footer">
          <b-button block @click="register" variant="outline-primary"
            >Sign Up</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        {
          value: 1,
          text: "Nurse",
        },
        {
          value: 2,
          text: "Patient",
        },
      ],
      form: {
        email: "",
        fullName: "",
        identityCard: "",
        role: "",
        password: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    register() {
      if (this.form.role == 2) {
        this.$http.post("patient", this.form).then(() => {
          this.form = {
            email: "",
            fullName: "",
            identityCard: "",
            password: "",
            phoneNumber: "",
          };
          this.$router.push({ path: "/" });
        });
      } else {
        this.$http.post("staff", this.form).then(() => {
          this.form = {
            email: "",
            fullName: "",
            identityCard: "",
            role: "",
            password: "",
            phoneNumber: "",
          };
          this.$router.push({ path: "/" });
        });
      }
    },
  },
};
</script>