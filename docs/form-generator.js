/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const e = React.createElement;

const ReactFormGenerator = ReactFormBuilder.default.ReactFormGenerator;
const ElementStore = ReactFormBuilder.default.ElementStore;
const formContainer = document.querySelector('#form-generator');

function setClass(element, name, remove) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (remove) {
    element.classList.remove(name);
  } else {
    element.classList.add(name);
  }
}

class FormGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initialize with empty array
      previewVisible: false,
    };

    this.showPreview = this.showPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this._onUpdate = this._onChange.bind(this);
  }

  componentDidMount() {
    // Subscribe to ElementStore updates
    ElementStore.subscribe(state => this._onUpdate(state.data));
    
    const previewButton = document.querySelector('#button-preview');
    const closeButton = document.querySelector('#button-close');

    if (previewButton) {
      previewButton.addEventListener('click', this.showPreview);
    } else {
      console.error('#button-preview not found');
    }

    if (closeButton) {
      closeButton.addEventListener('click', this.closePreview);
    } else {
      console.error('#button-close not found');
    }
  }

  componentWillUnmount() {
    // Clean up event listeners
    const previewButton = document.querySelector('#button-preview');
    const closeButton = document.querySelector('#button-close');

    if (previewButton) {
      previewButton.removeEventListener('click', this.showPreview);
    }

    if (closeButton) {
      closeButton.removeEventListener('click', this.closePreview);
    }
  }

  saveFormData() {
    ElementStore.dispatch('post');
  }

  showPreview() {
    this.saveFormData();
    this.setState({
      previewVisible: true,
    });
    setClass('#preview-dialog', 'show', false);
    setClass('#preview-dialog', 'd-block', false);
  }

  closePreview() {
    this.setState({
      previewVisible: false,
    });
    setClass('#preview-dialog', 'show', true);
    setClass('#preview-dialog', 'd-block', true);
  }

  _onChange(data) {
    console.log('Form data received in _onChange:', data); // Detailed log of form data
  
    // Check if data is an object and has properties
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      this.setState({
        data,
      });
    } else {
      console.warn('Received data is not in expected format:', data);
    }
  
    // Call the onChange prop if it's provided
    if (this.props.onChange) {
      this.props.onChange(data); // This will trigger the console log in the parent component
    }
  }

  render() {
    const { previewVisible, data } = this.state;

    if (!previewVisible) {
      return null;
    }

    const postUrl = `https://safe-springs-35306.herokuapp.com/api/form${window.localStorage.getItem('cid') ? `?cid=${window.localStorage.getItem('cid')}` : ''}`;

    return e(
      ReactFormGenerator, {
        download_path: '',
        back_action: '/react-form-builder/index.html',
        back_name: 'Back',
        answer_data: {},
        action_name: 'Save',
        form_action: postUrl,
        form_method: 'POST',
        variables: this.props.variables,
        data: data, // Ensure data is passed correctly
        onChange: this.props.onChange,
      },
    );
  }
}

ReactDOM.render(e(FormGenerator), formContainer);
