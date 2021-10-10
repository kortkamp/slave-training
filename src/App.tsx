import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SlaveProvider } from './hooks/useSlave';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import { GlobalStyle } from './styles/global';

import Routes from './routes';

function App() {
  const { scale } = useWindowDimensions();
  return (
    <BrowserRouter>
      <SlaveProvider>
        <Routes />
      </SlaveProvider>
      <GlobalStyle scale={scale} />
    </BrowserRouter>
  );
}

export default App;
