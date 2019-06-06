<template>

<!--         <v-flex xs12 sm6 d-flex>
          <v-select :items="mainData.priceLists" v-model="mainData.curPriceList"></v-select>
          <v-input append-icon="add" @click.prevent="mainData.priceLists.push('1')"></v-input>
          <v-btn color="success">Go</v-btn>
        </v-flex> -->
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-select
      v-model="select"
      :items="mainData.priceLists"
      :rules="[v => !!v || 'Item is required']"
      label="Select Pricelist"
      required
    ></v-select>

    <v-text-field
      v-if="addNew"
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      append-icon="close"
      required
    ></v-text-field>
    <v-btn
    v-if="!addNew" color="info" @click="addNew = true"> Add New</v-btn>
    <v-btn v-if="addNew" color="info" @click="addNewPricelist">Add</v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Go to editor
    </v-btn>


  </v-form>        
</template>
<script>
export default {
    name: 'PreEditor',
    computed: {
    mainData() {
      return this.$store.state.mainData
    }
    },
    created () {
      this.getPriceLists()
    },
    data: () => ({
      valid: true,
      name: '',
      select: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be less than 2 characters'
      ],
      addNew: false
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        this.mainData.curPriceList = this.select
        this.mainData.priceListSet = 'Y'
        this.$store.dispatch('getDataFromFB')
      },
      addNewPricelist () {
          let list = []
          list.push(this.name)
          this.mainData.priceLists = list
          this.name = ''
          this.addNew = false
      },
      appendIconCallback () {
        this.addNew = false
        this.name = ''
      },
      getPriceLists() {
        this.$store.dispatch('getPriceLists')
      }
    }
  }
</script>
