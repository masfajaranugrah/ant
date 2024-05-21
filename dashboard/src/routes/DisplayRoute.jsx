import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const Display = Loadable(lazy(() => import('../pages/display/Display')));
// // render - utilities
// const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
// const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
// const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
// const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
      path: '/display',
      element: <Display />
};

export default MainRoutes;
