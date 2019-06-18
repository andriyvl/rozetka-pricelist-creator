<template>
            <!-- MINI CONTAINERS -->
        <div>
        <div class="offer-mini-container" v-for="k5 in Object.keys(xmlValues.Offers)" :key="k5">
          <div class="offer-mini" :class="!xmlValues.Offers[k5].Available ? 'item-not-avail' : null">
            <!-- :style='{backgroundImage: "url("+ xmlValues.Offers[k5].data.Pics[0] + ")", backgroundSize: "auto 90%"}' -->
            <p><b>{{xmlValues.Offers[k5].data.Name}}</b></p>

            <v-layout>
              <v-flex>
                <img class="offer-mini-img" :src="xmlValues.Offers[k5].data.Pics[0]" alt="">
              </v-flex>
              <v-flex>
                <p style="font-size: 1.4rem">ID: <b>{{xmlValues.Offers[k5].Id}}</b> CAT: <b>{{xmlValues.Offers[k5].data.CatId}}</b></p>
                <p v-if="miniOfferSetup.Props.Stock_Quantity">В наявності: <input class="checkbox-avail" type="checkbox" v-model="xmlValues.Offers[k5].Available"> Кількість: {{xmlValues.Offers[k5].data.StockQ}}</p>
                <p v-if="miniOfferSetup.Props.Price">Ціна: {{xmlValues.Offers[k5].data.Price}}{{xmlValues.Offers[k5].data.CurId}}</p>
                
              </v-flex>
            </v-layout>
 
            <div v-for="(el4, k4) in miniOfferSetup.Pars" :key="k4">
              <div  v-for="(el3, k3) in xmlValues.Offers[k5].data.Pars" :key="el3.k3">
                <p v-if="xmlValues.Offers[k5].data.Pars[k3].Name == el4">{{xmlValues.Offers[k5].data.Pars[k3].Name}}: {{xmlValues.Offers[k5].data.Pars[k3].Descr}}</p>
              </div>

<!--               <p v-if="xmlValues.Offers[k5].data.Pars[k3].Name == 'Размер'">{{xmlValues.Offers[k5].data.Pars[k3].Name}}: {{xmlValues.Offers[k5].data.Pars[k3].Descr}}</p> -->
            </div>
<!--             <div v-for="(el3, k9) in xmlValues.Offers[k5].data.Pars" :key="el3.k9">
              <p v-if="xmlValues.Offers[k5].data.Pars[k9].Name == 'Размер'">{{xmlValues.Offers[k5].data.Pars[k9].Name}}: {{xmlValues.Offers[k5].data.Pars[k9].Descr}}</p>
            </div> -->
            <v-layout row wrap>
              <v-flex>
                <button title="Edit" @click="retArrI(k5)" :class="{'edit-status-btn': (k5 == config.curOfferKey)}">
                  <v-icon>fa-edit</v-icon>
                </button>
              </v-flex>
              <v-flex>
                <button title="Move left" @click="swap(k5, parseInt(k5) - 1)">
                  <v-icon>fa-chevron-left</v-icon>
                </button>
              </v-flex>
              <v-flex>
                <button title="Move right" @click="swap(k5, parseInt(k5) + 1)">
                  <v-icon>fa-chevron-right</v-icon>
                </button>
              </v-flex>
              <v-flex>
                <button title="Copy and create new offer" @click="constrOffer(k5)">
                  <v-icon center>fa-clone</v-icon>
                </button>
              </v-flex>
            </v-layout>




          </div>
        </div>
        </div>
</template>
<script>
import Editor from './Editor'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'MiniOffer',
  props: [
    'constrOffer'
  ],
  computed: {
    ...mapState([
      'mainData'
    ]),
    xmlValues() {
      return this.$store.state.curPriceListData.xmlValues
    },
    config() {
      return this.$store.state.curPriceListData.config
    },
    miniOfferSetup () {
      return this.$store.state.curPriceListData.config.miniOfferSetup
    }
  },
  methods: {
    swap (sourceKey, targetKey) {
      if (targetKey < 0 || targetKey > Object.keys(this.xmlValues.Offers).length - 1) { return };
      var temp = this.xmlValues.Offers[sourceKey]
      this.xmlValues.Offers[sourceKey] = this.xmlValues.Offers[targetKey]
      this.xmlValues.Offers[targetKey] = temp
      if (sourceKey == this.config.curOfferKey) {
        this.config.curOfferKey = targetKey
      } else if (targetKey == this.config.curOfferKey && sourceKey > this.config.curOfferKey) {
        this.config.curOfferKey = parseInt(this.config.curOfferKey) + 1
      } else if (targetKey == this.config.curOfferKey && sourceKey < this.config.curOfferKey) {
        this.config.curOfferKey = parseInt(this.config.curOfferKey) - 1
      }
      console.log(this.config.curOfferKey)
    },
    retArrI (key) {
      this.config.curOfferKey = key
    }
  }
}
</script>
<style>


.offer-mini-img {
  height: auto;
  width: 50px
}


.offer-mini-container {
  display: inline-block;
  width: 150px;
  margin: 1rem 0 0 1rem;
}

.offer-mini {
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.979)
}

.item-not-avail {
  background-color: rgba(206, 206, 206, 0.699);
  color: rgba(80, 80, 80, 0.911)
}


.offer-mini button {
  background: none;
  margin: 0.1rem 0.1rem;
  width: 2.2rem;
  height: 2.2rem;
  box-shadow: none;
  text-shadow: none;
  border-radius: 0.5rem;
  padding: 0.1rem 0 0 0;
  text-align: center;
  border: 1px solid gray;
  background-color: rgb(255, 255, 255);
}

.offer-mini .edit-status-btn {
  background: rgba(216, 96, 96, 0.822);
  color: white;
}

.offer-mini p {
  text-shadow: 1px 1px 2px white, -1px -1px 2px white, 0px 0px 5px white;
  word-break: break-all;
  line-height: 1;
  font-size: 0.85em
}


</style>
