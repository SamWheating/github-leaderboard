<template>
  <div class="adder">
    <p>Add people: ({{this.count}}/8)</p>
    <input type="text" v-model=name v-on:keyup.enter=add :disabled="disabled">
    <button v-on:click=add>+</button>
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
    }
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
