import { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Layouts/Container'
import TimeLine from '../components/TimeLine/TimeLine'
import Table from '../components/Table/Table'
import CircularLoading from '../components/Feedback/CircleLoading'
import BottomNav from '../components/Nav/BottomNav'
import { GridColDef } from '@mui/x-data-grid'

import { getAllPatients } from './api/patients'
import { getAllRequests } from './api/requests'

import { ISimpleCard } from '../interfaces'


const Dashboard = () => {

  const [patients, setPatients] = useState([])
  const [requests, setRequests] = useState([])
  const [patientloading, setPatientLoading] = useState(true)
  const [requestLoading, setRequestLoading] = useState(true)
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 200 },
    { field: 'patientName', headerName: 'Nombre', flex: 200 },
    { field: 'patientLastName', headerName: 'Apellido', flex: 200 },
    { field: 'patientAge', headerName: 'Edad', flex: 200 },
  ];

  const fetchDashboardInfo = async () => {
    let allPatients = await getAllPatients()
    let allRequests = await getAllRequests()

    if (allPatients) {
      setPatients(allPatients)
      setPatientLoading(false)
    }
    if (allRequests) {
      setRequestLoading(false)
      setRequests(allRequests.reverse())
    }

  }

  const handleRedirect = (route: string) => {
    navigate(`/patients/${route}`)
  }



  const SimpleCard = ({ type, total, path, loading }: ISimpleCard) => {
    return (
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
          <Typography variant="h1" component="div">
            {loading ? <CircularLoading /> : total}
          </Typography>
        </CardContent>
        {path && <CardActions>
          <Link to={path}>
            <Button size="small">Ver</Button>
          </Link>
        </CardActions>}
      </Card>
    )
  }

  const TimeLineLayout = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
              Últimas 8 consultas
            </Typography>
          </CardContent>
        </Card>
        <div>
          {requests ? <TimeLine data={requests} /> :
            <div style={{ margin: '100px' }}>
              <CircularLoading />
            </div>}
        </div>
      </div>
    )
  }

  const renderDashboard = () => {
    return (
      <div className='dashboard'>
        <div className="container">
          <div className="timeline">
            <TimeLineLayout />
          </div>
          <div className="request-table">
            <Table rows={patients} columns={columns} loading={patientloading} action={handleRedirect} />
          </div>
          <div className="count1">
            <SimpleCard type='Pacientes Registrados' total={patients.length} path='' loading={patientloading} />
          </div>
          <div className="count2">
            <SimpleCard type='Total de Consultas' total={requests.length} path='' loading={requestLoading} />
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    fetchDashboardInfo()
  }, [])

  return (
    <div>
      <Container child={renderDashboard} />
      <BottomNav elements={[<Button variant='contained' color='success' onClick={() => handleRedirect('new')}>Agregar Paciente</Button>]} />
    </div>
  )
}

export default Dashboard