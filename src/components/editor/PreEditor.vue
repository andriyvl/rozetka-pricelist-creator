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
    <v-layout>
      <v-select
      v-model="selectedPriceList"
      :items="mainData.priceLists"
      :rules="[v => !!v || 'Item is required']"
      label="Select Pricelist"
      required>
      </v-select>
      <v-btn v-if="!addNew && selectedPriceList" icon @click="deletePriceList(selectedPriceList);selectedPriceList = ''">X</v-btn>
    </v-layout>


    <v-layout row wrap>
      <v-text-field
      v-if="addNew"
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
      validate-on-blur
    ></v-text-field>
      <v-btn v-if="addNew" icon @click="addNew = false">X</v-btn>
    </v-layout>
    <v-btn
    v-if="!addNew" color="info" @click="addNew = true"> Add New</v-btn>
    <v-btn v-if="addNew" color="info" @click="addNewPricelist">Add</v-btn>

    <v-btn
      :disabled="!valid || addNew || selectedPriceList == ''"
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
    props: ['deletePriceList'], 
    data: () => ({
      valid: true,
      name: '',
      selectedPriceList: '',
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
        this.$store.commit('setUnSetPriceList', {cur: this.selectedPriceList, set: 'Y'})
        this.$store.dispatch('getDataFromFB')
      },
      addNewPricelist () {
          let list = this.mainData.priceLists
          list.push(this.name)
          this.$store.commit('addPriceListToArray', list)
          this.selectedPriceList = this.name
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
