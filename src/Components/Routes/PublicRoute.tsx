import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    return !localStorage.hasOwnProperty('token') ? <Outlet /> : <Navigate to='/dashboard' />
}

export default PublicRoute