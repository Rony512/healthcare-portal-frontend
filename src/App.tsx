import './App.css';
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './components/Nav/Nav'
import Login from './pages/Login'
import Loading from './components/Loading/Loading'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import PatientDetail from './components/Patients/PatientDetail';
import RequestInfo from './components/Requests/RequestInfo';

const App = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

  const routes = () => {
    return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Navigate replace to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='patients/:id' element={<PatientDetail />} />
          <Route path='requests/:id' element={<RequestInfo />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const renderView = () => {
    return isAuthenticated ? routes() : <Login login={loginWithRedirect} />
  }

  return (
    <>
      {isLoading ? < Loading /> : renderView()}
    </>
  );
}

export default App;
