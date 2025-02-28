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
    import { defineProps } from 'vue';

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

    const displayValue = computed(() => {
    // Si props.data est une chaîne et qu'elle peut être interprétée comme une date ISO
    if (typeof props.data === 'string' && !isNaN(Date.parse(props.data))) {
        const d = new Date(props.data);
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const timeStr = d.toLocaleTimeString('fr-FR', timeOptions);
        const dateStr = d.toLocaleDateString('fr-FR', dateOptions);
        // Retourne l'heure sur la première ligne et la date sur la deuxième
        return timeStr + "\n" + dateStr;
    }
    
    // Sinon, on essaie de convertir en nombre
    const numericValue = parseFloat(props.data);
    if (!isNaN(numericValue)) {
        if (Number.isInteger(numericValue)) {
        return numericValue.toString();
        } else {
        return numericValue.toFixed(2);
        }
    }
    
    // Si ce n'est ni une date ni un nombre, renvoyer la valeur brute
    return props.data;
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
    /* Permet d'afficher les retours à la ligne (pour le cas date) */
    white-space: pre-line;
    text-align: center;
    align-items: baseline;
    gap: 0.2rem;
  }
  
  .unit {
    font-size: 1rem;
    opacity: 0.8;
  }
  </style>
  