<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
export default {
  name: "ChartComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    timestamps: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    Chart.register(...registerables);
    this.renderChart();
  },
  watch: {
    // Re-crée le graphique dès que timestamps ou values changent
    timestamps: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderChart();
      },
      deep: true,
    },
    values: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderChart();
      },
      deep: true,
    },
  },
  methods: {
    renderChart() {
      const labels = this.timestamps;
      const dataValues = this.values;
      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${this.title} (${this.unit})`,
              data: dataValues,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
