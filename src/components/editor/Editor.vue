<template>
  <v-container fluid>
    <div v-if="mainData.curPriceList != '' && mainData.priceListSet == 'Y'" id="grid">
      <div id="forms">
        <div id="control-header">
          <p>
            Currenty editing:
            {{mainData.curPriceList}}
            <v-btn small color="info" @click.prevent="switchPriceList">SWITCH PRICE LIST</v-btn>
            <v-btn small color="success" @click.prevent="setDataToFB">SAVE</v-btn>
            <v-btn small color="warning" @click.prevent="getDataFromFB">GETDATA</v-btn>
          </p>
        </div>
        <hr>
        <br>
        <div class="xml-fields-wrapper">
          <input type="checkbox" id="spoiler2">
          <label for="spoiler2">Show/Hide Heading</label>

          <!-- header and shop description -->

          <header-shop-descr
            :xmlValues="xmlValues"
            :addOption="addOption"
            :deleteOption="deleteOption"
          ></header-shop-descr>
          <br>
          <hr>

          <!-- EDITING OFFER CONTAINER -->
          <!-- setup @click.prevent -->
          <div class="offer">
            <h4>Offers</h4>
            <!-- v-model.number - converts the input to number -->
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  disabled
                  v-if="!locData.IdEditable"
                  label="Offer ID"
                  v-model="xmlValues.Offers[config.curOfferKey].Id"
                ></v-text-field>
                <v-text-field
                  label="Offer ID"
                  v-else-if="locData.IdEditable"
                  @blur="verifyID(config.tempOfferId)"
                  maxlength="5"
                  :placeholder="xmlValues.Offers[config.curOfferKey].Id"
                  id="offer-id"
                  v-model="config.tempOfferId"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-switch color="green" label="Edit" v-model="locData.IdEditable"></v-switch>
              </v-flex>
            </v-layout>
            <v-text-field label="Name" v-model="xmlValues.Offers[config.curOfferKey].data.Name"></v-text-field>

            <v-layout row wrap >
              <v-flex pa-1 xs4>
                <v-checkbox
                  color="green"
                  label="Available"
                  v-model="xmlValues.Offers[config.curOfferKey].Available"
                ></v-checkbox>
              </v-flex>
              <v-flex pa-1 xs4>
                <v-text-field
                  type="number"
                  label="Stock quantity"
                  v-model="xmlValues.Offers[config.curOfferKey].data.StockQ"
                ></v-text-field>
              </v-flex>
              <v-flex pa-1 xs4>
                <v-text-field
                  type="number"
                  label="Price"
                  v-model="xmlValues.Offers[config.curOfferKey].data.Price"
                ></v-text-field>
              </v-flex>
            </v-layout>

              <v-container>
              Pictures:
              <button @click="addOption(xmlValues.Offers[config.curOfferKey].data.Pics)">+1</button>
            <p
              v-for="(el2, k2) in Object.keys(xmlValues.Offers[config.curOfferKey].data.Pics)"
              :key="el2.k2"
            >

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field v-model="xmlValues.Offers[config.curOfferKey].data.Pics[k2]"></v-text-field>
                  </v-flex>
                  <v-flex xs1>
                    <v-btn
                      @click="deleteOption(xmlValues.Offers[config.curOfferKey].data.Pics, k2)"
                      fab
                      small
                      color="warning"
                    >
                      <v-icon light>remove</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
            </p>
              </v-container>
            <p>
              Category ID:
              <!--               <select
                class="input-id"
                v-model="xmlValues.Offers[config.curOfferKey].data.CatId"
              >
                <option disabled value>Please select one</option>
                <option v-for="(el, k6) in returnCategories" :key="el.k6">{{returnCategories[k6]}}</option>
              </select>-->
              <v-overflow-btn
                allow-overflow="false"
                :items="returnCategories"
                label="Category ID"
                v-model="xmlValues.Offers[config.curOfferKey].data.CatId"
              ></v-overflow-btn>
            </p>
            <p>Description:</p>
            <textarea v-model="xmlValues.Offers[config.curOfferKey].data.Descr"></textarea>

            <p>
              Parameters:
              <button
                @click="addOption(xmlValues.Offers[config.curOfferKey].data.Pars, 0, 'Parameter')"
              >+1</button>
            </p>
            <div
              v-for="(el3, k3) in Object.keys(xmlValues.Offers[config.curOfferKey].data.Pars)"
              :key="el3.k3"
            >
              <v-layout>
                <v-flex xs12 md4>
                  <v-text-field
                    label="Name"
                    v-model="xmlValues.Offers[config.curOfferKey].data.Pars[k3].Name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    label="Description"
                    style="width: 15rem"
                    v-model="xmlValues.Offers[config.curOfferKey].data.Pars[k3].Descr"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <button
                    class="x-btn"
                    @click="deleteOption(xmlValues.Offers[config.curOfferKey].data.Pars, k3)"
                  >X</button>
                </v-flex>
              </v-layout>
            </div>

            <p>
              <v-text-field
                label="Vendor"
                v-model="xmlValues.Offers[config.curOfferKey].data.Vendor"
              ></v-text-field>
              <v-text-field label="Url" v-model="xmlValues.Offers[config.curOfferKey].data.Url"></v-text-field>Currency ID:
              <select
                class="input-id"
                v-model="xmlValues.Offers[config.curOfferKey].data.CurId"
              >
                <option disabled value>Please select one</option>
                <option v-for="(el, k7) in xmlValues.Curs" :key="el.k7">{{xmlValues.Curs[k7].Id}}</option>
              </select>
            </p>
            <v-btn color="info" small @click="constrOffer(config.curOfferKey)">Copy to new</v-btn>
            <v-btn color="error" small @click="deleteOffer(config.curOfferKey)">Delete offer</v-btn>
          </div>
          <vue-over-body></vue-over-body>
          <mini-offer :constrOffer="constrOffer" :xmlValues="xmlValues" :mainData="mainData"></mini-offer>
          <v-btn
            color="error"
            small
            @click.prevent="deletePriceList(mainData.curPriceList)"
          >Delete this Price List</v-btn>
        </div>

        <!--  PREVIEW XML -->
      </div>
      <div id="preview">
        <p>
          Preview XML
          <input type="checkbox" v-model="locData.showXml">
        </p>
        <v-btn flat small @click="download()">Download XML</v-btn>
        <!--       <button @click="httpSubmit">http</button> -->
        <xml-preview v-show="locData.showXml" :xmlValues="xmlValues"></xml-preview>
      </div>
    </div>
    <div v-else>
      <pre-editor :deletePriceList="deletePriceList"></pre-editor>
    </div>
  </v-container>
