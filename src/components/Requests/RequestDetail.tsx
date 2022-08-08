import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Chip, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, TextField } from '@mui/material';
import { IRequest, IRequestDetailProps } from '../../interfaces';

import { createRequest } from '../../pages/api/requests';
import { updatePatient } from '../../pages/api/patients';

import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../Nav/BottomNav';

const Transition = (props: TransitionProps & { children: ReactElement; }, ref: Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
}
const Transitions = forwardRef(Transition);

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const selectValues = {
    BASIC: 'BASIC',
    PLENNA: 'PLENNA',
    PLUS: 'PLUS'
}

const RequestDetail = ({ _id, patientData }: IRequestDetailProps) => {
    const navigate = useNavigate()
    const { user } = useAuth0()
    const [open, setOpen] = useState(false);

    const { patientName, patientAge, patientAllergies } = patientData

    const defaultRequest = {
        patientId: _id,
        requestType: "BASIC",
        requestStatus: "OPEN",
        patientName: patientName,
        patientAge: patientAge,
        condition: "",
        physicalExam: {
            inspection: "N/A",
            palpation: "N/A",
            auscultation: "N/A",
            percussion: "N/A"
        },
        diagnose: "",
        prescription: "",
        createdBy: user?.email || "",
        updatedBy: ""
    }

    const [request, setRequest] = useState<IRequest>(defaultRequest)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        navigate(`/patients/${_id}`)
        setOpen(false);
    };

    const handleVlidation = (request: IRequest) => {
        const isEmpty = Object.values(request).every(x => (x === null || x === ''));
        console.log(isEmpty)
    }

    const handleCreateRequest = async () => {
        console.log('The request ', request)
        try {
            const response = await createRequest(request)
            console.log("Response for creation", response)
            let requestHistory = {
                date: moment().format(),
                title: request.condition,
                requestId: response?._id,
                requestStatus: 'OPEN'
            }
            patientData.requestHistory.push(requestHistory)
            patientData.updatedBy = user?.email || ''

            if (response) {
                const updateResponse = await updatePatient(_id, patientData)
                if (updateResponse) {
                    handleClose()
                    toast.success("Consulta agregada con éxito")
                }
            }
        } catch (error) {
            toast.error("Hubo un error al agregar la consulta")
        }
    }

    const formRequest = () => {

        const { requestType, condition, physicalExam, diagnose, prescription } = request
        const { inspection, palpation, auscultation, percussion } = physicalExam

        const handleSelect = (event: SelectChangeEvent) => {
            setRequest({ ...request, requestType: event.target.value as string })
        };

        return (
            <div>

                <Box sx={{ '& > :not(style)': { m: 2, width: 300 } }} >
                    <TextField disabled label="Nombre" variant="outlined" value={patientName} />

                    <TextField disabled label="Edad" variant="outlined" value={patientAge} />

                    <FormControl sx={{ minWidth: 300 }} >
                        <InputLabel id="demo-simple-select-label">Tipo de Consulta</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={requestType}
                            label="Tipo de Consulta"
                            onChange={handleSelect} >
                            {Object.keys(selectValues).map(select => {
                                return <MenuItem key={select} value={select}>{select}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    {patientAllergies.length > 0 && <Paper
                        aria-label=''
                        sx={{ listStyle: 'none', p: 1 }}
                        elevation={3}
                        component="ul"
                    > Alergias:
                        <ListItem>
                            {patientAllergies.map((data, index) => {
                                return <Chip key={index}
                                    color='info'
                                    label={data}
                                />
                            })}
                        </ListItem>
                    </Paper>}
                    <TextField multiline label="Inspección" variant="outlined" value={inspection}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, inspection: e.target.value } })} />
                    <TextField multiline label="Palpación" variant="outlined" value={palpation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, palpation: e.target.value } })} />
                    <TextField multiline label="Auscultación" variant="outlined" value={auscultation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, auscultation: e.target.value } })} />
                    <TextField multiline label="Percusión" variant="outlined" value={percussion}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, percussion: e.target.value } })} />
                </Box>


                <Box sx={{ '& > :not(style)': { m: 2, minWidth: 100 } }} >
                    <TextField rows={4} required error={condition ? false : true} sx={{ width: '30%' }} multiline label="Padecimiento" variant="outlined" value={condition}
                        onChange={e => setRequest({ ...request, condition: e.target.value })} helperText={condition ? "" : "Requerido"} />
                    <TextField rows={4} required error={diagnose ? false : true} sx={{ width: '30%' }} multiline label="Diagnostico" variant="outlined" value={diagnose}
                        onChange={e => setRequest({ ...request, diagnose: e.target.value })} helperText={diagnose ? "" : "Requerido"} />
                    <TextField rows={4} required sx={{ width: '30%' }} multiline label="Prescripción" variant="outlined" value={prescription}
                        onChange={e => setRequest({ ...request, prescription: e.target.value })} />
                </Box>

                <div style={{ marginBottom: '60px' }}></div>
            </div>
        )
    }

    useEffect(() => {
        handleVlidation(request)
        console.log(request)
    }, [request])

    return (
        <div>
            <Button variant="contained" color='success' onClick={handleClickOpen}>
                Iniciar Consulta
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transitions} >
                <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Nueva Consulta
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {formRequest()}
                <BottomNav elements={[
                    <Button color='success' variant='contained' onClick={handleCreateRequest}>
                        Guardar
                    </Button>]
                } />
            </Dialog>
        </div>
    );
}

export default RequestDetail