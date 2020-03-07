<template>
  <div class="adder">
    <p>Add people: ({{this.count}}/{{this.max_people}})</p>
    <input type="text" v-model=name v-on:keyup.enter=add :disabled="disabled">
    <button :disabled="name.length < 1" v-on:click=add>+</button>
  </div>
</template>

<script>
export default {
  name: 'Adder',
  data () {
    return {
      name: ""
    }
  },
  methods: {
    add () {
      this.$emit("add", this.name)
      this.name = ""
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    count: {
        type: Number,
        default: 0
    },
    max_people: {
        type: Number,
        default: 8
    },
  },
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
