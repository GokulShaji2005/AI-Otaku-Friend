

import './App.css'


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Chat from './pages/Chat'
import Home from './pages/Home'



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

]);
  return (
     <RouterProvider router={router} />
  )
}

export default App
