import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import './styles/app.css'

const Login = React.lazy(() => import('./pages/login'));
const SignUp = React.lazy(()=>import('./pages/sign-up'));
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login/>}/>
            <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
