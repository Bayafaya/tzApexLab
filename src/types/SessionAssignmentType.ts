export interface ISessionAssignment {
    programme: string | null 
    dialyzer: string | null
    concentrator: string | null
    valueOfConcentrator: number | null 
    typeOfInjection: string | null 
    needleSize: string | null
    needleType: string | null
    catheterSize: string | null
    catheterType: string | null
    bicarbonate: number | null 
    bicarbonateType: string | null 
    dryWeight: number | null 
    anticoagulation: string | null
    anticoagulationValue: number | null 
}

export interface IModalToggle {
    dialyzersModal: boolean
    concentratorModal: boolean
    needleModal: boolean
    needleTypeModal: boolean
    catheterModal: boolean
    catheterTypeModal: boolean
    anticoagulationModal: boolean
    bicarbonateTypeModal: boolean
    medicinalProductModal: boolean
    dosesOfDrugsModal: boolean
    frequencyOfAdmissionModal: boolean
}

export interface ILsit{
    dialyzersList: string[]
    concentratorList: string[]
    needleList: string[]
    catheterList:string[]
    needleTypeList:string[]
    catheterTypeList:string[]
    anticoagulationList:string[]
    bicarbonateTypeList:string[]
    medicinalProductList: string[]
    receptionPathList: string[]
    dosesOfDrugsList: string[]
    frequencyOfAdmissionList: string[],
}