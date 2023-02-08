import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { accountService } from './services/AccountService.js';
import AuthGuard from './utils/AuthGuard.jsx';


export const router = createHashRouter([
  {
    // default path
    path: "/",
    // the element that will load on the App
    element: <App />,
    // this is element will direct you to the error page if you run into any error while routing 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "account",
        // you cant get to the account page without it going to get your account information first
        // NOTE before you can get into the route you have to make sure that you can get the account first 
        loader: accountService.getAccount,
        element:
          <AuthGuard>
            {/* NOTE account is being rendered as a child, if you are logged in, and will not load anything if you are not logged in */}
            <AccountPage />
          </AuthGuard>,
      },

    ],
  },
]);