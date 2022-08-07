import { Box, TextField } from '@mui/material'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IRequest } from '../../interfaces'

import { getRequest } from '../../pages/api/requests'

function RequestInfo() {

    const param = useParams()

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

    const formRequest = () => {


        const { patientName, patientAge, condition, physicalExam, diagnose, prescription } = request
        const { inspection, palpation, auscultation, percussion } = physicalExam

        return (
            <div>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 2 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField disabled label="Nombre" variant="outlined" value={patientName} />

                    <TextField disabled label="Nombre" variant="outlined" value={patientAge} />


                    <TextField disabled fullWidth multiline label="Padecimiento" variant="outlined" value={condition}
                        onChange={e => setRequest({ ...request, condition: e.target.value })} />

                    <TextField disabled multiline label="Inspección" variant="outlined" value={inspection}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, inspection: e.target.value } })} />
                    <TextField disabled multiline label="Palpación" variant="outlined" value={palpation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, palpation: e.target.value } })} />
                    <TextField disabled multiline label="Auscultación" variant="outlined" value={auscultation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, auscultation: e.target.value } })} />
                    <TextField disabled multiline label="Percusión" variant="outlined" value={percussion}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, percussion: e.target.value } })} />

                    <TextField disabled fullWidth multiline label="Diagnostico" variant="outlined" value={diagnose}
                        onChange={e => setRequest({ ...request, diagnose: e.target.value })} />
                    <TextField disabled fullWidth multiline label="Prescripción" variant="outlined" value={prescription}
                        onChange={e => setRequest({ ...request, prescription: e.target.value })} />
                </Box>
            </div >
        )
    }


    useEffect(() => {
        if (param?.id) {
            getRequest(param.id).then(response => {
                setRequest(response)
            })
        }
    }, [param.id])


    return (
        <div style={{margin:'20px'}}>
            <fieldset>
                <legend>Tipo de consulta: <strong>{request.requestType}</strong></legend>
                {formRequest()}
            </fieldset>
        </div>
    )
}

export default RequestInfo