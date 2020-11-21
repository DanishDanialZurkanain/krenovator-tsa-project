<template>
  <div>
    <div v-if="session">
      <div v-if="session.role == 0 || session.role == 1">
        <b-icon
          v-b-toggle.menubar
          class="mx-3 my-3"
          icon="list"
          style="width: 32px; height: 32px"
        ></b-icon>
        <b-sidebar
          id="menubar"
          title="Appointment Management"
          visible
          shadow
          no-close-on-route-change
        >
          <div class="px-3 py-2">
            <b-list-group vertical="md">
              <div class="my-3">
                <b-list-group-item>
                  <span
                    >😎 Welcome, <b>{{ session.fullName }}</b></span
                  >
                </b-list-group-item>
              </div>
              <div class="my-3">
                <b-list-group-item>
                  <router-link to="/appointment">📅 Appointment</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <router-link to="/service">🩺 Service</router-link>
                </b-list-group-item>
                <div v-if="session.role == 0">
                  <b-list-group-item>
                    <router-link to="/staff">👨‍⚕️ Staff</router-link>
                  </b-list-group-item>
                </div>
                <b-list-group-item>
                  <router-link to="/patient">🙍‍♂️ Patient</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <router-link to="/setting">⚙ Setting</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <router-link to="/about">ℹ About</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <a href="#" @click="destroySession">⭕ Log Out</a>
                </b-list-group-item>
              </div>
            </b-list-group>
          </div>
        </b-sidebar>
      </div>
      <div v-else>
        <b-icon
          v-b-toggle.menubar
          class="mx-3 my-3"
          icon="list"
          style="width: 32px; height: 32px"
        ></b-icon>
        <b-sidebar
          id="menubar"
          title="Appointment Management"
          visible
          shadow
          no-close-on-route-change
        >
          <div class="px-3 py-2">
            <b-list-group vertical="md">
              <div class="my-3">
                <b-list-group-item>
                  <span
                    >😎 Welcome, <b>{{ session.fullName }}</b></span
                  >
                </b-list-group-item>
              </div>
              <div class="my-3">
                <b-list-group-item>
                  <router-link to="/appointment">📅 Appointment</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <router-link to="/setting">⚙ Setting</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <router-link to="/about">ℹ About</router-link>
                </b-list-group-item>
                <b-list-group-item>
                  <a href="#" @click="destroySession">⭕ Log Out</a>
                </b-list-group-item>
              </div>
            </b-list-group>
          </div>
        </b-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      session: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.session = this.$session.get("user");
    },
    destroySession() {
      this.$session.destroy();
      window.location.href = "/";
    },
  },
};
</script>