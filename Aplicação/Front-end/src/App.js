import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { UserContextProvider } from './Contexts/index';
import Routes from './Routes/index';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
          <Routes />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
