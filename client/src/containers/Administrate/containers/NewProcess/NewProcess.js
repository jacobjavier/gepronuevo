import React from 'react';
import css from './NewProcess.module.css';
// components
import MainButton from './../../../../components/MainButton/MainButton';
import MainInput from './../../../../components/MainInput/MainInput';

export default class NewProcess extends React.Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.description = '';
  }
  handleAdd = async event => {
    if (this.name !== '' && this.description !== '') {
      let url = `${process.env.REACT_APP_API}/proceso/create`;
      let options = {
        method: 'POST',
        body: JSON.stringify({
          nombre: this.name,
          descripcion: this.description,
          userId: localStorage.getItem('userid')
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      this.name = '';
      this.description = '';
      if (this.props.handleClick) this.props.handleClick(event);
      let resCreate = await fetch(url, options).then(r => r.json());
      if (this.props.handleAdd) this.props.handleAdd(resCreate.response);
      this.setState({});
    } else {
      alert('Revisar campos vacios');
    }
  };
  handleChange = (event, name) => {
    this[name] = event.target.value;
    this.setState({});
  };
  handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleAdd(event);
    }
  };
  render() {
    return (
      <div className={css.newProcedure}>
        <div>Nombre</div>
        <MainInput
          name="name"
          handleChange={this.handleChange}
          handleBlur={e => (this.name = e.target.value)}
          handleOnKeyDown={this.handleOnKeyDown}
          value={this.name}
        ></MainInput>
        <div>Descripcion</div>
        <MainInput
          name="description"
          handleChange={this.handleChange}
          handleBlur={e => (this.description = e.target.value)}
          handleOnKeyDown={this.handleOnKeyDown}
          value={this.description}
        ></MainInput>
        <MainButton handleClick={this.handleAdd}>Agregar</MainButton>
      </div>
    );
  }
}
