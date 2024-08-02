import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactFormGenerator } from './src/index'; // Ensure the path is correct
import SubmitButton from './SubmitButton';

const FormViewPage = () => {
  const location = useLocation();
  const formData = location.state?.formData || [];
  const [formInputData, setFormInputData] = useState([]);

  // Handle input changes from the form
  const handleInputChange = (data) => {
    console.log('Form data received in handleInputChange:', data);
    if (Array.isArray(data)) {
      setFormInputData(data);
    } else {
      console.error('Unexpected data format received in handleInputChange:', data);
    }
  };

  // Process and print filtered data based on field types
  const handleSave = () => {
    if (Array.isArray(formInputData)) {
      const processedData = formInputData.map(item => {
        let value = item.value;

        // Process the value based on input field type
        switch (true) {
          case item.name.startsWith('number_input') || item.name.startsWith('phone_input'):
            value = value !== "" ? Number(value) : null; // Convert to number, or null if empty
            break;
          case item.name.startsWith('date_picker'):
            value = value ? new Date(value) : null; // Convert to Date object, or null if empty
            break;
          case Array.isArray(value):
            value = value; // Keep arrays as they are
            break;
          default:
            // For other types, keep as is
            value = value;
            break;
        }

        return {
          name: item.name,
          value: value
        };
      });

      console.log('Processed form input values:', processedData);
    } else {
      console.log('No form input data available or form is empty.');
    }
  };

  if (!formData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <ReactFormGenerator
            download_path=""
            back_action="/"
            answer_data={{}}
            form_action="/api/form"
            form_method="POST"
            data={formData}
            locale="en"
            onChange={handleInputChange} // Assuming onChange receives form data as an array
          />
          <SubmitButton onSave={handleSave} text="Submit Form" />
        </div>
      </div>
    </div>
  );
};

export default FormViewPage;
