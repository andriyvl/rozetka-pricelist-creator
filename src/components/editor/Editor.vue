<template>
  <v-container id="grid" fluid>
    <div id="forms">
      <div id="control-header">
        <p>
          Currenty editing:
          <select name id v-model="mainData.curPriceList">
            <option disabled value>Choose a price list</option>
            <option
              v-for="(el, k12) in Object.keys(mainData.priceLists)"
              :key="el.k12"
            >{{mainData.priceLists[k12]}}</option>
          </select>
          <v-btn @click.prevent="getDataFromFB">GETDATA</v-btn>
          <v-btn @click.prevent="setDataToFB">SETDATA</v-btn>
          <v-btn small flat @click.prevent>Save</v-btn>
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
          <div>
            Offer ID:
            <!-- v-model.number - converts the input to number -->
            <input
              disabled
              v-if="!locData.IdEditable"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].Id"
            >
            <input
              v-else-if="locData.IdEditable"
              @blur="verifyID(xmlValues.config.tempOfferId)"
              maxlength="5"
              :placeholder="xmlValues.Offers[xmlValues.config.curOfferKey].Id"
              id="offer-id"
              type="text"
              v-model="xmlValues.config.tempOfferId"
            >
            Edit:
            <input type="checkbox" v-model="locData.IdEditable">
          </div>
          <p>
            Name:
            <input type="text" v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Name">
          </p>
          <p>
            Price:
            <input
              type="number"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Price"
            >
          </p>
          <p>
            Stock quantity:
            <input
              class="input-id"
              type="text"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.StockQ"
            > Available:
            <input
              type="checkbox"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].Available"
            >
            <!-- available trigger stock to 0 -->
          </p>

          <p>
            Pictures:
            <button @click="addOption(xmlValues.Offers[xmlValues.config.curOfferKey].data.Pics)">+1</button>
          </p>
          <p
            v-for="(el2, k2) in Object.keys(xmlValues.Offers[xmlValues.config.curOfferKey].data.Pics)"
            :key="el2.k2"
          >
            <input
              class="pic-input"
              type="text"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Pics[k2]"
            >
            <button
              class="x-btn"
              @click="deleteOption(xmlValues.Offers[xmlValues.config.curOfferKey].data.Pics, k2)"
            >X</button>
          </p>
          <p>
            Category ID:
            <select
              class="input-id"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.CatId"
            >
              <option disabled value>Please select one</option>
              <option v-for="(el, k6) in xmlValues.Cat" :key="el.k6">{{xmlValues.Cat[k6].Id}}</option>
              <option v-for="(el, k10) in xmlValues.Cat" :key="el.k10">
                <p
                  v-for="(el, k11) in xmlValues.Cat[k10].Child"
                  :key="el.k11"
                >{{xmlValues.Cat[k10].Child[k11].Id}}</p>
                <!-- look for better way looping through children -->
              </option>
            </select>
          </p>
          <p>Description:</p>
          <textarea v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Descr"></textarea>

          <p>
            Parameters:
            <button
              @click="addOption($store.state.xmlValues.Offers[xmlValues.config.curOfferKey].data.Pars, 0, 'Parameter')"
            >+1</button>
          </p>
          <div
            v-for="(el3, k3) in Object.keys(xmlValues.Offers[xmlValues.config.curOfferKey].data.Pars)"
            :key="el3.k3"
          >
            <p>
              Name:
              <input
                type="text"
                v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Pars[k3].Name"
              >
              Description:
              <input
                style="width: 15rem"
                type="text"
                v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Pars[k3].Descr"
              >
              <button
                class="x-btn"
                @click="deleteOption($store.state.xmlValues.Offers[xmlValues.config.curOfferKey].data.Pars, k3)"
              >X</button>
            </p>
          </div>

          <p>
            Vendor:
            <input type="text" v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Vendor"> Url:
            <input type="text" v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.Url">
            Currency ID:
            <select
              class="input-id"
              v-model="xmlValues.Offers[xmlValues.config.curOfferKey].data.CurId"
            >
              <option disabled value>Please select one</option>
              <option v-for="(el, k7) in xmlValues.Curs" :key="el.k7">{{xmlValues.Curs[k7].Id}}</option>
            </select>
          </p>
          <v-btn small flat @click="constrOffer(xmlValues.config.curOfferKey)">Copy to new</v-btn>
          <v-btn small flat @click="deleteOffer(xmlValues.config.curOfferKey)">Delete offer</v-btn>
        </div>
        <vue-over-body></vue-over-body>
        <mini-offer :constrOffer="constrOffer" :xmlValues="xmlValues" :mainData="mainData"></mini-offer>
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

export default {
  name: "Editor",
  components: {
    XmlPreview,
    HeaderShopDescr,
    Offer,
    MiniOffer,
    VueOverBody
  },

  data() {
    return {
      locData: {
        showXml: false, // LOCAL ONLY
        IdEditable: false // LOCAL ONLY
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
        
      },*/
      popUpOpen: 0
    };
  },
  computed: {
    ...mapGetters(["getOffer"]),
    ...mapActions(["addNewOfferAction", "addOptionAction"]),
    ...mapState(["mainData", "xmlValues"]),
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
      this.$store.dispatch("getDataFromFB", this.mainData.curPriceList);
    },
    setDataToFB() {
      this.$store.dispatch("setDataToFB", this.mainData.curPriceList);
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
      this.xmlValues.config.lastID = tempId;
      tempOffer.Id = this.xmlValues.config.lastID;
      this.$store.dispatch("addNewOfferAction", {
        key: key,
        tempOffer: tempOffer
      });
    },
    /*     addNewOffer (offerIndex, commit ) {
      let tempOffer = this.xmlValues.Offers[offerIndex]
      let key = Object.keys(this.xmlValues.Offers).length + 1
      const tempId = this.incIdBy1() // increment ID with checking if already exist
      this.xmlValues.config.lastID = tempId
      tempOffer.Id = this.xmlValues.config.lastID
      this.$store.dispatch('addNewOfferAction', {key, tempOffer})
    }, */
    incIdBy1() {
      // function increments the ID by from last used ID
      let c = "" + (parseInt(this.xmlValues.config.lastID) + 1); //replace with '' + 1 to populate all deleted IDs
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
    getDateAndTime() {
      const currentdate = new Date();
      this.xmlValues.YmlDate =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();
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
        if (
          newId === this.xmlValues.Offers[this.xmlValues.config.curOfferKey].Id
        ) {
          alert(`this is the same ID as before`);
        } else if (this.checkIfIdExist(newId)) {
          alert(`ID ${newId} does already exist! Choose another one!`);
        } else if (!this.checkIfIdExist(newId)) {
          this.xmlValues.Offers[this.xmlValues.config.curOfferKey].Id = newId;
          this.locData.IdEditable = false;
          this.xmlValues.config.tempOfferId = "";
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
            this.xmlValues.config.curOfferKey = parseInt(curI) - 1;
          }
          this.$store.dispatch("deleteOfferAction", { curI });
        }
      } else {
        alert(`You cant delete the last existing order!`);
      }
      return;
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

* {
  text-align: left;
}

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

input {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
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

.offer-mini-container {
  display: inline-block;
  width: 200px;
  margin: 1rem 0 0 1rem;
}

.offer-mini {
  border: 1px solid black;
  border-radius: 15px;
  background-color: rgba(255, 150, 118, 0.87);
}

.offer-mini button {
  background: none;
  margin: 0.2rem 0.3rem;
  width: 2.5rem;
  height: 2.5rem;
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
