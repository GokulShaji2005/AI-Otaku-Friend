
import { useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Chat from './pages/Chat'
import Home from './pages/Home'
import News from './pages/News';


 function App() {
  const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Chat',
    element: <Chat />
  }
  ,
  {
    path: '/News',
    element: <News />
  }
]);
  return (
     <RouterProvider router={router} />
  )
}

export default App
