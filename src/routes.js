import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import Login from './pages/Login';
import Page404 from './pages/Page404';
import Store from './pages/store/stores';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import DashboardAppPage from './pages/DashboardAppPage';
import Game from './pages/games/Games';
import ProductCategory from './pages/productcategory/productcategory';
import Partner from './pages/partners/Partners';
import User from './pages/user/Users';
import Conpaign from './pages/conpaigns/conpaign';
import Service from './services/header.service';
import PageRole from './pages/PageRole';


// ----------------------------------------------------------------------

export default function Router() {
  const isUser = (Service.GetUser() && Service.GetUser().success && Service.GetUser().data && Service.GetUser().data.token )
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
        { path: 'productcategory', element: (isUser)? <ProductCategory /> :<PageRole/>},
        
        { path: 'profile', element: (isUser)? <Profile /> :<PageRole/>},
        { path: 'user', element: (isUser)? <User /> :<PageRole/>},
        { path: 'logout', element: (isUser)? <Logout /> :<PageRole/>},
        
      ],
    },
    {
      path: 'login',
      element: <Login />,
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
