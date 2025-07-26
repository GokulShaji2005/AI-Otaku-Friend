import axios from 'axios';

import './App.css'
const BASE_URL = import.meta.env.VITE_API_URL;
axios.get(`${BASE_URL}/animeNews`);

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
