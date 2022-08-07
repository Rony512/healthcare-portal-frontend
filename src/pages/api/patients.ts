import axios from "axios";
import { IPatient } from "../../interfaces";

const URI: string = process.env.REACT_APP_API_HOST as string

export const getAllPatients = async () => {
    const response = await axios.get(`${URI}/patient`)
    return response.data
}

export const getPatient = async (id: string) => {
    const response = await axios.get(`${URI}/patient/${id}`)
    return response.data
}

export const createPatient = async (body: IPatient) => {
    const response = await axios.post(`${URI}/patient`, body)
    return response.data
}

export const updatePatient = async (_id: string, body: IPatient) => {
    console.log(body)
    const response = await axios.patch(`${URI}/patient/${_id}`, body, )
    return response.data
}
