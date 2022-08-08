import { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { IPatient, IRequest } from '../../interfaces'
import { updateRequest } from '../../pages/api/requests'
import { getPatient, updatePatient } from '../../pages/api/patients'
import { useAuth0 } from '@auth0/auth0-react'
import { getRequest } from '../../pages/api/requests'
import BottomNav from '../Nav/BottomNav'
import { toast } from 'react-toastify'

function RequestInfo() {

    const param = useParams()
    const { user } = useAuth0()

    const defaultRequest = {
        patientId: "",
        requestType: "",
        requestStatus: "",
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
        createdBy: "",
        updatedBy: ""
    }

    const [request, setRequest] = useState<IRequest>(defaultRequest)


    const handleUpdate = async (status: string) => {
        setRequest({ ...request, requestStatus: status })
        const patientData: IPatient = await getPatient(request.patientId)
        patientData.requestHistory.map(history => {
            if (history.requestId === param?.id) history.requestStatus = status
        })
        request.requestStatus = status
        request.updatedBy = user?.email || ''

        const requestUpdated = await updatePatient(request.patientId, patientData)

        if (requestUpdated) updateRequest(param?.id || '', request)

    }

    const renderButton = (title: string, status: string) => {
        return <Button color='success' variant='contained' onClick={() => handleUpdate(status)}>{title}</Button>
    }

    const formRequest = () => {
        const { requestStatus, patientName, patientAge, condition, physicalExam, diagnose, prescription } = request
        const { inspection, palpation, auscultation, percussion } = physicalExam

        return (
            <div>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 2, maxWidth: 300, minWidth: 300 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField disabled label="Nombre" variant="outlined" value={patientName} />
                    <TextField disabled label="Edad" variant="outlined" value={patientAge} />

                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Padecimiento" variant="outlined" value={condition}
                        onChange={e => setRequest({ ...request, condition: e.target.value })} />
                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Inspección" variant="outlined" value={inspection}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, inspection: e.target.value } })} />
                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Palpación" variant="outlined" value={palpation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, palpation: e.target.value } })} />
                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Auscultación" variant="outlined" value={auscultation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, auscultation: e.target.value } })} />
                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Percusión" variant="outlined" value={percussion}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, percussion: e.target.value } })} />

                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Diagnostico" variant="outlined" value={diagnose}
                        onChange={e => setRequest({ ...request, diagnose: e.target.value })} />
                    <TextField disabled={requestStatus === 'OPEN' ? false : true} multiline label="Prescripción" variant="outlined" value={prescription}
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
        <div style={{ margin: '20px' }}>
            <fieldset>
                <legend>Tipo de consulta: <strong>{request.requestType}</strong></legend>
                {formRequest()}
            </fieldset>
            {request.requestStatus === 'OPEN' ? < BottomNav elements={[renderButton('Actualizar', 'OPEN'), renderButton('Cerrar', 'CLOSED')]} /> : ''}
            <div style={{ marginBottom: '60px' }}></div>
        </div>
    )
}

export default RequestInfo