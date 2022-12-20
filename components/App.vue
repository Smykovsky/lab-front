<template>
  <div id="app">
    <div id="navigation">
      <NavBar/>
    </div>
    <div id="content">
      <nuxt/>
    </div>
    <div id="footer">
      <FootBar/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import FootBar from "@/components/Footbar";
import ProductList from "~/pages/home";

export default {
  middleware: ['auth'],
  components: { FootBar, NavBar},
  methods: {
    removeAlert(payload) {
      this.$store.dispatch('store/removeAlert', payload);
    },
    removeError(payload) {
      this.$store.dispatch('store/removeError', payload);
    },
  }
}
</script>

<style>
#app{
  height: 100%;
}

#navigation{
  height: 10%;
}

#content {
  margin: 25px;
  padding: 25px;
  height: 85vh;
}

#footer {
  height: 10%;
}
</style>
