<template>
  <div>
    <nav>
        <p @click="logout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket"/>
          <button>Wyloguj się</button>
        </p>

    </nav>
  </div>
</template>
<script>
export default {
  name: "Navbar",
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
  }
}
</script>

<style>
button{
  background: none;
  border: none;
}
</style>
