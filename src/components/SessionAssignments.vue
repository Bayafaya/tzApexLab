<template>
  <!-- head -->
  <a-form
    :model="sessionAssignment"
    name="start"
    autocomplete="off"
    layout="vertical"
    :hideRequiredMark="true"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <h1 class="text-xl">Назначения сеанса гемодиализа</h1>

    <section>
      <a-form-item label="Программа аппарата" name="programme">
        <a-radio-group v-model:value="sessionAssignment.programme" size="large">
          <a-radio-button value="HD">HD</a-radio-button>
          <a-radio-button value="HDF">HDF</a-radio-button>
          <a-radio-button value="UF">UF</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </section>

    <section class="flex gap-3 items-end">
      <a-form-item
        label="Диализатор"
        name="dialyzer"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите диализатор` }]"
      >
        <a-select
          v-model:value="sessionAssignment.dialyzer"
          placeholder="Спр.Диализаторы"
          style="width: 300px"
          :options="optionList.dialyzersList.map((item) => ({ value: item }))"
          size="large"
        />
      </a-form-item>
      <a-button
        size="large"
        class="flex items-center justify-center mb-6"
        :icon="h(MenuUnfoldOutlined)"
        @click="toggleModal('dialyzersModal')"
      />
    </section>

    <section class="flex gap-3 items-end">
      <a-form-item
        label="Концентратор"
        name="concentrator"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста вибирите концентратор` }]"
      >
        <a-select
          v-model:value="sessionAssignment.concentrator"
          placeholder="Спр.Концентраторы"
          style="width: 300px"
          :options="optionList.concentratorList.map((item) => ({ value: item }))"
          size="large"
        />
      </a-form-item>

      <a-button
        size="large"
        class="flex items-center justify-center mr-4 mb-6"
        :icon="h(MenuUnfoldOutlined)"
        @click="toggleModal('concentratorModal')"
      />

      <a-form-item label="Объем л." name="dialyzer" class="w-min">
        <a-input-number
          :min="0"
          v-model:value="sessionAssignment.valueOfConcentrator"
          addon-after="Л"
          class="w-24 h-min"
          size="large"
        />
      </a-form-item>
    </section>

    <a-form-item label="Тип инъекции" name="typeOfInjection">
      <a-radio-group v-model:value="sessionAssignment.typeOfInjection" size="large">
        <a-radio-button value="Игла">Игла</a-radio-button>
        <a-radio-button value="Катетер">Катетер</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <section class="grid grid-cols-[repeat(2,212px)] gap-4">

      <div class="flex gap-3">
        <a-form-item
          :rules="[
            {
              required: sessionAssignment.typeOfInjection === 'Игла' ? true : false,
              message: `Пожалуйста вибирите размер иглы`
            }
          ]"
          name="needleSize"
          class="w-[160px]"
        >
          <a-select
            v-model:value="sessionAssignment.needleSize"
            placeholder="Спр.Иглы"
            style="width: 160px"
            :options="optionList.needleList.map((item) => ({ value: item }))"
            size="large"
            :disabled="sessionAssignment.typeOfInjection !== 'Игла' ? true : false"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center"
          :icon="h(MenuUnfoldOutlined)"
          :disabled="sessionAssignment.typeOfInjection !== 'Игла' ? true : false"
          @click="toggleModal('needleModal')"
        />
      </div>

      <div class="flex gap-3">
        <a-form-item
          :rules="[
            {
              required: sessionAssignment.typeOfInjection === 'Игла' ? true : false,
              message: `Пожалуйста вибирите тип иглы`
            }
          ]"
          name="needleType"
          class="w-[160px]"
        >
          <a-select
            v-model:value="sessionAssignment.needleType"
            placeholder="Спр. Типы иглы"
            style="width: 160px"
            :options="optionList.needleTypeList.map((item) => ({ value: item }))"
            size="large"
            :disabled="sessionAssignment.typeOfInjection !== 'Игла' ? true : false"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center"
          :icon="h(MenuUnfoldOutlined)"
          :disabled="sessionAssignment.typeOfInjection !== 'Игла' ? true : false"
          @click="toggleModal('needleTypeModal')"
        />
      </div>

      <div class="flex gap-3">
        <a-form-item
          :rules="[
            {
              required: sessionAssignment.typeOfInjection === 'Катетер' ? true : false,
              message: `Пожалуйста вибирите размер катетера`
            }
          ]"
          name="catheterSize"
          class="w-[160px]"
        >
          <a-select
            v-model:value="sessionAssignment.catheterSize"
            placeholder="Спр. Катетеры"
            style="width: 160px"
            :options="optionList.catheterList.map((item) => ({ value: item }))"
            size="large"
            :disabled="sessionAssignment.typeOfInjection !== 'Катетер' ? true : false"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center"
          :icon="h(MenuUnfoldOutlined)"
          :disabled="sessionAssignment.typeOfInjection !== 'Катетер' ? true : false"
          @click="toggleModal('catheterModal')"
        />
      </div>

      <div class="flex gap-3">
        <a-form-item
          :rules="[
            {
              required: sessionAssignment.typeOfInjection === 'Катетер' ? true : false,
              message: `Пожалуйста вибирите тип катетера`
            }
          ]"
          name="catheterType"
          class="w-[160px]"
        >
          <a-select
            v-model:value="sessionAssignment.catheterType"
            placeholder="Спр. Типы катетеров"
            style="width: 160px"
            :options="optionList.catheterTypeList.map((item) => ({ value: item }))"
            size="large"
            :disabled="sessionAssignment.typeOfInjection !== 'Катетер' ? true : false"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center"
          :icon="h(MenuUnfoldOutlined)"
          :disabled="sessionAssignment.typeOfInjection !== 'Катетер' ? true : false"
          @click="toggleModal('catheterTypeModal')"
        />
      </div>
    </section>

    <div class="flex gap-8 items-start flex-wrap">

      <section class="flex gap-3 items-end">
        <a-form-item
          label="Бикарбонат"
          name="bicarbonate"
          class="w-min"
          :rules="[{ required: true, message: `Пожалуйста вибирите количество бикарбоната` }]"
        >
          <a-input-number
            :min="0"
            class="w-[160px]"
            v-model:value="sessionAssignment.bicarbonate"
            size="large"
            addon-after="гр/л"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center mb-6"
          :icon="h(MenuUnfoldOutlined)"
          @click="toggleModal('bicarbonateTypeModal')"
        />
      </section>

      <a-form-item
        label="Сухой Вес пациента"
        name="dryWeight"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста напишите сухой вес пациента` }]"
      >
        <a-input-number
          :min="0"
          v-model:value="sessionAssignment.dryWeight"
          addon-after="кг"
          class="w-[160px]"
          placeholder="xxx"
          size="large"
        />
      </a-form-item>

      <section class="flex gap-3 items-end">
        <a-form-item
          label="Антикоагуляция"
          name="anticoagulation"
          class="w-[180px]"
          :rules="[{ required: true, message: `Вибирите наименование` }]"
        >
          <a-select
            v-model:value="sessionAssignment.anticoagulation"
            :options="optionList.anticoagulationList.map((item) => ({ value: item }))"
            class="w-[180px]"
            size="large"
            placeholder="Наименование"
          />
        </a-form-item>
        <a-button
          size="large"
          class="flex items-center justify-center mb-6"
          :icon="h(MenuUnfoldOutlined)"
          @click="toggleModal('anticoagulationModal')"
        />
      </section>

      <a-form-item
        label="Сухой Вес пациента"
        name="dryWeight"
        class="w-min"
        :rules="[{ required: true, message: `Пожалуйста напишите сухой вес пациента` }]"
      >
        <a-input-number
          :min="0"
          v-model:value="sessionAssignment.anticoagulationValue"
          addon-after="ед"
          class="w-[180px]"
          placeholder="xxx"
          size="large"
        />
      </a-form-item>
    </div>

    <a-form-item>
      <a-button html-type="submit" class="w-[200px] mt-6" size="large">Сформировать сеанс</a-button>
    </a-form-item>

    <div class="border min-h-[120px] w-full md:w-1/2 rounded p-6">
      <h2 class="text-lg font-medium">Назначения сеанса гемодиализа</h2>
  
      <ul class="space-y-3">

        <li class="flex flex-wrap items-center gap-2">
          <MedicineBoxOutlined />
          <span>Программа:</span>
          <span class="font-bold">{{ data.programme }}</span>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <SubnodeOutlined />
          <span>Диализатор :</span>
          <span class="font-bold">{{ data.dialyzer }}</span>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <ExperimentOutlined />
          <span>Концентратор :</span>
          <span class="font-bold">{{ data.concentrator }}</span>
          <div>
            Объём: <span class="font-bold">{{ data.valueOfConcentrator }} л.</span>
          </div>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <img src="../assets/needle.svg" alt="needle" class="h-4" />
          <span>Игла/Катетер :</span>
          <span class="font-bold">{{
            data.typeOfInjection === 'Игла' ? data.needleSize : data.catheterSize
          }}</span>
          <div>
            Тип:
            <span class="font-bold">{{
              data.typeOfInjection === 'Игла' ? data.needleType : data.catheterType
            }}</span>
          </div>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <img src="../assets/flask.svg" alt="flask" class="h-4" />
          <span>Бикарбонат :</span>
          <span class="font-bold">{{ data.bicarbonate }} {{ data.bicarbonateType }}</span>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <img src="../assets/scales.svg" alt="notepad" class="h-4" />
          <span>Сухой вес :</span>
          <span class="font-bold">{{ data.dryWeight }} кг</span>
        </li>

        <li class="flex flex-wrap items-center gap-2">
          <img src="../assets/flask.svg" alt="notepad" class="h-4" />
          <span>Антикоагуляция :</span>
          <span class="font-bold">{{ data.anticoagulation }}</span>
          <div>
            Объём: <span class="font-bold">{{ data.anticoagulationValue }} eд.</span>
          </div>
        </li>
        
      </ul>

    </div>

    <modal-page type="dialyzersModal" listKey="dialyzersList" v-model="sessionAssignment.dialyzer"/>
    <modal-page type="concentratorModal" listKey="concentratorList" v-model="sessionAssignment.concentrator"/>
    <modal-page type="needleModal" listKey="needleList" v-model="sessionAssignment.needleSize"/>
    <modal-page type="needleTypeModal" listKey="needleTypeList" v-model="sessionAssignment.needleType"/>
    <modal-page type="catheterModal" listKey="catheterList" v-model="sessionAssignment.catheterSize"/>
    <modal-page type="catheterTypeModal" listKey="catheterTypeList" v-model="sessionAssignment.catheterType"/>
    <modal-page type="anticoagulationModal" listKey="anticoagulationList" v-model="sessionAssignment.anticoagulation"/>
    <modal-page type="bicarbonateTypeModal" listKey="bicarbonateTypeList" v-model="sessionAssignment.bicarbonateType"/>

  </a-form>
</template>
<script setup lang="ts">
import {  h, reactive } from 'vue'
import type { ISessionAssignment } from '../types/SessionAssignmentType.ts'
import { useSessionAssignmentStore, useModalsList, useOptionList } from '../stores/SessionAssignmentStore'
import {
  MenuUnfoldOutlined,
  MedicineBoxOutlined,
  SubnodeOutlined,
  ExperimentOutlined,
} from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import ModalPage from './ModalPage.vue'



const store = useSessionAssignmentStore()
const { data } = storeToRefs(store)
const { setData } = store

const { toggleModal } = useModalsList()

const optionsData = useOptionList()
const { optionList } = storeToRefs(optionsData)


const sessionAssignment = reactive<ISessionAssignment>({
  programme: 'HD',
  dialyzer: null,
  concentrator: null,
  valueOfConcentrator: 0,
  typeOfInjection: 'Игла',
  needleSize: null,
  needleType: null,
  catheterSize: null,
  catheterType: null,
  bicarbonate: 0,
  bicarbonateType: 'граммов',
  dryWeight: 0,
  anticoagulation: null,
  anticoagulationValue: 0
})


const onFinish = (values: any) => {
  console.log('Success')
  setData(sessionAssignment)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:')
}

</script>
