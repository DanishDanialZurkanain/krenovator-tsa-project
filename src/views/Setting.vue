<template>
  <div>
    <div class="my-3">
      <div class="container">
        <h4 class="my-3">⚙ Setting</h4>
        <div class="card">
          <div class="card-body">
            <b-form>
              <b-form-group label="Full Name">
                <b-form-input disabled :value="user.fullName" />
              </b-form-group>
              <b-form-group label="Identity Card">
                <b-form-input disabled :value="user.identityCard" />
              </b-form-group>
              <b-form-group label="Email">
                <b-form-input
                  required
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
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
          </div>
          <div class="card-footer">
            <b-button
              block
              @click="updateInformations"
              variant="outline-primary"
              >Update Information</b-button
            >
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
      user: this.$session.get("user"),
      form: {
        email: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    updateInformations() {
      if (this.user.role == 0 || this.user.role == 1) {
        this.$http.patch(`staff/${this.user.id}`, this.form).then(() => {
          this.form = {
            email: "",
            phoneNumber: "",
          };
          this.$router.go(0);
        });
      } else {
        this.$http.patch(`patient/${this.user.id}`, this.form).then(() => {
          this.form = {
            email: "",
            phoneNumber: "",
          };
          this.$router.go(0);
        });
      }
    },
  },
};
</script>