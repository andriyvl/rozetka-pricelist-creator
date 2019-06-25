<template>
  <div class="spoiler heading-shop-descr">
    <!-- button to disable edit -->
    <h4>Heading</h4>
    <p>
      XML version:
      <input class="input-id" type="text" v-model="xmlValues.Xml.Version"> Encoding:
      <input type="text" v-model="xmlValues.Xml.Encoding">
    </p>
    <p>
      Yml catalog date:
      <input type="text" v-model="xmlValues.YmlDate">
      <button @click="getDateAndTime()">update</button>
    </p>
    <h4>Shop description</h4>
    <p>
      Name:
      <input type="text" v-model="xmlValues.Name">
    </p>
    <p>
      Company:
      <input type="text" v-model="xmlValues.Company">
    </p>
    <p>
      URL:
      <input type="text" v-model="xmlValues.Url">
    </p>
    <!-- add platform -->
    <p>
      Currencies:
      <button @click="addOption($store.state.xmlValues.Curs, 0, 'Curs')">+1</button>
    </p>
    <div v-for="(el, k) in Object.keys(xmlValues.Curs)" :key="el.k">
      <p>
        ID:
        <input class="input-id" type="text" v-model="xmlValues.Curs[k].Id"> Currency Rate:
        <input class="input-id" type="text" v-model="xmlValues.Curs[k].Rate">
        <button
          v-if="Object.keys(xmlValues.Curs).length > 1"
          class="x-btn"
          @click="deleteOption($store.state.xmlValues.Curs, k)"
        >X</button>
      </p>
    </div>

    <p>
      Categories:
      <button @click="addOption(xmlValues.Cat, xmlValues.Cat[Object.keys(xmlValues.Cat).length - 1].Id, 'Cat')">Додати нову категорію</button>
    </p>
    <div class="content-box" v-for="(el4, k4) in xmlValues.Cat" :key="el4.k4">
      <v-layout>
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
          <v-text-field
            label="Назва Категорії"
            placeholder="напр. Верхній Одяг"
            type="text"
            v-model="xmlValues.Cat[k4].Name"
          ></v-text-field>
        </v-flex>
        <v-flex pa-1>
          <button
            v-if="Object.keys(xmlValues.Cat).length > 1"
            class="x-btn"
            @click="deleteOption(xmlValues.Cat, k4)"
          >X</button>
        </v-flex>
        <v-flex pa-1>
          <button @click="addOption(xmlValues.Cat[k4].Child, xmlValues.Cat[k4].Id, 'CatChild')">Додати підкатегорію</button>
        </v-flex>
      </v-layout>

<!-- SUB CATEGORY LEVEL 1 -->
      <div v-if="Object.keys(xmlValues.Cat[k4].Child).length > 0">
        <div style="margin-left: 25px" v-for="(el8, k8) in xmlValues.Cat[k4].Child" :key="el8.k8">
          <v-layout>
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
              <v-text-field
                label="Назва"
                placeholder="напр. Блузи"
                type="text"
                v-model="xmlValues.Cat[k4].Child[k8].Name"
              ></v-text-field>
            </v-flex>
            <v-flex pa-1>
              <button class="x-btn" @click="deleteOption(xmlValues.Cat[k4].Child, k8)">X</button>
            </v-flex>
            <v-flex pa-1>
              <button
                @click="addOption(xmlValues.Cat[k4].Child[k8].Child, xmlValues.Cat[k4].Child[k8].Id, 'CatChild')"
              >Додати підкатегорію</button>
            </v-flex>
          </v-layout>

<!-- SUB CATEGORY LEVEL 2 -->
           <div v-if="Object.keys(xmlValues.Cat[k4].Child[k8].Child).length > 0">
            <div style="margin-left: 25px" v-for="(el9, k9) in xmlValues.Cat[k4].Child[k8].Child" :key="el9.k9">
              <v-layout>
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
                  <v-text-field
                    label="Назва"
                    placeholder="напр. Блузи"
                    type="text"
                    v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Name"
                  ></v-text-field>
                </v-flex>
                <v-flex pa-1>
                  <button class="x-btn" @click="deleteOption(xmlValues.Cat[k4].Child[k8].Child, k9)">X</button>
                </v-flex>
                <v-flex pa-1>
                  <button
                    @click="addOption(xmlValues.Cat[k4].Child[k8].Child[k9].Child, xmlValues.Cat[k4].Child[k8].Child[k9].Id, 'CatChild')"
                  >Додати підкатегорію</button>
                </v-flex>
              </v-layout> 
<!-- SUB CATEGORY LEVEL 3 -->
              <div v-if="Object.keys(xmlValues.Cat[k4].Child[k8].Child[k9].Child).length > 0">
                <div
                  style="margin-left: 25px"
                  v-for="(el10, k10) in xmlValues.Cat[k4].Child[k8].Child[k9].Child"
                  :key="el10.k10"
                >
                  <v-layout lazy-validation>
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
                      <v-text-field
                        label="Назва"
                        placeholder="напр. Блузи"
                        type="text"
                        v-model="xmlValues.Cat[k4].Child[k8].Child[k9].Child[k10].Name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex pa-1>
                      <button
                        class="x-btn"
                        @click="deleteOption(xmlValues.Cat[k4].Child[k8].Child[k9].Child, k10)"
                      >X</button>
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
