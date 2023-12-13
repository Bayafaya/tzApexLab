<template>
  <a-form
    :model="homeTreatment"
    name="home"
    autocomplete="off"
    layout="vertical"
    :hideRequiredMark="true"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <h1 class="text-xl">Лечение на дому</h1>

    <section class="flex gap-3 items-end">
      <a-form-item
        label="Лекарственный препарат"
        name="medicinalProduct"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите препарат` }]"
      >
        <a-select
          v-model:value="homeTreatment.medicinalProduct"
          placeholder="Препараты"
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

    <section class="flex gap-3">
      <a-form-item
        label="Путь приема"
        name="receptionPath"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите путь приема` }]"
      >
        <a-select
          v-model:value="homeTreatment.receptionPath"
          placeholder="Путь приема"
          style="width: 300px"
          :options="optionList.receptionPathList.map((item) => ({ value: item }))"
          size="large"
        />
      </a-form-item>

      <div class="flex gap-3 items-end">
        <a-form-item
          label="Дозы препаратов"
          name="dosesOfDrugsValue"
          class="w-min"
          :rules="[{ required: true, message: `Пожалуйста вибирите дозу препарата` }]"
        >
        <a-input-number
            v-model:value="homeTreatment.dosesOfDrugsValue"
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
      </div>
    </section>

    <section class="flex gap-3 items-center flex-wrap">
      <div class="flex items-end gap-3">
        <a-form-item
          label="Кратность приёма"
          name="frequencyOfAdmission"
          class="w-min"
          :rules="[{ required: true, message: `Пожалуйста вибирите кратность приёма` }]"
        >
          <a-select
            v-model:value="homeTreatment.frequencyOfAdmission"
            placeholder="Кратность приёма"
            style="width: 300px"
            :options="optionList.frequencyOfAdmissionList.map((item) => ({ value: item }))"
            size="large"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center mb-6"
          :icon="h(MenuUnfoldOutlined)"
          @click="toggleModal('frequencyOfAdmissionModal')"
        />
      </div>

      <a-form-item
        label="Начало-Конец приёма"
        name="startAndEndDates"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите вибирите даты` }]"
      >
        <a-range-picker
          class="w-[320px]"
          size="large"
          v-model:value="homeTreatment.startAndEndDates"
          format="DD/MM/YYYY"
          value-format="DD/MM/YYYY"
          :placeholder="['Начало приёма', 'Конец приёма']"
        />
      </a-form-item>

      <span>Количество дней: {{ daysBetween }}</span>
    </section>

    <a-form-item>
      <a-button html-type="submit" class="w-[200px] mt-6" size="large">Добавить</a-button>
    </a-form-item>
  </a-form>

  <ui-label>Лечение на дому</ui-label>
  <div class="border min-h-[120px]  rounded p-6 w-full md:w-1/2">
    <ul class="divide-y">
       <li v-for="item in data" class="flex gap-8 flex-wrap px-2 py-8">
       <span>{{ item.medicinalProduct }}</span> 
       <span>{{ item.receptionPath }}</span> 
       <span>{{ item.dosesOfDrugsValue }} мг</span> 
       <span>{{ item.frequencyOfAdmission }}  утром и вечером </span> 
       <span>c {{ item.startAndEndDates[0] }} по {{ item.startAndEndDates[1] }}</span> 
       <span>{{ item.dayCount }} дней</span> 
      </li>
    </ul>
  </div>
  <modal-page type="medicinalProductModal" listKey="medicinalProductList" v-model="homeTreatment.medicinalProduct"/>
  <modal-page type="dosesOfDrugsModal" listKey="dosesOfDrugsList" v-model="homeTreatment.dosesOfDrugs"/>
  <modal-page type="frequencyOfAdmissionModal" listKey="frequencyOfAdmissionList" v-model="homeTreatment.frequencyOfAdmission"/>
</template>
<script setup lang="ts">

import UiLabel from './UiLabel.vue'
import { h } from 'vue'
import {  reactive,computed } from 'vue'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { IHomeTreatment } from '../types/AfterAssignmentsType'
import { useOptionList, useModalsList } from '@/stores/SessionAssignmentStore'
import { useHomeTreatmentStore } from '@/stores/HomeTreatmentStore'
import { storeToRefs } from 'pinia'
import ModalPage from './ModalPage.vue'



const homeTreatment = reactive<IHomeTreatment>({
  id: Date.now(),
  medicinalProduct: null,
  receptionPath: null,
  dosesOfDrugsValue: null,
  dosesOfDrugs: null,
  frequencyOfAdmission: null,
  startAndEndDates: [],
  dayCount: 0
})

const daysBetween = computed(()=>{
  if(homeTreatment.startAndEndDates.length > 1){
    return daysBetweenDates(homeTreatment.startAndEndDates[0],homeTreatment.startAndEndDates[1])
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

const optionsData = useOptionList()
const { optionList } = storeToRefs(optionsData)

const store = useHomeTreatmentStore()
const { data } = storeToRefs(store)
const { setData } = store

const { toggleModal } = useModalsList()

const onFinish = (values: any) => {  
  const toSetCountDay = {...homeTreatment}
  toSetCountDay.dayCount = daysBetweenDates(toSetCountDay.startAndEndDates[0],toSetCountDay.startAndEndDates[1])
  setData({...toSetCountDay})
  homeTreatment.id = Date.now(),
  homeTreatment.medicinalProduct = null,
  homeTreatment.receptionPath = null,
  homeTreatment.dosesOfDrugsValue = null,
  homeTreatment.dosesOfDrugs = null,
  homeTreatment.frequencyOfAdmission = null,
  homeTreatment.startAndEndDates = [],
  homeTreatment.dayCount = 0
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:')
}

</script>
