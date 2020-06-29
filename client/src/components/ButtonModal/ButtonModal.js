import React from 'react';
import axios from 'axios';
import css from './ButtonModal.module.css';
// Components
import Modal from '../MainTooltip/MainTooltip';
import MainInput from './../MainInput/MainInput';
import MainButton from './../MainButton/MainButton';
import css3 from 'bootstrap' // se integro el modulo de bootstrap para uso de fronend
import CheckBox from './../CheckBox/CheckBox';   // check box no utilizado en ningun lado
class ButtonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      text: this.props.text ? this.props.text : '',
      title: this.props.title ? this.props.title : '',
      label1: this.props.label1 ? this.props.label1 : '',
      label2: this.props.label2 ? this.props.label2 : '',
      label3: this.props.label3 ? this.props.label3 : '',
      text1: this.props.text1 ? this.props.text1 : '',
      text2: this.props.text2 ? this.props.text2 : '',
      text3: this.props.text3 ? this.props.text3 : '',
      modalFunction: this.props.modalFunction
        ? this.props.modalFunction
        : 'CREAR_ITEM',
      btn1Text:
        this.props.modalFunction == 'CREAR_ITEM' ? 'Crear' : 'Actualizar',
      btn2Text:
        this.props.modalFunction == 'CREAR_ITEM'
          ? 'Limpiar Campos'
          : 'Eliminar',
      btnOnClick1: this.props.btnOnClick1,
      btnOnClick2: this.props.btnOnClick2
    };
    this.handleClickBtn1 = this.handleClickBtn1.bind(this);
    this.handleClickBtn2 = this.handleClickBtn2.bind(this);
    this.handleChangeText3 = this.handleChangeText3.bind(this);
  }
  handleClickMainBtn = () => {
    this.setState({ active: !this.state.active });
  };
  handleClickBtn1 = () => {
    //   this.state.btnOnClick1(this.state);
  };
  handleClickBtn2 = (e, a) => {
    //  this.state.btnOnClick2(this.state);
    switch (this.state.modalFunction) {
      case 'CREAR_ITEM':
        // limpiar campos
        this.setState({
          text1: '',
          text2: '',
          text3: ''
        });

        break;
      case 'EDITAR_ITEM':
        // borrar registro
        axios
          .post(
            `${process.env.REACT_APP_API}/responsable/` +
              this.state.title +
              '/delete'
          )
          .then(res => {
            this.setState({ lstItems: res.data });
          })
          .catch(function(err) {});
        break;
    }
  };
  handleChangeGrupo(event) {
    this.setState({
      text1: event.target.value
    });
  }
  handleChangeText2(event) {
    this.setState({
      text2: event.target.value
    });
  }
  handleChangeText3(event) {
    this.setState({
      text3: event.target.value
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render(event) {
    let arrayCss = [css.ButtonModal, this.state.active ? null : css.hidden];
    return (
      <div className={arrayCss.join(' ')}>
        <MainButton onClick={this.handleClickMainBtn}>
          {this.state.text}
        </MainButton>
        <Modal title={this.state.title} width="500px">
          <div>{this.state.label1}</div>
          <MainInput
            name="text1"
            onChange={this.handleChangeText1.bind(this)}
            orientation="right"
            icon="default"
            defaultValue={this.state.text1}
          ></MainInput>
          <div>{this.state.label2}</div>
          <MainInput
            name="text2"
            onChange={this.handleInputChange.bind(this)}
            orientation="right"
            icon="default"
            defaultValue={this.state.text2}
          ></MainInput>
          <div>{this.state.label3}</div>
          <MainInput
            name="text3"
            onChange={this.handleChangeText3.bind(this)}
            orientation="right"
            icon="default"
            defaultValue={this.state.text3}
          ></MainInput>
          <MainButton onClick={this.handleClickBtn2}>
            {this.state.btn2Text}
          </MainButton>
          <MainButton onClick={this.handleClickBtn1}>
            {this.state.btn1Text}
          </MainButton>
        </Modal>
      </div>
    );
  }
}

export default ButtonModal;
