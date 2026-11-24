import React from 'react';
import ReactDOM from 'react-dom/client';
// Police du site, avec la taille optique : les titres et le texte courant ont chacun un dessin adapté
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

