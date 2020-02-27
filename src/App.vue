<template>
  <div id="app">
    <h1>Github Leaderboard</h1>
    <Adder @add="onAddPerson"/>
      <div v-for="person in people" :key=person.username>
        <Person :name=person.username @remove="onRemovePerson"/>
      </div>
      <div v-if="people.length !== 0">
        <h1>Commits Today:</h1>
        <div style="width:80vw">
          <bar-chart :data=data :labels=labels></bar-chart>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Adder from './components/Adder.vue'
import Person from './components/Person.vue'
import BarChart from './components/BarChart.vue'

export default {
  name: 'App',
  components: {
    Adder, 
    Person,
    BarChart
  },
  data () {
    return {
      people: [],
    }
  },
  methods: {
    onAddPerson (username) {
      this.people.push({ username: username, score: 0})
      var today = new Date();
      var today_date = today.getFullYear()+'-'+("0" + (today.getMonth()+1)).substr(-2)+'-'+("0" + (today.getDate())).substr(-2);
      const This = this
      axios.get('https://github-contributions-api.now.sh/v1/' + username)
      .then( function (response) {
        for (var i in This.people) {
          if (This.people[i].username == username) {
              This.people[i].score = response.data.contributions.find(o => o.date === today_date).count;
              break; 
          }
        }
      })
    },
    onRemovePerson (username) {
      for (var i in this.people) {
        if (this.people[i].username == username) {
          this.people.splice(i, 1);            
          break; 
        }
      }
    }
  },
  computed: {
    data () {
      var data = []
      for (var i in this.people) {
        data.push(this.people[i].score)
      }
      return data
    },
    labels () {
      var labels = []
      for (var i in this.people) {
        labels.push(this.people[i].username)
      }
      return labels
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
