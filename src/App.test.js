import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserContext} from './components/user-context'

//import the routes
import Home from './routes/home';
import CreateAccount from './routes/createaccount';
import Login from './routes/login';
import Deposit from './routes/deposit';
import Withdraw from './routes/withdraw';
import History from './routes/transaction-history';
import AllData from './routes/alldata';

test('deposit', () => {
  const root = document.createElement('div');
  ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={
                {users:[
                    { name:'Gregory',
                      email:'gjosephs@mit.edu',
                      password:'secret',
                      balance:100,
                      history:[] }
                ],
                currentUser: null,
                userIndex: null
                }
            } >
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transaction-history" element={<History />} />
          <Route path="alldata" element={<AllData />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>, root);
  expect(root.querySelector('h5').textContent).toBe('Welcome to the Bank');

});
