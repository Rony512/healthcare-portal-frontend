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
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
        createdBy: user?.email || ""
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
        const response = await createRequest(request)
        console.log("Response for creation", response)
        let requestHistory = {
            date: moment().format(),
            title: request.condition,
            requestId: response?._id
        }
        patientData.requestHistory.push(requestHistory)
        patientData.updatedBy = user?.email || ''

        if (response) {
            const updateResponse = await updatePatient(_id, patientData)
            console.log("response for update", updateResponse)

            if (updateResponse) handleClose()

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
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 2 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField disabled label="Nombre" variant="outlined" value={patientName} />

                    <TextField disabled label="Nombre" variant="outlined" value={patientAge} />

                    <FormControl sx={{ minWidth: 200 }} >
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
                    <Paper
                        aria-label='kease'
                        sx={{
                            listStyle: 'none',
                            p: 1,
                            m: 1,
                        }}
                        elevation={3}
                        component="ul"
                    >
                        <ListItem>
                            {patientAllergies.map((data, index) => {
                                return <Chip key={index}
                                    color='info'
                                    label={data}
                                />
                            })}
                        </ListItem>
                    </Paper>


                    <TextField error={condition ? false : true} fullWidth multiline label="Padecimiento" variant="outlined" value={condition}
                        onChange={e => setRequest({ ...request, condition: e.target.value })} helperText={condition ? "" : "*Requerido"} />
                    <TextField multiline label="Inspección" variant="outlined" value={inspection}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, inspection: e.target.value } })} />
                    <TextField multiline label="Palpación" variant="outlined" value={palpation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, palpation: e.target.value } })} />
                    <TextField multiline label="Auscultación" variant="outlined" value={auscultation}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, auscultation: e.target.value } })} />
                    <TextField multiline label="Percusión" variant="outlined" value={percussion}
                        onChange={e => setRequest({ ...request, physicalExam: { ...physicalExam, percussion: e.target.value } })} />

                    <TextField error={diagnose ? false : true} fullWidth multiline label="Diagnostico" variant="outlined" value={diagnose}
                        onChange={e => setRequest({ ...request, diagnose: e.target.value })} helperText={diagnose ? "" : "*Requerido"} />
                    <TextField fullWidth multiline label="Prescripción" variant="outlined" value={prescription}
                        onChange={e => setRequest({ ...request, prescription: e.target.value })} />
                </Box>
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
                Crear Consulta
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transitions} >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Creando Consulta
                        </Typography>
                        <Button color="inherit" onClick={handleCreateRequest}>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                {formRequest()}
            </Dialog>
        </div>
    );
}

export default RequestDetail