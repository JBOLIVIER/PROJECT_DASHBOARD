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
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  watch: {
    timestamps: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.$nextTick(() => {
          this.renderChart();
        });
      },
      deep: true,
    },
    values: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.$nextTick(() => {
          this.renderChart();
        });
      },
      deep: true,
    },
  },
  methods: {
    renderChart() {
      const labels = this.timestamps;
      const dataValues = this.values;
      const canvas = this.$refs.chartCanvas;
      if (!canvas) {
        console.error("Canvas introuvable !");
        return;
      }
      this.chart = new Chart(canvas, {
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
          scales: {
            x: {
              ticks: {
                callback: (value, index, ticks) => {
                  const d = new Date(value);
                  return (
                    d.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) +
                    " " +
                    d.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  );
                },
              },
            },
          },
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
