<template>
  <div class="d-flex align-items-center min-vh-100">
    <div class="container">
      <h4 class="text-center my-3">Log In Form</h4>
      <div class="card">
        <div class="card-body">
          <b-form>
            <b-form-group label="Identity Card">
              <b-form-input
                required
                v-model="identityCard"
                placeholder="Identity Card"
              />
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input
                required
                v-model="password"
                type="password"
                placeholder="Password"
              />
            </b-form-group>
            <b-form-group label="Login As">
              <b-form-select
                required
                v-model="role"
                :options="roles"
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col">
              <b-button block @click="authenticate" variant="outline-primary"
                >Login</b-button
              >
            </div>
            <div class="col">
              <b-button block @click="register" variant="outline-secondary"
                >Register</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      identityCard: "",
      password: "",
      role: "",
      roles: [
        {
          value: 0,
          text: "Admin",
        },
        {
          value: 1,
          text: "Nurse",
        },
        {
          value: 2,
          text: "Patient",
        },
      ],
    };
  },
  methods: {
    authenticate() {
      if (this.role == 2) {
        this.$http
          .post("patient/authenticate", {
            identityCard: this.identityCard,
            password: this.password,
          })
          .then((res) => {
            this.$session.start();
            this.$session.set("user", res.data);
            window.location.href = "/appointment";
          });
      } else {
        this.$http
          .post("staff/authenticate", {
            identityCard: this.identityCard,
            password: this.password,
          })
          .then((res) => {
            this.$session.start();
            this.$session.set("user", res.data);
            window.location.href = "/appointment";
          });
      }
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>