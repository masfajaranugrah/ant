import React from 'react';
import { Route } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import('../pages/dashboard'))
);

// render - pages panggilan
const PanggilPage = Loadable(
  lazy(() => import('../pages/panggil/panggilPage'))
);

//render - repanggilan
const RepanggilPage = Loadable(
  lazy(() => import('../pages/repangillan/Repanggilan'))
);

// render - pages cetak
const CetakDocument = Loadable(
  lazy(() => import('../pages/cetak_document/CetakDocument'))
);

// MainRoutes Configuration
const MainRoutes = {
  path: '/',
  element: (
    <RequireAuth fallbackPath="/dashboard/login">
  <MainLayout />,
  </RequireAuth>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'admin',
          element: (
            <RequireAuth fallbackPath="/dashboard/login">
              <DashboardDefault />
            </RequireAuth>
          )
        },
        {
          path: 'panggilan',
          element: (
            <RequireAuth fallbackPath="/dashboard/login">
              <PanggilPage />
            </RequireAuth>
          )
        },
        {
          path: 'repanggilan',
          element: (
            <RequireAuth fallbackPath="/dashboard/login">
              <RepanggilPage />
            </RequireAuth>
          )
        },
        {
          path: 'cetak-document',
          element: (
            <RequireAuth fallbackPath="/dashboard/login">
              <CetakDocument />
            </RequireAuth>
          )
        }
      ]
    }
  ]
};

export default MainRoutes;
