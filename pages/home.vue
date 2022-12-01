<template>
  <div class="product-list">
    <div class="title">
      <span v-if="credentials.login != null">
        <h1>Witaj {{credentials.login.user.username}}</h1>
        <h2>Twoja rola: {{credentials.login.user.roles.toString()}}</h2>
      </span>

      <h1>Lista produktów</h1>

      <router-link class="btn btn-success" :to="{name: 'product.add'}"> DODAJ</router-link>
    </div>

    <div class="form-upload">
      <div class="input-block">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </div>
      <div class="btn-block">
        <button class="btn btn-secondary" @click="submitFile">Załaduj dane</button>
        <a class="btn btn-secondary" href="http://localhost:8080/apiv2/csv/download/dane.csv">Pobierz</a>
      </div>
      </div>

    <div class="content-container">
      <table class="table table-striped">
        <thead>
        <tr class="text-bg-dark fw-bold">
          <td>ID produktu</td>
          <td>Nazwa produktu</td>
          <td>Cena produktu</td>
          <td>Nazwa producenta</td>
          <td>Akcja</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.producerName }}</td>
          <td>
            <div v-if="credentials.login != null && credentials.login.user.roles != 'USER' ">
              <router-link class="but btn btn-primary" :to="{name: 'product.edit', params: {id: product.id}}"> EDYTUJ</router-link>
              <button class="but btn btn-danger" type="button" @click="removeProduct(product.id)">USUŃ</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>


export default {
  name: 'ProductList',
  created() {
    this.loadProducts();
    this.loadUser();
  },
  data() {
    return {
      products: [],
      user: {},
      credentials: {
        login: null
      }
    }
  },
  methods: {
    async removeProduct(id) {
      this.$axios.post('/api/products/delete/'+id, {},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.products = this.products.filter(value => value.id !== id);
      }).catch(error => {
        this.$store.dispatch('store/addError', "Nie mozna usunac")
      })
    },
    async loadProducts() {
      this.$axios.get('/api/products', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.products = response.data;
      }).catch(error => {
        this.$store.dispatch('store/addError', "Error!")
      })
    },
    async loadUser() {
      this.$axios.get('/auth/user', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$router.push({name: 'home'});
        this.$store.dispatch('store/addAlert', "Zapisano");
        this.credentials.login = response.data;
      }).catch(error => {
        this.$store.dispatch('store/addError', "Error!")
      })
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    async submitFile(){
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios.post( '/apiv2/csv/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'}
        }).then(() => {
        this.loadProducts();
      }).catch(error => {
        this.$store.dispatch('store/addError', "Error!")
      })
    }

  }
}
</script>

<style lang="sass">
@import "assets/sass/list"
.modal-body
  display: flex

.but
  color: black
</style>
