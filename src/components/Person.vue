<template>
  <div>
    <v-chip :close="true" v-on:click:close=remove :color=color >{{name}}</v-chip>
  </div>
<!--   <div class="person">
    <a :href="'https://github.com/' + name">{{name}}</a>
    <button v-on:click=remove>-</button>
  </div> -->
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