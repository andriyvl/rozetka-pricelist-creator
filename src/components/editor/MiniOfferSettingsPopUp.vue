<template>
  <div>
    <v-btn @click.prevent="open += 2">setup mini offer view</v-btn>
    <!-- open = 1 does not work when close on the pop up on empty space -->
    <vue-over-body :dim="true" :open="open" before="before" after="after" :transition="0.3">
      <div class="modal-style">
        <button @click.prevent="open = 0" style="right: 10px; position: absolute">&times;</button>
        <h5 class="headline">Offer preview Setup</h5>
        <p class="subheading">Adjust the preffered fields to be displayed and their order</p>
        <v-layout row wrap>
          <v-flex xs6>
            <p>Properties:</p>
            <!-- <v-checkbox class="ma-0 pa-0" label="Offer ID" v-model="miniOfferSetup.Props.Offer_Id"></v-checkbox> -->
            <v-checkbox class="ma-0 pa-0" label="Availability" v-model="miniOfferSetup.Props.Available"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Name" v-model="miniOfferSetup.Props.Name"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Picture" v-model="miniOfferSetup.Props.Picture"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Stock Quantity" v-model="miniOfferSetup.Props.Stock_Quantity"></v-checkbox>
            <!-- <v-checkbox class="ma-0 pa-0" label="Category ID" v-model="miniOfferSetup.Props.Category_Id"></v-checkbox> -->
            <v-checkbox class="ma-0 pa-0" label="URL" v-model="miniOfferSetup.Props.Url"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Price" v-model="miniOfferSetup.Props.Price"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Currency ID" v-model="miniOfferSetup.Props.Currency_Id"></v-checkbox>
            <v-checkbox class="ma-0 pa-0" label="Vendor" v-model="miniOfferSetup.Props.Vendor"></v-checkbox>
          </v-flex>
          <v-flex xs6>
            <p>Selected Properties:</p>
            <div v-for="(el2, k2) in Object.keys(miniOfferSetup.Props)" :key="'2-' + k2">
                <p v-if="miniOfferSetup.Props[el2] == true">{{el2}}</p>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <p>Parameters:</p>
            <v-checkbox v-for="(el, k) in returnPars" :key="k" class="ma-0 pa-0" :label="el" :value="el" v-model="miniOfferSetup.Pars"></v-checkbox>
          </v-flex>
          <v-flex xs6>
            <p>Selected Parameters</p>
            <p v-for="(el1, k1) in miniOfferSetup.Pars" :key="'1-'+k1">{{el1}}</p>
          </v-flex>
        </v-layout>
      </div>
    </vue-over-body>
  </div>
</template>
<script>
import Vue from 'vue'
import overBody from 'vue-over-body'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  components: {
    VueOverBody: overBody
  },
  data: function () {
    return {
      open: 0
    }
  },
  computed: {
    ...mapState([
      'mainData'
    ]),
    xmlValues() {
      return this.$store.state.curPriceListData.xmlValues
    },
    miniOfferSetup () {
      return this.$store.state.curPriceListData.config.miniOfferSetup
    },
    returnPars () {
      if (this.mainData.priceListCompleted === true) {
        let arr = []
        for (let off in this.xmlValues.Offers) {
          for (let el4 in this.xmlValues.Offers[off].data.Pars) {
            arr.push(this.xmlValues.Offers[off].data.Pars[el4].Name)
          }
        }
        var unique = arr.filter(function (elem, index, self) {
          return index === self.indexOf(elem)
        })
        return unique
      }
    }
  },
  methods: {

  }
}
</script>
<style>
.before {
  top: -500px;
  right: 300px;
  width: 600px;
  background-color: white;
  position: absolute;
}

.after {
  top: 50px;
}

.modal-style {
  padding: 1rem;
}
.v-input__control .v-messages {
  display: none;
}
.v-input__slot {
  margin: 0px;
}
</style>
