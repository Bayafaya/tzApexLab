import type { IHomeTreatment } from '@/types/AfterAssignmentsType'
import { defineStore } from 'pinia'


export const useHomeTreatmentStore = defineStore('homeTreatment', {
    state: () => ({
      data: <IHomeTreatment[]>[]
    }),
    actions:{
      setData(newData: IHomeTreatment){
       this.data = [...this.data, newData]
      },
      removeItemFromData(id: number){
        this.data = [...this.data].filter((item) => item.id !== id)
      }
    }
  })