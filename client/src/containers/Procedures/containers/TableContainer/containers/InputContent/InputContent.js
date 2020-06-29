import React from 'react';

import Input from './../../../../../../components/Basic/Input/Basicinput';

export default class InputContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      animationSize: ''
    };
    this.value = this.props.value ? this.props.value : '';
    this.savedValue = this.props.value ? this.props.value : '';
  }
  handleBlur = async (id, value, savedValue) => {
    if (this.savedValue !== value) {
      this.setState({ action: 'loading' });
      let options = {
        method: 'POST',
        body: JSON.stringify({ id: id, value: value }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let updateUrl = `${process.env.REACT_APP_API}/contenidoproceso/update`;
      let updateResponse = await fetch(updateUrl, options).then(r => r.json());
      if (updateResponse.status === 200) {
        this.savedValue = value;
        this.setState({ action: 'allGreen' });
        console.log('this.props.handleBlur', this.props.handleBlur);
        if (this.props.handleBlur) {
          this.props.handleBlur(this.props.rowIdx, this.props.cellIdx, value);
        }
        setTimeout(() => {
          this.setState({ action: 'normal', animationSize: 'out' });
        }, 1000);
      } else {
        alert('Error al momento de actualizar');
        console.log('ERROR:', updateResponse);
      }
    } else {
      this.setState({ action: 'normal', animationSize: 'out' });
    }
  };
  handleChange = value => {
    this.value = value;
    this.setState({});
  };
  handleFocus = () => {
    this.setState({ action: 'editing', animationSize: 'in' });
  };
  render() {
    return (
      //aqui en este mando de input no se entiende bien la logica
      <Input
        color={this.props.color ? `${this.props.color}33` : '#11111122'}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleFocus={this.handleFocus}
        id={this.props.id}
        type={this.props.type}
        value={this.value}
        action={this.state.action}
        animationSize={this.state.animationSize}
      />
    );
  }
}
