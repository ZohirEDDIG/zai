import { Routes as RRRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

const Routes = () => {
  return (
    <RRRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </RRRoutes>
  );
};

export default Routes;
