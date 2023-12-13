import type { IAfterAssignments } from '@/types/AfterAssignmentsType'
import { defineStore } from 'pinia'


export const useAfterAssignmentStore = defineStore('afterAssignment', {
    state: () => ({
      data: <IAfterAssignments[]>[]
    }),
    actions:{
      setData(newData: IAfterAssignments){
       this.data = [...this.data, newData]
      },
      removeItemFromData(id: number){
        this.data = [...this.data].filter((item) => item.id !== id)
      },
 
    }
  })