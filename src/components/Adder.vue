<template>
  <div>
    <p>Add people: ({{this.count}}/{{this.max_people}})</p>
    <div class="adder">
      <v-text-field placeholder="Github Username" height=2vh v-model=name v-on:keyup.enter=add :disabled="disabled"></v-text-field>
      <v-btn :disabled="name.length < 1" v-on:click=add>+</v-btn>
    </div>
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

.adder {
  margin-bottom: 3vh;
  width: 30vw;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