</template>

<script>
import XmlPreview from "./XmlPreview";
import HeaderShopDescr from "./HeaderShopDescr";
import Offer from "./Offer";
import MiniOffer from "./MiniOffer";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { toPath, get, isObjectLike } from "lodash-es";
import VueOverBody from "./MiniOfferSettingsPopUp";
import PreEditor from "./PreEditor";

export default {
  name: "Editor",
  components: {
    XmlPreview,
    HeaderShopDescr,
    Offer,
    MiniOffer,
    VueOverBody,
    PreEditor
  },

  data() {
    return {
      locData: {
        // LOCAL ONLY
        showXml: false,
        IdEditable: false,
        categories: [] // for computed property returning categories
        /* tagCount: {
          CurrencyCount: 1 // ???
        } */
      },
      /*     mainData: {
        curPriceList: "", // to br chosen from priceLists
        priceLists: [], // to be filled in after each enter of editor

        curOfferKey: "0", // index of array
        tempOfferId: "", // used in ID manual edit field to check if id already exist.
        lastID: "00001", // last used ID

      }, */
      popUpOpen: 0
    };
  },
  computed: {
    ...mapGetters(["getOffer"]),
    ...mapActions(["addNewOfferAction", "addOptionAction"]),
    ...mapState(["mainData"]),
    returnCategories() {
      let cat = [];
      for (let i = 0; i < Object.keys(this.xmlValues.Cat).length; i++) {
        for (
          let o = 0;
          o < Object.keys(this.xmlValues.Cat[i].Child).length;
          o++
        ) {
          cat.push(this.xmlValues.Cat[i].Child[o].Id);
        }
      }
      console.log(`categories`);
      console.log(cat);
      return cat;
    },
    xmlValues() {
      return this.$store.state.curPriceListData.xmlValues;
    },
    config() {
      return this.$store.state.curPriceListData.config;
    },
    StockQ: {
      set(StockQ) {
        this.xmlValues.Offers[1].data.StockQ = StockQ;
      },
      get() {
        return this.xmlValues.Offers[1].data.StockQ;
      }
    }
    /*     ...mapMutations([
      'addNewOffer'
    ]) */
  },
  methods: {
    getDataFromFB() {
      this.$store.dispatch("getDataFromFB");
    },
    setDataToFB() {
      this.$store.dispatch("setDataToFB");
    },
    switchPriceList() {
      let pr = confirm("Зберегти зміни в актуальному прайс-листі?");
      if (pr) {
        this.setDataToFB();
        this.$store.commit("setUnSetPriceList", { cur: "", set: "N" });
      }
      console.log("template name below");
      console.log(
        this.$store.state.PriceListDataTemplate.xmlValues.Offers[0].data.Name
      );
    },
    deletePriceList(pr) {
      let conf = confirm(
        'Ви справді хочете видалити прайслист під назвою "' + pr + '" ?'
      );
      if (conf) {
        this.$store.dispatch("deletePriceListAction", pr);
      }
    },
    OfferConstructor(offer) {
      this.Available = offer.Available;
      this.Id = offer.Id;
      this.data = {};
      this.data.Url = offer.data.Url;
      this.data.Price = offer.data.Price;
      this.data.CurId = offer.data.CurId;
      this.data.CatId = offer.data.CatId;
      this.data.Pics = {};
      Object.keys(offer.data.Pics).map(key => {
        this.data.Pics[key] = offer.data.Pics[key];
      });
      this.data.Name = offer.data.Name;
      this.data.Vendor = offer.data.Vendor;
      this.data.Descr = offer.data.Descr;
      this.data.Pars = {};
      Object.keys(offer.data.Pars).map(key => {
        this.data.Pars[key] = {};
        this.data.Pars[key].Name = offer.data.Pars[key].Name;
        this.data.Pars[key].Descr = offer.data.Pars[key].Descr;
      });
      this.data.StockQ = offer.data.StockQ;
    },
    constrOffer(curO) {
      let tempOffer = new this.OfferConstructor(this.xmlValues.Offers[curO]);
      let key = Object.keys(this.xmlValues.Offers).length;
      const tempId = this.incIdBy1(); // increment ID with checking if already exist
      this.config.lastID = tempId;
      tempOffer.Id = this.config.lastID;
      this.$store.dispatch("addNewOfferAction", {
        key: key,
        tempOffer: tempOffer
      });
    },
    /*     addNewOffer (offerIndex, commit ) {
      let tempOffer = this.xmlValues.Offers[offerIndex]
      let key = Object.keys(this.xmlValues.Offers).length + 1
      const tempId = this.incIdBy1() // increment ID with checking if already exist
      this.config.lastID = tempId
      tempOffer.Id = this.config.lastID
      this.$store.dispatch('addNewOfferAction', {key, tempOffer})
    }, */
    incIdBy1() {
      // function increments the ID by from last used ID
      let c = "" + (parseInt(this.config.lastID) + 1); // replace with '' + 1 to populate all deleted IDs
      for (let i = 0; i < 10000; i++) {
        if (c.length < 5) {
          c = "0" + c;
        } else if (c.length === 5 && !this.checkIfIdExist(parseInt(c))) {
          return c;
        } else {
          c = parseInt(c) + 1;
          c = "" + c;
        }
      }
    },
    checkIfIdExist(newId) {
      // checks if the ID exists in another offer
      for (let i = 0; i < Object.keys(this.xmlValues.Offers).length; i++) {
        if (newId === parseInt(this.xmlValues.Offers[i].Id)) {
          return true;
        }
      }
      return false;
    },
    ParameterConstr() {
      this.Name = "";
      this.Descr = "";
    },
    CursConstr() {
      this.Id = "";
      this.Rate = "";
    },
    CatConstr() {
      this.Id = "";
      this.Name = "";
      this.Child = {};
    },
    CatChildConstr() {
      this.Id = "";
      this.Name = "";
    },
    addOption(path, curKey, type) {
      let key = Object.keys(path).length;
      let newEl;
      if (type != undefined || type != null) {
        let constrStr = toPath(type + "Constr"); // defining which constuctor to be used
        let constr = get(this, constrStr);
        newEl = new constr(path[curKey]); // creating element with constructor
      } else {
        newEl = path[curKey];
      }
      this.$store.dispatch("addOptionAction", { path, key, newEl });
    },

    deleteOption(path, key) {
      this.$store.dispatch("deleteOptionAction", { path, key });
    },

    //  -> Implement BIN for restore deleted offer

    verifyID(newId) {
      // used by manual edit of ID
      if (newId.length === 5 && parseInt(newId)) {
        if (newId === this.xmlValues.Offers[this.config.curOfferKey].Id) {
          alert(`this is the same ID as before`);
        } else if (this.checkIfIdExist(newId)) {
          alert(`ID ${newId} does already exist! Choose another one!`);
        } else if (!this.checkIfIdExist(newId)) {
          this.xmlValues.Offers[this.config.curOfferKey].Id = newId;
          this.locData.IdEditable = false;
          this.config.tempOfferId = "";
        }
      } else if ((newId.length !== 5 || !parseInt(newId)) && newId !== "") {
        alert("ID is in wrong format!");
      }
    },
    deleteOffer(curI) {
      if (Object.keys(this.xmlValues.Offers).length > 1) {
        let answer = confirm(
          `Sure to delete offer ${
            this.xmlValues.Offers[curI].data.Name
          } whith ID: ${this.xmlValues.Offers[curI].Id}`
        );
        if (answer) {
          if (
            Object.keys(this.xmlValues.Offers).length ===
            parseInt(curI) + 1
          ) {
            this.config.curOfferKey = parseInt(curI) - 1;
          }
          this.$store.dispatch("deleteOfferAction", { curI });
        }
      } else {
        alert(`You cant delete the last existing order!`);
      }
    },

    download() {
      const text = document.querySelector("pre").innerText;
      const filename = "PriceFile.xml";

      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  },
  filters: {},
  watch: {}
};
</script>

<style>
/* from previous */
#grid {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 5px;
  display: grid;
  grid-template-columns: 9fr 4fr;
}
/* end */

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0.8rem 0 0.8rem 1rem;
}

