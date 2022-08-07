import axios from "axios";

const URI:string = process.env.REACT_APP_API_HOST as string

export const getAllRequests = async () => {
    const response = await axios.get(`${URI}/request`)
    return response.data
}