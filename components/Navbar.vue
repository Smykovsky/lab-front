<template>
  <div data-app>
  <v-app-bar
    id="bar"
    app
    color="white"
    flat
  >
    <v-container class="py-0 fill-height">
      <v-avatar
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-btn text> STRONA GŁÓWNA </v-btn>
      <v-btn text> PROFIL </v-btn>
      <v-btn href="#contact" text> KONTAKT </v-btn>

      <v-spacer></v-spacer>
      <v-divider></v-divider>


      <v-icon>fas fa-search</v-icon>
      <v-text-field
        dense
        flat
        hide-details
        rounded
        solo-inverted
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-responsive>

        <v-btn icon>
          <v-icon @click="logout">mdi-export</v-icon>
        </v-btn>
      </v-responsive>
    </v-container>
  </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data () {
    return {
      user: {},
      credentials: {
        login: null
      }
    }
  },

  created() {
    this.loadUser();
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout('local');
        await this.$router.push('/login')
        await this.$store.dispatch('store/addAlert', "Zostałes pomyślnie wylogowny")
      } catch (err) {
        console.log(err);
      }
    },
    async loadUser() {
      this.$axios.get('/auth/user', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$router.push({name: 'home'});
        this.$store.dispatch('store/addAlert', "Zapisano");
        this.credentials.login = response.data;
        console.log(this.credentials.login)
      }).catch(error => {
        this.$store.dispatch('store/addError', "Error!")
      })
    }
  }
}
</script>

<style>
#bar {

  margin: auto;

}
</style>
