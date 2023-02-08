import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/scss/main.scss'
import { router } from './Router.jsx'

// NOTE Strict mode is good for production but not good for development mode (we removed the strict mode tag here)
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)