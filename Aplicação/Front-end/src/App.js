import React from 'react';
import Routes from './Routes/index';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './Contexts';


function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
