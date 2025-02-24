<!-- src/components/Case.vue -->
<template>
    <div class="sensor-case">
      <p>{{ data }} {{ unite }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Case",
    props: {
      data: {
        type: [Number, String],
        required: true
      },
      unite: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .sensor-case {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 0.5rem;
    text-align: center;
    border-radius: 4px;
    min-width: 100px;
  }
  </style>
  