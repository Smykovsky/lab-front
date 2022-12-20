<template>
  <div data-app>
    <template>
      <div class="form-upload">
        <div class="input-block">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </div>
        <div class="btn-block">
          <button class="btn btn-dark" @click="submitFile">Załaduj</button>
          <a class="btn btn-dark" href="http://localhost:8080/apiv2/csv/download/dane.csv">Pobierz</a>
        </div>
      </div>
    </template>
    <v-data-table
      :headers="headers"
      :items="products"
      items-per-page="10"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >

          <v-toolbar-title>Lista produktów</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            id="dial"
            v-model="dialogEdit"
            max-width="500px"
          >
            <v-card height="60vh">
              <v-card-title>
                <span class="text-h5">Edytowanie produktu</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <form @submit.prevent="editProduct">
                    <v-row>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nazwa"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.producerName"
                        label="Nazwa producenta"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.price"
                        label="Cena"
                      ></v-text-field>

                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogEdit = false"
                      >
                        Wyjdź
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="editProduct"
                      >
                        Zapisz
                      </v-btn>
                    </v-row>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogAdd"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nowy Produkt
              </v-btn>
            </template>
            <v-card height="60vh">
              <v-card-title>
                <span class="text-h5">Dodawanie produktu</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <form @submit.prevent="addProduct">
                    <v-row>
                      <v-text-field
                        v-model="credentials.product.name"
                        label="Nazwa"
                      ></v-text-field>

                      <v-text-field
                        v-model="credentials.product.producerName"
                        label="Nazwa producenta"
                      ></v-text-field>

                      <v-text-field
                        v-model="credentials.product.price"
                        label="Cena"
                      ></v-text-field>

                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogAdd = false"
                      >
                        Wyjdź
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="addProduct"
                      >
                        Zapisz
                      </v-btn>
                    </v-row>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="removeProduct(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nazwa', value: 'name' },
      { text: 'Nazwa producenta', value: 'producerName' },
      { text: 'Cena', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [],
    credentials: {
      product: {
        name: null,
        price: null,
        producerName: null,
      },
    },
    editedIndex: -1,
    editedItem: {
      name: '',
      producerName: '',
      price: 0
    },
    defaultItem: {
      name: '',
      producerName: '',
      price: 0
    },
  }),


  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.loadProducts()
  },

  methods: {
    edit() {
      return edit
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

    editItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
      } else {
        this.products.push(this.editedItem)
      }
      this.close()
    },

    async removeProduct(id) {
      this.$axios.post('/api/products/delete/'+id, {},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.products = this.products.filter(value => value.id !== id);
      }).catch(error => {
        this.$store.dispatch('store/addError', "Nie mozna usunac")
      })
    },
    async editProduct() {
      this.$axios.post('api/products/edit', this.editedItem,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$store.dispatch('store/addAlert', "Zapisano");
        this.dialogEdit = false;
        this.loadProducts();
      }).catch(error => {
        this.$store.dispatch('store/addError', "Błąd");
        console.log(error.response.data)
      })
    },
    async addProduct() {
      this.$axios.post('api/products', this.credentials.product,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$store.dispatch('store/addAlert', "Zapisano");
        this.dialogAdd = false;
        this.loadProducts();

      }).catch(error => {
        this.$store.dispatch('store/addError', "Błąd");
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
  },
}
</script>

<style>

</style>
