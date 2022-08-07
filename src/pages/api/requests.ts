import axios from "axios";
import { IRequest } from "../../interfaces";

const URI: string = process.env.REACT_APP_API_HOST as string

export const getAllRequests = async () => {
    const response = await axios.get(`${URI}/request`)
    return response.data
}

export const getRequest = async (_id: string) => {
    const response = await axios.get(`${URI}/request/${_id}`)
    return response.data
}

export const createRequest = async (body: IRequest) => {
    const response = await axios.post(`${URI}/request`, body)
    return response.data
}