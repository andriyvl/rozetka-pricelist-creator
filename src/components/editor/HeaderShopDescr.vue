<template>
  <div class="spoiler heading-shop-descr">
    <!-- button to disable edit -->
    <v-layout>
      <v-flex sm2 pa-1>
        <v-text-field label="Версія XML" v-model="xmlValues.Xml.Version"></v-text-field>   
      </v-flex>
      <v-flex sm2 pa-1>
        <v-text-field label="Encoding" v-model="xmlValues.Xml.Encoding"></v-text-field>
      </v-flex>      
      <v-flex sm4 pa-1>
        <v-text-field label="Дата каталогу Yml" v-model="xmlValues.YmlDate"></v-text-field>  
      </v-flex>
      <v-flex pa-1 sm2 align-self-center>
        <v-icon @click="getDateAndTime()">refresh</v-icon>  
      </v-flex>
    </v-layout>
    <v-text-field label="Назва магазину" v-model="xmlValues.Name"></v-text-field>
    <v-text-field label="Назва компанії" v-model="xmlValues.Company"></v-text-field>
    <v-text-field label="Адрес URL" placeholder="напр. www.nazva-mahazynu.ua" v-model="xmlValues.Url" ></v-text-field>
    <!-- add platform -->
    <v-layout row wrap>
      <v-flex pa-1 sm2 align-self-center>
        <p>Currencies:</p>
      </v-flex>
      <v-flex pa-1 sm1 align-self-center>
        <v-icon @click="addOption(xmlValues.Curs, 0, 'Curs')">add_circle_outline</v-icon>
      </v-flex>
    </v-layout>

    <div v-for="(el, k) in Object.keys(xmlValues.Curs)" :key="el.k">
      <v-layout>
        <v-flex pa-1 sm1 align-self-center>
          <v-icon v-if="Object.keys(xmlValues.Curs).length > 1" @click="deleteOption(xmlValues.Curs, k)" >remove_circle_outline</v-icon>
        </v-flex>
        <v-flex pa-1 sm2>
          <v-text-field label="ID валюти" placeholder="напр. UAH" v-model="xmlValues.Curs[k].Id" ></v-text-field>  
        </v-flex>
        <v-flex pa-1 sm2>
        <v-text-field label="Курс валюти" placeholder="напр. 1" v-model="xmlValues.Curs[k].Rate"></v-text-field>          
        </v-flex>
      </v-layout>
    </div>

    <p>
      Категорії: <v-icon @click="addOption(xmlValues.Cat, xmlValues.Cat[Object.keys(xmlValues.Cat).length - 1].Id, 'Cat')">add_circle_outline</v-icon>
    </p>
    <div class="content-box" v-for="(el4, k4) in xmlValues.Cat" :key="el4.k4">
      <v-layout>
        <v-flex pa-1 sm1 align-self-center>
          <v-icon v-if="Object.keys(xmlValues.Cat).length > 1" @click="deleteOption(xmlValues.Cat, k4)">remove_circle_outline</v-icon>
        </v-flex>
        <v-flex pa-1 sm1>
          <v-text-field label="ID" 
          placeholder="напр. 1" 
          :rules="$store.state.validationRules.isNumber"
          required
          validate-on-blur 
          v-model="xmlValues.Cat[k4].Id">
          </v-text-field>
        </v-flex>
        <v-flex pa-1>
          <v-text-field label="Назва Категорії" placeholder="напр. Верхній Одяг" v-model="xmlValues.Cat[k4].Name"></v-text-field>
        </v-flex>
        <v-flex pa-1 sm1 align-self-center>
            <v-icon @click="addOption(xmlValues.Cat[k4].Child, xmlValues.Cat[k4].Id, 'CatChild')">add_circle_outline</v-icon>
        </v-flex>
      </v-layout>

<!-- SUB CATEGORY LEVEL 1 -->
      <div ma-1 pa-1 v-if="Object.keys(xmlValues.Cat[k4].Child).length > 0">
        <div  class="content-box"  style="margin: 5px 5px 5px 25px" v-for="(el8, k8) in xmlValues.Cat[k4].Child" :key="el8.k8">
          <v-layout>
            <v-flex pa-1 sm1 align-self-center>
              <v-icon>subdirectory_arrow_right</v-icon>
            </v-flex>
            <v-flex pa-1 sm1 align-self-center>
              <v-icon @click="deleteOption(xmlValues.Cat[k4].Child, k8)">remove_circle_outline</v-icon>
            </v-flex>
            <v-flex pa-1 sm2>
              <v-text-field
                label="Child ID"
                placeholder="напр.: 101"
                :rules="$store.state.validationRules.isNumber"
                required
                validate-on-blur
                v-model="xmlValues.Cat[k4].Child[k8].Id"
              ></v-text-field>
            </v-flex>
            <v-flex pa-1>
              <v-text-field label="Назва" placeholder="напр. Блузи" v-model="xmlValues.Cat[k4].Child[k8].Name"
              ></v-text-field>
            </v-flex>
            <v-flex pa-1 sm1 align-self-center>
              <v-icon @click="addOption(xmlValues.Cat[k4].Child[k8].Child, xmlValues.Cat[k4].Child[k8].Id, 'CatChild')">add_circle_outline</v-icon>
            </v-flex>
          </v-layout>

