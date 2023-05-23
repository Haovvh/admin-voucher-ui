// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor  src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Partner',
    path: '/partner',
    icon: icon('ic_blog'),
  }, 
  
  {
    title: 'Store',
    path: '/store',
    icon: icon('ic_cart'),
  }, 
  {
    title: 'ProductCategory',
    path: '/productCategory',
    icon: icon('ic_cart'),
  }, 
  {
    title: 'Conpaign',
    path: '/conpaign',
    icon: icon('ic_cart'),
  },  
  {
    title: 'User',
    path: '/user',  
    icon: icon('ic_cart'),
  },
  {
    title: 'Game',
    path: '/game',
    icon: icon('ic_cart'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_cart'),
  } ,
  {
    title: 'Logout',
    path: '/logout',
    icon: icon('ic_cart'),
  } 
];

export default navConfig;
