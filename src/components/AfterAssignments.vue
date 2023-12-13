<template>
  <a-form
    :model="afterAssignments"
    name="after"
    autocomplete="off"
    layout="vertical"
    :hideRequiredMark="true"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <h1 class="text-xl">Назначения после сеанса</h1>

    <section class="flex gap-3 items-end">
      <a-form-item
        label="Лекарственный препарат"
        name="medicinalProduct"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите препарат` }]"
      >
        <a-select
          v-model:value="afterAssignments.medicinalProduct"
          placeholder="Спр.Препараты"
          style="width: 300px"
          :options="optionList.medicinalProductList.map((item) => ({ value: item }))"
          size="large"
          
        />
      </a-form-item>

      <a-button
        size="large"
        class="flex items-center justify-center mb-6"
        :icon="h(MenuUnfoldOutlined)"
        @click="toggleModal('medicinalProductModal')"
      />
    </section>

    <div class="flex gap-3 items-end">
      <a-form-item
        label="Путь приема"
        name="receptionPath"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите путь приема` }]"
      >
        <a-select
          v-model:value="afterAssignments.receptionPath"
          placeholder="Путь приема"
          style="width: 300px"
          :options="optionList.receptionPathList.map((item) => ({ value: item }))"
          size="large"
          
        />
      </a-form-item>

      <section class="flex gap-3 items-end">
        <a-form-item
          label="Дозы препаратов"
          name="dosesOfDrugsValue"
          class="w-min"
          :rules="[{ required: true, message: `Пожалуйста вибирите дозу препарата` }]"
        >
          <a-input-number
            v-model:value="afterAssignments.dosesOfDrugsValue"
            placeholder="Дозы препаратов"
            style="width: 300px"
            size="large"
            min="0"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center mb-6"
          :icon="h(MenuUnfoldOutlined)"
          @click="toggleModal('dosesOfDrugsModal')"
        />
      </section>
    </div>

    <section>
      <ui-label>Номера сеансов :</ui-label>

      <ul class="flex gap-3 mt-3">
        <li v-for="(item, index) in afterAssignments.sessionCount">
          <input
            type="checkbox"
            @change="(e) => handleCheckBox(e, index + 1)"
            :name="(index + 1).toString()"
            :id="(index + 1).toString()"
            class="hidden peer"
          />
          <label
            :for="(index + 1).toString()"
            class="cursor-pointer inline-flex items-center justify-between w-full py-3 px-4 text-black peer-checked:text-white bg-white border-2 peer-checked:bg-blue-500"
          >
            {{ index + 1 }}
          </label>
        </li>
      </ul>
    </section>

    <section class="flex gap-3 items-center">
      <a-form-item
        name="startAndEndDates"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите даты` }]"
      >
        <a-range-picker
          class="w-[320px]"
          size="large"
          format="DD/MM/YYYY"
          value-format="DD/MM/YYYY"
          v-model:value="afterAssignments.startAndEndDates"
          :placeholder="['Начало приёма', 'Конец приёма']"
        />
      </a-form-item>

      <span class="mb-6">Количество сеансов: {{ daysBetween }}</span>
    </section>

    <a-form-item>
      <a-button html-type="submit" class="w-[200px] mt-6" size="large"> Сформировать </a-button>
    </a-form-item>
  </a-form>
  <ui-label>Список назначений после сеансов</ui-label>
  <section>
    <a-table :dataSource="data" :columns="columns" :pagination="false" class="w-full md:w-1/2">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'dosesOfDrugsValue'">
          {{ record.dosesOfDrugsValue }} {{ record.dosesOfDrugs }}
        </template>
        <template v-if="column.dataIndex === 'start'">
          {{ record.startAndEndDates[0] }}
        </template>
        <template v-else-if="column.dataIndex === 'end'">
          {{ record.startAndEndDates[1] }}
        </template>
        <template v-else-if="column.dataIndex === 'sessionCount'" class="relative">
          <div class=" flex items-center h-full">
            <li class="m-0" v-for="(item, index) in record.sessionCount">
              <span v-if="item">{{ index + 1 }}, </span>
            </li>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'days'" class="text-center">
          {{
           record.dayCount
          }}
        </template>
        <template v-else-if="column.dataIndex === 'remove'">
          <a-button @click="removeItemFromData(record.id)" :icon="h(DeleteOutlined)" class="flex items-center justify-center"/>
        </template>
      </template>
    </a-table>
  </section>

  <modal-page type="medicinalProductModal" listKey="medicinalProductList" v-model="afterAssignments.medicinalProduct"/>
  <modal-page type="dosesOfDrugsModal" listKey="dosesOfDrugsList" v-model="afterAssignments.dosesOfDrugs"/>
</template>

<script setup lang="ts">
import UiLabel from './UiLabel.vue'
import { h, reactive, computed, ref } from 'vue'
import { MenuUnfoldOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type { IAfterAssignments } from '../types/AfterAssignmentsType'
import { useAfterAssignmentStore } from '../stores/AfterAssignmentsStore'
import { storeToRefs } from 'pinia'
import {  useModalsList, useOptionList } from '../stores/SessionAssignmentStore'
import ModalPage from './ModalPage.vue'


const store = useAfterAssignmentStore()
const { data } = storeToRefs(store)
const { setData, removeItemFromData } = store

const { toggleModal } = useModalsList()

const optionsData = useOptionList()
const { optionList } = storeToRefs(optionsData)


const afterAssignments = reactive<IAfterAssignments>({
  id: Date.now(),
  medicinalProduct: null,
  receptionPath: null,
  dosesOfDrugsValue: null,
  dosesOfDrugs: null,
  sessionCount: new Array(6).fill(null),
  startAndEndDates: [],
  dayCount: 0
})

const columns = [
  {
    title: 'Лекарственный препарат',
    dataIndex: 'medicinalProduct',
    key: 'medicinalProduct'
  },
  {
    title: 'Путь приема',
    dataIndex: 'receptionPath',
    key: 'receptionPath'
  },
  {
    title: 'Дозировка',
    dataIndex: 'dosesOfDrugsValue',
    key: 'dosesOfDrugsValue'
  },
  {
    title: 'Начало приёма',
    dataIndex: 'start',
    key: 'start'
  },
  {
    title: 'Конец приёма',
    dataIndex: 'end',
    key: 'end'
  },
  {
    title: 'Номер сеанса',
    dataIndex: 'sessionCount',
    key: 'sessionCount'
  },
  {
    title: 'Дней',
    dataIndex: 'days',
    key: 'days'
  },
  {
    title: '',
    dataIndex: 'remove',
    key: 'remove'
  }
]

const daysBetween = computed(()=>{
  if(afterAssignments.startAndEndDates.length > 1){
    return daysBetweenDates(afterAssignments.startAndEndDates[0],afterAssignments.startAndEndDates[1])
  }
  else{
    return 0
  }
})


function daysBetweenDates(date1: string, date2: string): number  {

const [day1, month1, year1] = date1.split('/').map(Number);
const [day2, month2, year2] = date2.split('/').map(Number);

const firstDate = new Date(year1, month1 - 1, day1);
const secondDate = new Date(year2, month2 - 1, day2);


if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
  console.error('Invalid date format');
  return 0;
}

const timeDifference = secondDate.getTime() - firstDate.getTime();


const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

return daysDifference;
}

const onFinish = (values: any) => {

  const toSetCountDay = {...afterAssignments}
  toSetCountDay.dayCount = daysBetweenDates(toSetCountDay.startAndEndDates[0],toSetCountDay.startAndEndDates[1])
  setData({...toSetCountDay})
  afterAssignments.id =  Date.now(),
  afterAssignments.medicinalProduct = null
  afterAssignments.dosesOfDrugsValue = null,
  afterAssignments.receptionPath = null
  afterAssignments.dosesOfDrugs = null
  afterAssignments.sessionCount = new Array(6).fill(null),
  afterAssignments.startAndEndDates = []
  for (let index = 0; index < 6; index++) {
    const checkbox = document.getElementById(`${(index + 1).toString()}`) as HTMLInputElement | null;
    if (checkbox) {
    checkbox.checked = false;
    }
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:')
}

const handleCheckBox = (e: Event, index: number) => {
  afterAssignments.sessionCount[index - 1] = (e.target as HTMLInputElement).checked
}

</script>
