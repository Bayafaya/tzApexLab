<template>
  <a-modal
    :open="modals[type]"
    title="Basic Modal"
    :footer="false"
    @cancel="toggleModal(type)"
    @ok="toggleModal(type)"
  >
  
    <div class="flex gap-3">
      <a-select
        placeholder="Поиск"
        show-search
        :value="modelValue"
        @change="(value: string) => $emit('update:modelValue', value)"
        :show-arrow="false"
        class="mb-4 w-full"
        :options="optionList[listKey].map((item) => ({ value: item }))"
        size="large"
        :filterOption="handleOption"
      />
    </div>

    <div class="flex gap-3">
      <a-input
        size="large"
        v-model:value="newItem"
        class="mb-4 w-[420px]"
        placeholder="Добавить новую запись"
      />
      <a-button
        size="large"
        class="flex items-center justify-center w-10"
        @click="clearAndAddItem"
        :icon="h(PlusOutlined)"
      />
    </div>

    <ul v-for="item in optionList[listKey]">
      <li class="border p-4 rounded-md flex items-center justify-between" @click="() => $emit('update:modelValue', item)">
        <span>{{ item }}</span>
        <a-button
          :icon="h(DeleteOutlined)"
          class="flex items-center justify-center"
          @click="removeItemAndClearValue(item, modelValue)"
        />
      </li>
    </ul>

  </a-modal>
</template>
<script setup lang="ts">
import { ref, h } from 'vue'
import type { IModalToggle, ILsit } from '../types/SessionAssignmentType.ts'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useModalsList, useOptionList } from '../stores/SessionAssignmentStore'
import { storeToRefs } from 'pinia'

const { type, listKey, modelValue } = defineProps<{
  type: keyof IModalToggle
  listKey: keyof ILsit
  modelValue: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const store = useModalsList()
const { modals } = storeToRefs(store)
const { toggleModal } = store

const optionsData = useOptionList()
const { optionList } = storeToRefs(optionsData)
const { removeItem, addNewItem } = optionsData

const newItem = ref('')

const handleOption = (inputValue: string, option: any) => {
  return option.value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
}

const clearAndAddItem = () => {
  addNewItem(newItem.value, listKey)
  newItem.value = ''
}

const removeItemAndClearValue = (item: string, actualValue: string | null) => {
  if (actualValue !== null && actualValue === item) {
    emit('update:modelValue', null)
  }

  removeItem(item, listKey)
}
</script>
../stores/SessionAssignmentStore.js../types/SessionAssignmentType.js