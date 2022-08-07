import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { IRequestDetailProps, IRequest } from '../../interfaces'



const RequestDetail = ({ _id, patient }: IRequestDetailProps) => {

    const defaultRequest = {
        patientId: "",
        requestType: "",
        patientName: "",
        patientAge: 0,
        condition: "",
        physicalExam: {
            inspection: "",
            palpation: "",
            auscultation: "",
            percussion: ""
        },
        diagnose: "",
        prescription: "",
        createdBy: ""
    }

    const [request, setRequest] = useState<IRequest>(defaultRequest)
    const { patientName, patientAge } = patient

    console.log(patientName, patientAge)

    return (
        <div>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 2 } }}
                noValidate
                autoComplete="off"
            >
                <TextField type='' label="Nombre" variant="outlined" />

                <TextField type='' label="Apellido" variant="outlined" />

                <TextField type='number' label="Edad" variant="outlined" />

                <TextField type='number' label="Peso (kg)" variant="outlined" />

                <TextField type='number' label="Altura (cm)" variant="outlined" />

                <TextField type='number' label="Teléfono 1" variant="outlined" />

                <TextField type='number' label="Teléfono 2" variant="outlined" />
            </Box>
        </div>
    )
}

export default RequestDetail