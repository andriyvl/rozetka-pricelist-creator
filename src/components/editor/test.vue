<template>

    <div class="test">
        <input type="text" v-model="title"> <br/>
        <h1>{{title}}</h1>
        <p v-if="showName">{{user.first_name}}</p>
        <p v-else>Nobody</p>
        <ul>
            <li v-for="item in items" :key="item.title">{{item.title}}</li>
        </ul>
        <button v-on:click="greet('Hello World')">Say Greeting</button>
        <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
        <hr>
        <label>First Name:</label> <input type="text" v-model="user.first_name">
        <br>
        <label>Last Name:</label> <input type="text" v-model="user.last_name">
        <h3>{{fullName}}</h3>
    </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      title: 'Hello World',
      user: {
        first_name: 'John',
        last_name: 'Johnson'
      },
      showName: true,
      items: [
        { title: 'Item1' },
        { title: 'Item2' },
        { title: 'Item3' }
      ]
    }
  },
  methods: {
    greet: function (greeting) {
      alert(greeting)
    },
    pressKey: function (e) {
      console.log(e.target.value)
    },
    enterHit: function () {
      console.log('you hit enter')
    }
  },
  computed: {
    fullName: function () {
      return this.user.first_name + ' ' + this.user.last_name
    }
  }

}
</script>

<style scoped>

</style>
