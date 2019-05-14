<template>
            <!-- MINI CONTAINERS -->
        <div>
        <div class="offer-mini-container" v-for="k5 in Object.keys(xmlValues.Offers)" :key="k5">
          <div class="offer-mini" :style='{backgroundImage: "url("+ xmlValues.Offers[k5].data.Pics[0] + ")", backgroundSize: "auto 90%"}'>
            <p><b>{{xmlValues.Offers[k5].data.Name}}</b></p>
            <div v-for="(el3, k3) in xmlValues.Offers[k5].data.Pars" :key="el3.k3">
              <p v-if="xmlValues.Offers[k5].data.Pars[k3].Name == 'Цвет'">{{xmlValues.Offers[k5].data.Pars[k3].Name}}: {{xmlValues.Offers[k5].data.Pars[k3].Descr}}</p>
            </div>
            <div v-for="(el3, k9) in xmlValues.Offers[k5].data.Pars" :key="el3.k9">
              <p v-if="xmlValues.Offers[k5].data.Pars[k9].Name == 'Размер'">{{xmlValues.Offers[k5].data.Pars[k9].Name}}: {{xmlValues.Offers[k5].data.Pars[k9].Descr}}</p>
            </div>
            <p>Price: {{xmlValues.Offers[k5].data.Price}} {{xmlValues.Offers[k5].data.CurId}}</p>
            <p>On stock: {{xmlValues.Offers[k5].data.StockQ}} Available: <input class="checkbox-avail" type="checkbox" v-model="xmlValues.Offers[k5].Available"></p>
            <p style="font-size: 1.5rem">ID: <b>{{xmlValues.Offers[k5].Id}}</b> CAT: <b>{{xmlValues.Offers[k5].data.CatId}}</b></p>
            <button title="Edit" @click="retArrI(k5)" :class="{'edit-status-btn': (k5 == xmlValues.config.curOfferKey)}">
              <v-icon>fa-edit</v-icon>
            </button>            
            <button title="Move left" @click="swap(k5, parseInt(k5) - 1)">
              <v-icon>fa-chevron-left</v-icon>
            </button>
            <button title="Move right" @click="swap(k5, parseInt(k5) + 1)">
              <v-icon>fa-chevron-right</v-icon>
            </button>
            <button title="Copy and create new offer" @click="constrOffer(k5)">
              <v-icon center>fa-clone</v-icon>
            </button>
          </div>
        </div>
        </div>
</template>
<script>
import Editor from "./Editor";
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'MiniOffer',
  props: [
    'constrOffer'
    ],
  computed: {
    ...mapState([
      'mainData',
      'xmlValues'
    ])
  },
  methods: {
        swap(sourceKey, targetKey) { 
          if (targetKey < 0 || targetKey > Object.keys(this.xmlValues.Offers).length - 1) { return };
          var temp = this.xmlValues.Offers[sourceKey];
          this.xmlValues.Offers[sourceKey] = this.xmlValues.Offers[targetKey];
          this.xmlValues.Offers[targetKey] = temp;
          if (sourceKey == this.xmlValues.config.curOfferKey) {
            this.xmlValues.config.curOfferKey = targetKey;
          } else if (targetKey == this.xmlValues.config.curOfferKey && sourceKey > this.xmlValues.config.curOfferKey) {
            this.xmlValues.config.curOfferKey = parseInt(this.xmlValues.config.curOfferKey) + 1;
          } else if (targetKey == this.xmlValues.config.curOfferKey && sourceKey < this.xmlValues.config.curOfferKey) {
            this.xmlValues.config.curOfferKey = parseInt(this.xmlValues.config.curOfferKey) - 1;
          }
          console.log(this.xmlValues.config.curOfferKey)
          return;
        },
        retArrI(key) {
            this.xmlValues.config.curOfferKey = key;
            return
        }
      }
    }
</script>
