// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DemoBar from './demobar';  // Make sure the component name matches
import FormViewPage from './FormViewPage';
import FormBuilder from './src/index';
import * as variables from './variables';

// Add our stylesheets for the demo.
import './scss/application.scss'; // Use ES module import

const url = '/api/formdata';
const saveUrl = '/api/formdata';

const App = () => (
  <Router>
    <Routes>
      <Route path="/form-view" element={<FormViewPage />} />
      <Route path="/" element={
        <>
          <DemoBar variables={variables} />
          <FormBuilder.ReactFormBuilder
            variables={variables}
            url={url}
            saveUrl={saveUrl}
            locale='en'
            saveAlways={false}
          />
        </>
      } />
    </Routes>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('form-builder')
);
