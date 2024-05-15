import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";


//screens

 import PhotoDetails from './components/PhotoDetails.jsx';
 import PhotoGallery from './components/PhotoGallery.jsx';
import UploadPhoto from './components/UploadPhoto.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<PhotoGallery />} />
      <Route path='/details/:id' element={<PhotoDetails />} /> 
      <Route path='/upload' element={<UploadPhoto />} /> 
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
