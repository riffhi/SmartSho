// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Import your i18n configuration file
// This line imports and initializes i18n
import './i18n';

// You also need to import the i18n instance itself to pass it to I18nextProvider
import i18n from './i18n'; // Assuming i18n/index.tsx exports default i18n

import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* Wrap your App component with I18nextProvider */}
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </I18nextProvider>
    </React.StrictMode>
);
