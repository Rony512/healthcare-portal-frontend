//Patients

export interface IRequestHistory {
    date: string;
    title: string;
    requestId: string;
}

export interface IPatient {
    patientName: string;
    patientLastName: string;
    patientAge: number;
    patientWeight: number;
    patientHeight: number;
    patientAllergies: string[];
    requestHistory: IRequestHistory[];
    patientMobile_1: number;
    patientMobile_2: number;
    createdBy: string;
    updatedBy: string;
}


//Requests
export interface IRequestDetailProps {
    _id: string;
    patientData: IPatient;
}

export interface IPhysicalExam {
    inspection: string;
    palpation: string;
    auscultation: string;
    percussion: string;
}

export interface IRequest {
    patientId: string;
    requestType: string;
    patientName: string;
    patientAge: number;
    condition: string;
    physicalExam: IPhysicalExam;
    diagnose: string;
    prescription: string;
    createdBy: string;
}

// Components
export interface ISimpleCard {
    type: string;
    total: number;
    path: string;
    loading: boolean;
}

export interface Element {
    elements: any[]
}