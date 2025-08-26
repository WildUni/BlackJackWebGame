// main.tsx - UPDATED
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import App from './App';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Profile from './pages/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App/>}>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/room/:roomId" element={<Game/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)



// import { GoogleOAuthProvider } from '@react-oauth/google';


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
// const GOOGLE_CLIENT_ID = "761307184568-mua85l14ngfmvsq15lbs80agjdl1lf9f.apps.googleusercontent.com";

// renders React Component "Root" into the DOM element with ID "root"
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//     <RouterProvider router={router} />
//   </GoogleOAuthProvider>
// );
