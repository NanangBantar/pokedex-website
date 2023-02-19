
import { Routes, Route } from 'react-router-dom'
import Login from './Containers/Login'
import Register from './Containers/Register'
import ForgotPassword from './Containers/ForgotPassword'
import Otp from './Containers/Otp'
import { Pokemon, Home, Profile } from './Containers/Dashboard'

import { PrivateRoute, PublicRoute } from './Components/Routes'

const App = () => {
  return <Routes>
    <Route element={<PublicRoute />}>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/otp/:fullHash' element={<Otp />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path='/dashboard' element={<Home />} />
      <Route path='/pokemon' element={<Pokemon />} />
      <Route path='/profile' element={<Profile />} />
    </Route>
  </Routes>;
};

export default App;
