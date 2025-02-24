<template>
    <div class="case-container">
      <div class="case-title">{{ title }}</div>
      <div class="case-value">
        <span class="value">{{ displayValue }}</span>
        <span class="unit">{{ unite }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    data: {
      type: [String, Number],
      default: 0
    },
    unite: {
      type: String,
      default: ''
    }
  });
  
  // Computed pour formater la valeur
  const displayValue = computed(() => {
    const numericValue = parseFloat(props.data);
    // Si la conversion n'a pas réussi, renvoyer la valeur brute
    if (isNaN(numericValue)) {
      return props.data;
    }
    // Si la valeur est un entier (ex: 1, 42, 100)
    if (Number.isInteger(numericValue)) {
      return numericValue.toString();
    }
    // Sinon, c'est un float, on formate à 2 décimales
    return numericValue.toFixed(2);
  });
  </script>
  
  
  <style scoped>
  .case-container {
    background-color: #1b3c51;
    color: #fff;
    border-radius: 8px;
    width: 180px;
    height: 130px;
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  .case-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    opacity: 0.9;
  }
  
  .case-value {
    font-size: 2rem;
    font-weight: 700;
    align-items: baseline;
    gap: 0.2rem;
  }
  
  .unit {
    font-size: 1rem;
    opacity: 0.8;
  }
  </style>
  