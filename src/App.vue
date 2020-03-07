<template>
  <div id="app">
    <h1>Github Leaderboard</h1>
    <Adder :max_people="max_people" :disabled="people.length >= max_people" :count="people.length" @add="onAddPerson"/>
      <div class="flexbox-container">
        <div v-for="person in people" :key=person.username>
          <Person :name=person.username @remove="onRemovePerson" color="#000fff"/>
        </div>
      </div>
      <div v-if="people.length !== 0">
        <h1>Contributions Today:</h1>
        <div class="chart-container">
          <bar-chart :chartData="daily_dataset"/>
        </div>
        <h1>Contributions this year:</h1>
        <div class="chart-container">
          <line-chart :chartData="year_dataset"/>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Adder from './components/Adder.vue'
import Person from './components/Person.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'

export default {
  name: 'App',
  components: {
    Adder, 
    Person,
    BarChart,
    LineChart
  },
  data () {
    return {
      colours: ["#003f5c","#ffa600","#a05195","#2f4b7c","#665191","#d45087","#f95d6a","#ff7c43"],
      max_people: 4,
      people: [],
      year_labels: []
    }
  },
  methods: {
    onAddPerson (username) {
      this.people.push({ username: username, score: 0, year_data:[], year_labels:[]})
      var today = new Date();
      var today_date = today.getFullYear()+'-'+("0" + (today.getMonth()+1)).substr(-2)+'-'+("0" + (today.getDate())).substr(-2);
      const This = this
      axios.get('https://github-contributions-api.now.sh/v1/' + username)
      .then( function (response) {
        console.log(response)
        for (var i in This.people) {
          if (This.people[i].username == username) {
              This.people[i].score = response.data.contributions.find(o => o.date === today_date).count;
              var tmpdata= []
              var tmplabels = []
              for (var j = 0; j < 366; j++) {
                tmpdata.push(response.data.contributions[j].count)
                tmplabels.push(response.data.contributions[j].date)
              }
              tmpdata = tmpdata.reverse()   // reverse and running-total data
              for (j = 1; j < tmpdata.length; j++) {
                tmpdata[j] = tmpdata[j] + tmpdata[j-1]
              }
              // get day of year:
              var now = new Date();
              var start = new Date(now.getFullYear(), 0, 0);
              var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
              var oneDay = 1000 * 60 * 60 * 24;
              var day = Math.floor(diff / oneDay);
              This.people[i].year_data = tmpdata.slice(0, day)
              This.people[i].year_labels = tmplabels.reverse().slice(0,day)
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
    },
    daily_dataset () {
      return {
        //Data to be represented on x-axis
        labels: this.labels,
        datasets: [
          {
            label: 'Contributions',
            backgroundColor: this.colours,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: this.data
          }
        ]
      }
    },
    year_dataset () {
      var datasets = []
      for (var i in this.people){
        var timeseries = {
              fill: false,
              label: this.people[i].username,
              borderColor: this.colours[i],
              pointBackgroundColor: 'white',
              pointHoverBorderColor: this.colours[i],
              pointHitRadius: 10,
              borderWidth: 5,
              pointRadius: 0,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.people[i].year_data
        }
        datasets.push(timeseries)
      }
      return {
        labels: this.people[0].year_labels,
        datasets: datasets
      }
    }
  },
  mounted() {
    var names = this.$route.query.names.split(",")
    for (var i in names){
      this.onAddPerson(names[i])
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

.chart-container {
  width: 70vw;
  margin-top: 5vh;
  margin: auto;
}

.flexbox-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 40%;
    margin: auto;
}

</style>
