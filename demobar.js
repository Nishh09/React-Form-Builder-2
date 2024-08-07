import React from 'react';
import { useNavigate } from 'react-router-dom';
import store from './src/stores/store';
import { ReactFormGenerator } from './src/index';

// This function is used to set the callback for saving JSON data
let saveCallback = (jsonData) => {};

export function setSaveCallback(callback) {
  saveCallback = callback;
}

export default function Demobar(props) {
  const [data, setData] = React.useState([]);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [shortPreviewVisible, setShortPreviewVisible] = React.useState(false);
  const [roPreviewVisible, setRoPreviewVisible] = React.useState(false);
  const [jsonPreviewVisible, setJsonPreviewVisible] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const navigate = useNavigate();

  // Update the data state whenever the store changes
  React.useEffect(() => {
    const update = (state) => setData(state.data);
    const unsubscribe = store.subscribe(update);
    return () => unsubscribe();
  }, []);

  // Function to save form data and trigger the callback
  const saveFormData = () => {
    const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON
    setJsonData(jsonData);
    if (saveCallback) saveCallback(jsonData); // Call the callback with the JSON data
    store.dispatch('post');
  };

  // Show the preview of the form
  const showPreview = () => {
    saveFormData();
    navigate('/form-view', { state: { formData: data } }); // Pass data through navigation state
  };

  // Show the short preview of the form
  const showShortPreview = () => {
    saveFormData();
    setShortPreviewVisible(true);
  };

  // Show the read-only preview of the form
  const showRoPreview = () => {
    saveFormData();
    setRoPreviewVisible(true);
  };

  // Show the JSON data preview
  const showJsonPreview = () => {
    saveFormData();
    setJsonPreviewVisible(true);
  };

  // Close all previews
  const closePreview = () => {
    setPreviewVisible(false);
    setShortPreviewVisible(false);
    setRoPreviewVisible(false);
    setJsonPreviewVisible(false);
  };

  return (
    <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
      <h4 className="float-left">Preview</h4>
      <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>Preview Form</button>
      <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={showShortPreview}>Alternate/Short Form</button>
      <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={showRoPreview}>Read Only Form</button>
      <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={showJsonPreview}>Show JSON Data</button>
      <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={saveFormData}>Save Form</button>

      {/* Modals for preview */}
      {previewVisible && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <ReactFormGenerator
                download_path=""
                back_action="/"
                back_name="Back"
                answer_data={answers}
                action_name="Save"
                form_action="/api/form"
                form_method="POST"
                variables={props.variables}
                data={data}
                locale='en'
              />
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {roPreviewVisible && (
        <div className="modal ro-modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <ReactFormGenerator
                download_path=""
                back_action="/"
                back_name="Back"
                answer_data={answers}
                action_name="Save"
                form_action="/"
                form_method="POST"
                read_only={true}
                variables={props.variables}
                hide_actions={true}
                data={data}
                locale='en'
              />
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shortPreviewVisible && (
        <div className="modal short-modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content border border-light p-3 mb-4">
              <ReactFormGenerator
                download_path=""
                back_action=""
                answer_data={answers}
                form_action="/"
                form_method="POST"
                data={data}
                display_short={true}
                variables={props.variables}
                hide_actions={false}
                locale='en'
              />
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {jsonPreviewVisible && (
        <div className="modal json-modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <pre>{jsonData}</pre>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
