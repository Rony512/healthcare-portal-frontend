import { Box, Button, Chip, Paper, styled, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import List from '../Layouts/List'
import BottomNav from '../Nav/BottomNav'
import Loading from '../Feedback/Loading'
import RequestDetail from '../Requests/RequestDetail'

//Interfaces
import { IPatient } from '../../interfaces'

//functions
import { createPatient, getPatient, updatePatient } from '../../pages/api/patients'

const PatientDetail = () => {
    const param = useParams()

    const { user } = useAuth0()

    const patientDefault = {
        patientName: "",
        patientLastName: "",
        patientAge: 0,
        patientWeight: 0,
        patientHeight: 0,
        patientAllergies: [],
        requestHistory: [],
        patientMobile_1: 0,
        patientMobile_2: 0,
        createdBy: '',
        updatedBy: ''
    }

    const [allergie, setAllergie] = useState('')
    const [patientId, setPatientId] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const [loading, setLoading] = useState(true)
    const [patient, setPatient] = useState<IPatient>(patientDefault)
    const navigate = useNavigate()

    const handleRemoveAllergie = (allergieToDelete: string) => () => {
        setPatient({ ...patient, patientAllergies: [...patient.patientAllergies].filter(allergie => allergie !== allergieToDelete) })
    };

    const handleAddAllergie = (allergie: string) => {
        setPatient({ ...patient, patientAllergies: [...patient.patientAllergies, allergie] })
        setAllergie('')
    }

    const handleCreatePatient = async (patientData: IPatient) => {
        setDisableButton(true)
        const createdBy: string = user?.email || ''
        patientData.createdBy = createdBy
        const response = await createPatient(patient)
        if (response) {
            console.log(response)
            setDisableButton(false)
            navigate(`/patients/${response?._id}`)
        }
    }

    const handleUpdatePatient = async (patientData: IPatient) => {
        setDisableButton(true)
        const updatedBy: string = user?.email || ''
        patientData.updatedBy = updatedBy
        const response = await updatePatient(patientId, patient)

        if (response) setDisableButton(false)
    }

    const renderButton = (type: string = '') => {
        return type === 'new' ?
            <Button variant='contained' color='success' disabled={disableButton} onClick={() => handleCreatePatient(patient)}>Guardar</Button> :
            <Button variant='contained' color='success' disabled={disableButton} onClick={() => handleUpdatePatient(patient)}>Actualizar</Button>
    }

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const elements = [
        renderButton(param?.id),
        param?.id === 'new' ? '' : <RequestDetail _id={param?.id || ''} patientData={patient} />
    ]

    const renderPage = () => {
        const {
            patientName,
            patientLastName,
            patientAge,
            patientWeight,
            patientHeight,
            patientMobile_1,
            patientMobile_2 } = patient

        return (
            <div>
                <Box sx={{ '& > :not(style)': { m: 2 } }}>
                    <TextField type='' label="Nombre" variant="outlined" value={patientName}
                        onChange={e => setPatient({ ...patient, patientName: e.target.value })} />

                    <TextField type='' label="Apellido" variant="outlined" value={patientLastName}
                        onChange={e => setPatient({ ...patient, patientLastName: e.target.value })} />

                    <TextField type='number' label="Edad" variant="outlined" value={patientAge.toString()}
                        onChange={e => setPatient({ ...patient, patientAge: parseInt(e.target.value) })} />

                    <TextField type='number' label="Peso (kg)" variant="outlined" value={patientWeight.toString()}
                        onChange={e => setPatient({ ...patient, patientWeight: parseInt(e.target.value) })} />

                    <TextField type='number' label="Altura (cm)" variant="outlined" value={patientHeight.toString()}
                        onChange={e => setPatient({ ...patient, patientHeight: parseInt(e.target.value) })} />

                    <TextField type='number' label="Teléfono 1" variant="outlined" value={patientMobile_1.toString()}
                        onChange={e => setPatient({ ...patient, patientMobile_1: parseInt(e.target.value) })} />

                    <TextField type='number' label="Teléfono 2" variant="outlined" value={patientMobile_2.toString()}
                        onChange={e => setPatient({ ...patient, patientMobile_2: parseInt(e.target.value) })} />


                    <Paper
                        sx={{ listStyle: 'none', p: 1, m: 1 }}
                        elevation={3}
                        component="ul"
                    >
                        <TextField
                            value={allergie}
                            onKeyDown={e => e.key === 'Enter' ? handleAddAllergie(allergie) : ''}
                            type='text'
                            label="Alergias"
                            variant="outlined"
                            onChange={e => setAllergie(e.target.value)}
                            helperText="Presiona Enter para agregar"
                        />
                        <ListItem>
                            {patient.patientAllergies.map((data, index) => {
                                return (
                                    <Chip key={index}
                                        color='info'
                                        label={data}
                                        onDelete={handleRemoveAllergie(data)}
                                    />
                                );
                            })}
                        </ListItem>
                    </Paper>

                    {patient.requestHistory.length > 0 && <Paper
                        sx={{
                            listStyle: 'none',
                            p: 1,
                            m: 1,
                        }}
                        elevation={3}
                        component="ul"
                    >
                        <List title={'Historial de consultas'} requests={patient.requestHistory} />
                    </Paper>}
                    <div style={{ marginBottom: '60px' }}></div>
                </Box>
                <BottomNav elements={elements} />
            </div>
        )
    }

    useEffect(() => {
        if (param.id && param.id !== 'new') {
            getPatient(param.id).then(response => {
                if (response) {
                    setLoading(false)
                    setPatient(response)
                    setPatientId(response?._id)
                } else {
                    navigate(`/dashboard`)
                }
            })
        } else {
            setLoading(false)
        }
        console.log(param)
    }, [param, navigate])


    return (
        <div>
            {loading ? <Loading /> : renderPage()}
        </div>
    )
}

export default PatientDetail;