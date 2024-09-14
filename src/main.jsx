import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import NavigationProvider from './context/navigation.jsx';
import App from './App.jsx';
import React from 'react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationProvider>
      <Provider store={store} >
        <App />
      </Provider>
    </NavigationProvider>
  </React.StrictMode>
)