<!-- SUB CATEGORY LEVEL 2 -->
           <div v-if="Object.keys(xmlValues.Cat[k4].Child[k8].Child).length > 0">
            <div  class="content-box" style="margin: 5px 5px 5px 25px" v-for="(el9, k9) in xmlValues.Cat[k4].Child[k8].Child" :key="el9.k9">
              <v-layout>
                <v-flex pa-1 sm1 align-self-center>
                  <v-icon>subdirectory_arrow_right</v-icon>
                </v-flex>
                <v-flex pa-1 sm1 align-self-center>
                  <v-icon @click="deleteOption(xmlValues.Cat[k4].Child[k8].Child, k9)">remove_circle_outline</v-icon>
                </v-flex>
                <v-flex pa-1 sm2>
                  <v-text-field
                    label="Child ID"
                    placeholder="напр.: 101"
                    :rules="$store.state.validationRules.isNumber"
                    required
                    validate-on-blur
                    v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Id"
                  ></v-text-field>
                </v-flex>
                <v-flex pa-1>
                  <v-text-field label="Назва" placeholder="напр. Блузи"  v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Name"></v-text-field>
                </v-flex>
                <v-flex pa-1 sm1 align-self-center>
                  <v-icon @click="addOption(xmlValues.Cat[k4].Child[k8].Child[k9].Child, xmlValues.Cat[k4].Child[k8].Child[k9].Id, 'CatChild')">add_circle_outline</v-icon>
                </v-flex>
              </v-layout> 
<!-- SUB CATEGORY LEVEL 3 -->
              <div v-if="Object.keys(xmlValues.Cat[k4].Child[k8].Child[k9].Child).length > 0">
                <div class="content-box" style="margin: 5px 5px 5px 25px" v-for="(el10, k10) in xmlValues.Cat[k4].Child[k8].Child[k9].Child" :key="el10.k10">
                  <v-layout lazy-validation>
                    <v-flex pa-1 sm1 align-self-center>
                      <v-icon>subdirectory_arrow_right</v-icon>
                    </v-flex>
                    <v-flex pa-1 sm1 align-self-center>
                      <v-icon @click="deleteOption(xmlValues.Cat[k4].Child[k8].Child[k9].Child, k10)">remove_circle_outline</v-icon>
                    </v-flex>                    
                    <v-flex pa-1 sm2>
                      <v-text-field
                        label="Child ID"
                        placeholder="напр.: 101"
                        :rules="$store.state.validationRules.isNumber"
                        required
                        validate-on-blur
                        v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Child[k10].Id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex pa-1>
                      <v-text-field label="Назва" placeholder="напр. Блузи" v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Child[k10].Name"></v-text-field>
                    </v-flex>
                  </v-layout>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "./Editor";
export default {
  name: "HeaderShopDescr",
  props: ["xmlValues", "addOption", "deleteOption"],
  data: () => ({

  }),
  created: () => {
    console.log('Header created')
    
  },
  methods: {
    getDateAndTime() {
      const currentdate = new Date();
      function getFormatedDate(para) {
        if (para < 10) {
          para = "0" + para;
        }
        return para;
      }

      this.xmlValues.YmlDate =
        currentdate.getFullYear() +
        "-" +
        getFormatedDate(currentdate.getMonth() + 1) +
        "-" +
        getFormatedDate(currentdate.getDate()) +
        " " +
        getFormatedDate(currentdate.getHours()) +
        ":" +
        getFormatedDate(currentdate.getMinutes());
    }
  }
};
</script>
<style>
/* spoiler */
input[id^="spoiler"] {
  display: none;
}

input[id^="spoiler"] + label {
  display: block;
  width: 150px;
  margin: 0 auto 0 20px;
  padding: 5px 5px;
  background: rgb(99, 170, 99);
  /*   border: 1px solid #333; */
  color: #fff;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  /* transition: all 0.6s; */
}

input[id^="spoiler"]:checked + label {
  color: #333;
  background: #ccc;
}

input[id^="spoiler"] ~ .spoiler {
  width: 90%;
  height: 0;
  overflow: hidden;
  opacity: 0;
  margin: 5px auto 0 5px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 8px;
  /*   transition: all 0.6s; */
}

input[id^="spoiler"]:checked + label + .spoiler {
  height: auto;
  opacity: 1;
  padding: 10px;
}

/* spoiler end */
</style>
