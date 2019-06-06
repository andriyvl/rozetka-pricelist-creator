<template>
  <div class="spoiler heading-shop-descr">
    <!-- button to disable edit -->
    <h4>Heading</h4>
    <p>XML version:
      <input class="input-id" type="text" v-model="xmlValues.Xml.Version"> Encoding:
      <input type="text" v-model="xmlValues.Xml.Encoding">
    </p>
    <p>Yml catalog date:
      <input type="text" v-model="xmlValues.YmlDate">
      <button @click="getDateAndTime()">update</button>
    </p>
    <h4>Shop description</h4>
    <p>Name:
      <input type="text" v-model="xmlValues.Name">
    </p>
    <p>Company:
      <input type="text" v-model="xmlValues.Company">
    </p>
    <p>URL:
      <input type="text" v-model="xmlValues.Url">
    </p>
    <!-- add platform -->
    <p>Currencies: <button @click="addOption($store.state.xmlValues.Curs, 0, 'Curs')">+1</button></p>
    <div v-for="(el, k) in Object.keys(xmlValues.Curs)" :key="el.k">
      <p>ID:
        <input class="input-id" type="text" v-model="xmlValues.Curs[k].Id"> Currency Rate:
        <input class="input-id" type="text" v-model="xmlValues.Curs[k].Rate">
        <button v-if="Object.keys(xmlValues.Curs).length > 1" class="x-btn" @click="deleteOption($store.state.xmlValues.Curs, k)">X</button>
      </p>
    </div>

    <p>Categories: <button @click="addOption($store.state.xmlValues.Cat, 0, 'Cat')">Add new category</button></p>
    <div class="content-box" v-for="(el, k4) in xmlValues.Cat" :key="el.k4">
      <p>
        ID:
        <input class="input-id" type="text" v-model="xmlValues.Cat[k4].Id">
        Category Name:
        <input type="text" v-model="xmlValues.Cat[k4].Name">
        <button v-if="Object.keys(xmlValues.Cat).length > 1" class="x-btn" @click="deleteOption(xmlValues.Cat, k4)">X</button>
        <button @click="addOption($store.state.xmlValues.Cat[k4].Child, 0, 'CatChild')">Add child category</button>
      </p>
      <div v-if="Object.keys(xmlValues.Cat[k4].Child).length > 0">
        <p style="margin-left: 25px" v-for="(el, k8) in xmlValues.Cat[k4].Child" :key="el.k8">
          child ID
          <input class="input-id" type="text" v-model="xmlValues.Cat[k4].Child[k8].Id">
          Name:
          <input type="text" v-model="xmlValues.Cat[k4].Child[k8].Name">
          <button class="x-btn" @click="deleteOption($store.state.xmlValues.Cat[k4].Child, k8)">X</button>
          <!-- 4th parameter would be 0 to allow deletion of all childs, for now function cannot handle adding childs when none exist  -->
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from './Editor'
export default {
  name: 'HeaderShopDescr',
  props: ['xmlValues', 'addOption', 'deleteOption']
}
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
