import { defineStore } from 'pinia'
import type { ISessionAssignment,IModalToggle, ILsit } from '../types/SessionAssignmentType.js'


export const useSessionAssignmentStore = defineStore('sessionAssignment', {
  state: () => ({
    data:<ISessionAssignment>{
      programme: null,
      dialyzer: null,
      concentrator: null,
      valueOfConcentrator: null,
      typeOfInjection: null,
      needleSize: null,
      needleType: null,
      catheterSize: null,
      catheterType: null,
      bicarbonate: null,
      bicarbonateType: 'граммов',
      dryWeight: null,
      anticoagulation: null,
      anticoagulationValue: null
    }
  }),
  actions:{
    setData(newData: ISessionAssignment){
     this.data = {...newData}
    }
  }
})

export const useModalsList = defineStore('sessionAssignmentModals', {
  state: () => ({
    modals:<IModalToggle>{
      dialyzersModal: false,
      concentratorModal: false,
      needleModal: false,
      needleTypeModal: false,
      catheterModal: false,
      catheterTypeModal: false,
      anticoagulationModal: false,
      bicarbonateTypeModal: false,
      medicinalProductModal: false,
      dosesOfDrugsModal: false,
      frequencyOfAdmissionModal: false
    }
  }),
  actions:{
    toggleModal(keyName: keyof IModalToggle){
     this.modals[keyName] = !this.modals[keyName]
    }
  }
})

export const useOptionList = defineStore('sessionAssignmentOptions', {
  state: () => ({
    optionList:<ILsit>{
      dialyzersList: ['Диализатор 1', 'Диализатор 2'],
      concentratorList: ['Концентратор 1', 'Концентратор 2'],
      needleList:['Игла размер №1', 'Игла размер №2'],
      catheterList:['Катетер размер №1', 'Катетер размер №2'],
      needleTypeList:['Венозные', 'Артериальные'],
      catheterTypeList:['Катетер Фолея','Катетер Малеко','Катетер Пеццера','Катетер Тиманна','Катетер Нелатона'],
      anticoagulationList:['Антикоагуляция №1', 'Антикоагуляция №2'],
      bicarbonateTypeList:['граммов','литров'],
      medicinalProductList: ['Лекарственный препарат №1','Лекарственный препарат №2'],
      receptionPathList: ['Перорально','Подкожно','Подкожно'],
      dosesOfDrugsList: ['мкг','мл','мг/кг'],
      frequencyOfAdmissionList: ['1 рад в день','2 раза в день','3 раза в день'],
    }
  }),
  actions:{
    removeItem(itemToRemove: string, keyName: keyof ILsit){
      this.optionList[keyName] = [...this.optionList[keyName]].filter((item) => item !== itemToRemove)
    },
    addNewItem(newValue: string, keyName: keyof ILsit){
      this.optionList[keyName] = [...this.optionList[keyName], newValue]
      
    }
  }
})



