import React from 'react';
import Routes from './Routes/index';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider, GroupSelectContextProvider } from './Contexts';


function App() {

  return (
    <UserContextProvider>
      <GroupSelectContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </GroupSelectContextProvider>
    </UserContextProvider>
  );
}

export default App;
