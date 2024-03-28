import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Import from './components/Import';
// import ProtectedRoutes from './components/ProtectedRoutes';
import NonAuthRoutes from './components/NonAuthRoutes';
import MainLayout from './layouts/MainLayout';
import { AddContact } from './pages/contact-page/AddContact';
import { EditContact } from './pages/contact-page/EditContact';
import Home from './pages/contact-page/Home';
import ViewContact from './pages/contact-page/ViewContact';
import SignIn from './pages/SignIn';
import SingUp from './pages/SignUp';
const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <NonAuthRoutes>
            <SignIn />
          </NonAuthRoutes>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <NonAuthRoutes>
            <SingUp />
          </NonAuthRoutes>
        ),
      },
      {
        path: 'contacts',
        element: <Home />,
        children: [
          {
            path: '',
            element: <ViewContact />,
          },
          {
            path: 'add-contact',
            element: <AddContact />,
          },

          {
            path: 'import',
            element: <Import />,
          },
          {
            path: 'edit/:userId',
            element: <EditContact />,
          },
        ],
      },
    ],
  },
  // {
  //   path:'*',
  //   element:<DefaultNavigation/>
  // }
  // {
  //   path: '/',
  //   element: (
  //     <NonAuthRoutes>
  //       <SignIn />
  //     </NonAuthRoutes>
  //   ),
  // },
  // {
  //   path: '/sign-up',
  //   element: <SingUp />,
  // },
  // {
  //   path: '/contacts',
  //   element: <Home />,
  //   children: [
  //     {
  //       path: 'add-contact',
  //       element: <AddContact />,
  //     },
  //     {
  //       path: 'view-contact',
  //       element: <ViewContact />,
  //     },
  //     {
  //       path: 'import',
  //       element: <Import />,
  //     },
  //     {
  //       path: 'edit/:userId',
  //       element: <EditContact />,
  //     },
  //   ],
  // },
]);

export default appRouting;
