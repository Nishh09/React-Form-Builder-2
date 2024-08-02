// SubmitButton.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.scss'; // Ensure this file exists and is correctly named

const SubmitButton = ({ onSave, text }) => {
  return (
    <div className={styles.submitButtonContainer}>
      <button 
        className={`${styles.submitButton} btn btn-primary`}
        style={{ marginRight: '10px' }}
        onClick={onSave}
      >
        {text}
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
