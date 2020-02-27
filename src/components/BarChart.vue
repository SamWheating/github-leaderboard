<script>
  //Importing Bar class from the vue-chartjs wrapper
  import { Bar } from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Bar,
    props: {
      data: {
        type: Array,
        default: function () { return [1,2,3] }
      },
      labels: {
        type: Array,
        default:  function () { return ['a', 'b', 'c'] }
      },
    },
    data () {
      return {
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    computed: {
      datacollection () {
        return {
          //Data to be represented on x-axis
          labels: this.labels,
          datasets: [
            {
              label: 'Scores',
              backgroundColor: '#90ed8a',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.data
            }
          ]
        }
      }
    },
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    },
    watch: {
      data: function () {
        console.log("updating")
        this.renderChart(this.datacollection, this.options)
      }
    }
  }
</script>