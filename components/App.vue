<template>
  <div class="app">
      <NavBar/>
      <div class="container" v-bind:class="{active: $store.getters['store/isActive']}">
        <div class="product-panel">


          <nuxt />
        </div>

      </div>
    <FootBar/>
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
