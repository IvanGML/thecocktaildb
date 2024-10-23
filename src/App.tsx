import React from 'react';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
