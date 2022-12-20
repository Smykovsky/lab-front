<template>
  <div>
    <v-toolbar
      height="100vh"
      primary
      prominent
    >
      <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg">

      <v-toolbar-title>
          <nav v-model="menubar" class="navbar navbar-expand-lg navbar-light menuBar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#"><font-awesome-icon icon="fa-solid fa-house" /></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact"><font-awesome-icon icon="fa-solid fa-phone" /></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><font-awesome-icon icon="fa-solid fa-gear" /></a>
              </li>
            </ul>
              <li class="nav-link">
                <label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>
              </li>

          </nav>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="credentials.login != null">
        <h1>Witaj {{credentials.login.user.username}}</h1>
      </span>
      <v-btn icon>
        <v-icon @click="logout">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data () {
    return {
      menubar: 'display: false',
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
span {
  margin-top: 25px;
  margin: 20px;
}

#logo{
  width: 90px;
  height: 90px;
}

li{
  margin-left: 30px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #090808;
}

input:focus + .slider {
  box-shadow: 0 0 1px #090808;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
