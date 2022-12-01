<template>

  <div>
    <form v-if="credentials.product != null" @submit.prevent="save">
      <label>Nazwa produktu</label>
      <input v-model="credentials.product.name" type="text" required>
      <label>Cene produktu</label>
      <input v-model="credentials.product.price" type="number" required>
      <label>Nazwa producenta</label>
      <input v-model="credentials.product.producerName" type="text" required>

      <button class="przycisk btn btn-primary">Edytuj produkt</button>
      <router-link class="przycisk btn btn-danger" :to="{name:'home'}">Wyjdź</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        product: null,
      }
    }
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      this.$axios.get('api/products/' + this.$route.params.id, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.credentials.product = response.data;
        console.log(this.credentials.product)

      }).catch(error => {
        this.$store.dispatch('store/addError', "Błąd")
      })
    },
    async save() {
      this.$axios.post('api/products/edit', this.credentials.product,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$router.push({name: 'home'});
        this.$store.dispatch('store/addAlert', "Zapisano");
      }).catch(error => {
        this.$store.dispatch('store/addError', "Błąd");
        console.log(error.response.data)
      })
    }
  },

}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

label {
  color: black;
  display: table-column;
}

.mdl {
  width: 350px;
  height: 350px;
  margin: 20px;
}

form {
  display: block;
  width: 100%;
  text-align: center;
  align-items: center;
}

form > label, input {
  margin: 10px;
  width: 100%;
}

.przycisk {
  width: 50%;
  margin: 10px;
}
</style>
