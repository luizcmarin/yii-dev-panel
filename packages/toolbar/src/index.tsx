import reportWebVitals from '@yii-dev-panel/toolbar/reportWebVitals';

import '@yii-dev-panel/toolbar/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yii-dev-panel/toolbar/index.css';
import App from '@yii-dev-panel/toolbar/App';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// );

// Find all widget divs
const widgetDivs = document.querySelectorAll('#yii-dev-toolbar');

// Inject our React App into each class
widgetDivs.forEach((div) => {
    console.log('log into div', div);
    const root = ReactDOM.createRoot(document.getElementById(div.id) as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
