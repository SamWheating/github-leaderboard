<template>
  <div class="person">
    <a :href="'https://github.com/' + name">{{name}}</a>
    <button v-on:click=remove>-</button>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: {
    name: String,
    color: String
  },
  methods: {
    remove () {
      this.$emit("remove", this.name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.person {
    background-color: #555AAA;
    margin-left: 1vw;
    margin-right: 1vw;
}

button {
  margin-left: 1%;
  margin-right: 1%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>