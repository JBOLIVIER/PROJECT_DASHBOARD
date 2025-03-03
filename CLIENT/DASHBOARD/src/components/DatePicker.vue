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

  const formattedValue = computed({
    get() {
      if (!props.modelValue) return '';
      const date = new Date(props.modelValue);
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
      const date = new Date(value);
      emit('update:modelValue', date.toISOString());
    }
  });
  </script>

  <style scoped>
  .date-picker {
    opacity: 1.0;
  }
  </style>
