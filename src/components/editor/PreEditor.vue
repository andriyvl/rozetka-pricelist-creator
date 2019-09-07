<template>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <!-- <v-layout>
      <v-select
      v-model="selectedPriceList"
      :items="mainData.priceLists"
      :rules="[v => !!v || 'Item is required']"
      label="Select Pricelist"
      required>
      </v-select>
      <v-btn v-if="!addNew && selectedPriceList" icon @click="deletePriceList(selectedPriceList);selectedPriceList = ''">X</v-btn>
    </v-layout> -->


    
    <v-btn
    v-if="!addNew" color="info" @click="addNew = true"> Add New</v-btn>

    <v-btn
      :disabled="!valid || addNew || selectedPriceList == undefined || editingCheckLists === true"
      color="success"
      @click="validate"
    >
      Go to editor
    </v-btn>
    <v-btn color="warning" @click="editingCheckLists = !editingCheckLists">Edit</v-btn>
    <v-btn v-if="!addNew && returnCheckedPriceListIndexes.length > 0 && editingCheckLists" @click="deletePriceList(returnCheckedPriceListIndexes)">Delete</v-btn>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-layout row wrap> 
      <!-- add: no spaces allowed -->
      <v-btn v-if="addNew" small color="info" @click="addNewPricelist">Add</v-btn>
        <v-text-field
        v-if="addNew"
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
        validate-on-blur
      ></v-text-field>
              <v-text-field
        v-if="addNew"
        v-model="description"
        :rules="DescriptionRules"
        label="Description"
        required
        validate-on-blur
      ></v-text-field>
      <v-icon v-if="addNew" icon @click="addNew = false">remove_circle_outline</v-icon>
    </v-layout>
    <v-list>
    <v-list-item-group v-model="selectedPriceList">
        <v-list-item v-for="(el, k) in mainData.priceLists" :key="el.k">
            <v-list-item-action name="checkbox" v-if="editingCheckLists">
              <v-checkbox
                v-model="mainData.priceLists[k].flag"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title name="title">{{mainData.priceLists[k].name}}</v-list-item-title>
              <v-list-item-subtitle name="subtitle">{{mainData.priceLists[k].description}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  </v-form>        
</template>
<script>
export default {
    name: 'PreEditor',
    computed: {
      mainData() {
        return this.$store.state.mainData
      },
      returnCheckedPriceListIndexes() {
        let indexes = [];
        for (let i = 0; i < Object.keys(this.mainData.priceLists).length; i++) {
          if (this.mainData.priceLists[i].flag === true) {
            indexes.push(i);
          } 
        }
        return indexes;
      }
    },
    mounted () {
      this.getPriceLists();
    },
    props: ['deletePriceList'], 
    data: () => ({
      valid: true,
      name: '',
      description: '',
      selectedPriceList: undefined,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be less than 2 characters',
        v => { if (v.length > 0) {
        const space = new RegExp(' ')
        return !space.test(v) || 'Spaces not allowed';
        }
        }
      ],
      DescriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 2) || 'Name must be less than 10 characters'
      ],
      addNew: false,
      editingCheckLists: false
    }),

    methods: {
      showCheckLists () {
/*           for (let i = 0; i < this.mainData.priceLists.length; i++) {
            this.checkLists.push({
              name: this.mainData.priceLists[i], 
              active: false
              }
            )
          } */
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        this.$store.commit('setUnSetPriceList', {cur: this.mainData.priceLists[this.selectedPriceList].name, set: 'Y'})
        this.$store.dispatch('getDataFromFB')
      },
      addNewPricelist () {
          let list = this.mainData.priceLists
          list.push({ name: this.name, description: this.description, flag: false })
          this.$store.commit('addPriceListToArray', list)
          this.selectedPriceList = this.name
          this.name = ''
          this.addNew = false
      },
      getPriceLists() {
        this.$store.dispatch('getPriceLists')
      }
    }
  }
</script>
