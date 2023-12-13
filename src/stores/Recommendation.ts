import { defineStore } from 'pinia'


export const useRecommendationStore = defineStore('recommendationStore', {
    state: () => ({
      data: <string[]>[]
    }),
    actions:{
      setData(newData: string){
       this.data = [...this.data, newData]
      },

    }
  })