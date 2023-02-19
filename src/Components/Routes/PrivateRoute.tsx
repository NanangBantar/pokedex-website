import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    return localStorage.hasOwnProperty('token') ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute