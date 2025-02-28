<template>
    <div class="date-picker">
      <label :for="id">{{ label }}</label>
      <input
        type="datetime-local"
        :id="id"
        v-model="formattedValue"
        class="form-control"
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  /**
   * formattedValue est une computed property qui fait la conversion :
   * - get() : Convertit la valeur ISO (props.modelValue) en format "YYYY-MM-DDTHH:mm"
   * - set() : Prend la valeur de l'input et la convertit en ISO, puis émet update:modelValue
   */
  const formattedValue = computed({
    get() {
      if (!props.modelValue) return '';
      // Convertit la chaîne ISO en Date
      const date = new Date(props.modelValue);
      // Formate en "YYYY-MM-DDTHH:mm" (local time)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    set(value) {
      if (!value) {
        emit('update:modelValue', '');
        return;
      }
      // value est au format "YYYY-MM-DDTHH:mm" (en heure locale)
      const date = new Date(value);
      // Pour éviter d'éventuelles différences de fuseau horaire, on peut émettre la valeur en ISO
      emit('update:modelValue', date.toISOString());
    }
  });
  </script>
  
  <style scoped>
  .date-picker {
    opacity: 1.0;
  }
  </style>
  