export interface IAfterAssignments {
    id:number
    medicinalProduct: string | null 
    receptionPath: string | null 
    dosesOfDrugsValue: number | null 
    dosesOfDrugs: string | null 
    sessionCount: boolean[] | null[]
    startAndEndDates: string[]
    dayCount: number
}

export interface IHomeTreatment{
    id: number
    medicinalProduct: string | null
    receptionPath: string | null 
    dosesOfDrugsValue: number | null
    dosesOfDrugs: string | null 
    frequencyOfAdmission: string | null
    startAndEndDates: string[] 
    dayCount: number
}
