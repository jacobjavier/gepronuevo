import React from 'react';

import css from './ModalContainerComponent.module.css';

class ModalContainerComponent extends React.Component {
  constructor(props) {
    super(props); 
    this.state = { 
      value: this.props.value ? this.props.value : null,
      label: this.props.label ? this.props.label : null,
      options: this.props.options ? this.props.options : [],
    };
  }
  handleChange = (event) =>{ 
    this.setState({
      value: event.target.value
    });
  } 
  render() {
  
    switch (this.props.type) {
      case 'text':
        break;
      default:
        break;
    }
    return (<div className="modal_container">{this.props.children}</div>);
  }
}

export default ModalContainerComponent;
