import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import Store from './pages/store/stores';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import DashboardAppPage from './pages/DashboardAppPage';
import Game from './pages/games/Games';
import Partner from './pages/partners/Partners';

import Conpaign from './pages/conpaigns/conpaign';
import Service from './services/admin.service';
import PageRole from './pages/PageRole';


// ----------------------------------------------------------------------

export default function Router() {
  const isUser = (Service.GetUser() && Service.GetUser().success && Service.GetUser().data && Service.GetUser().data.accountToken)
  const routes = useRoutes([
    {
      path: '',
      element: (isUser)? <DashboardLayout /> : <SimpleLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: (isUser)? <DashboardAppPage /> :<PageRole />},
        { path: 'game', element: (isUser)? <Game /> :<PageRole /> },
        { path: 'conpaign', element: (isUser)? <Conpaign /> :<PageRole/>},
        { path: 'partner', element: (isUser)? <Partner /> :<PageRole/>},
        { path: 'store', element: (isUser)? <Store /> :<PageRole/>},
        { path: 'profile', element: (isUser)? <Profile /> :<PageRole/>},
        { path: 'logout', element: (isUser)? <Logout /> :<PageRole/>},
        
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },    
    
    {
      path: 'register',
      element: <RegisterPage />,
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