p {
  margin: 0.2rem;
}

button {
  /* replace buttons with this class */
  margin: 0.2rem 0.3rem;
  padding: 0 0.4rem;
  border-radius: 1rem;
  border: 1px solid grey;
  background-color: white;
  cursor: pointer;
}

button:focus,
input:focus {
  outline: none;
}

select {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
}
textarea {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
}

.input-id {
  width: 3.5rem;
  border-radius: 0.3rem;
}

#preview * {
  font-size: 0.8rem;
  max-width: 500px;
  overflow: auto;
}

/* #forms {

} */
.offer {
  width: 90%;
  overflow: hidden;
  margin: 10px auto 0 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.pic-input {
  width: 600px;
}

textarea {
  width: 100%;
  height: 150px;
}

.x-btn,
.x-btn:hover {
  border: none;
  color: red;
  background: none;
  text-shadow: 1px 1px 1px black, -1px -1px 1px white;
  box-shadow: none;
  outline: none;
}

.content-box {
  border: 1px solid rgb(202, 202, 202);
  border-radius: 10px;
  margin: 0 0 5px 0;
  padding: 0;
}

.checkbox-avail[type="checkbox"] {
  appearance: none;
  margin: 0;
  /* Styling checkbox */
  width: 16px;
  height: 16px;
  vertical-align: bottom;
  position: relative;
  bottom: 1px;
  box-shadow: 0px 0px 5px white;
  border: 1px solid gray;
  cursor: pointer;
  background-color: rgba(255, 55, 55, 0.849);
}

.checkbox-avail[type="checkbox"]:checked {
  background-color: rgba(31, 129, 31, 0.849);
}
</style>
