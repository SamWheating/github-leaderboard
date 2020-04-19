<template>
  <v-btn color="blue-grey" class="ma-2 white--text" min-width=350px
      v-clipboard:copy="link"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">
    {{ prompt }}
  </v-btn>
</template>

<script>
export default {
  name: 'ShareButton',
  props: {
    people: Array,
  },
  data () {
    return {
      prompt: "Copy Link to this leaderboard"
    }
  },
  computed: {
    link () {
      if (this.people.length == 0){
        return "https://leaderboard.50w.co"
      }
      var link = "https://leaderboard.50w.co/#/?names="
      console.log(this.people)
      for (var i in this.people) {
        link = link + this.people[i].username + ","
      }
      return link.substring(0, link.length - 1);
    }
  },
  methods: {
    onError () {
      this.prompt = "Error!"
      setTimeout(() => {  this.prompt = ("Copy Link to this leaderboard"); }, 2000);
    },
    onCopy () {
      this.prompt = "Copied!"
      setTimeout(() => {  this.prompt = ("Copy Link to this leaderboard"); }, 2000);
    }
  }
}
</script>
