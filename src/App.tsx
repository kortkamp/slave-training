import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { SlaveProvider } from './hooks/useSlave';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import { GlobalStyle } from './styles/global';

import Routes from './routes';
import { EmotionProvider } from './hooks/useEmotion';
import { AssProvider } from './hooks/useAss';

Modal.setAppElement('#root');

function App() {
  const { scale } = useWindowDimensions();
  return (
    <BrowserRouter>
      <EmotionProvider>
        <AssProvider>
          <SlaveProvider>
            <Routes />
          </SlaveProvider>
        </AssProvider>
      </EmotionProvider>
      <GlobalStyle scale={scale} />
    </BrowserRouter>
  );
}

export default App;
