import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SlaveProvider } from './hooks/useSlave';

import { GlobalStyle } from './styles/global';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <SlaveProvider>
        <Routes />
      </SlaveProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
