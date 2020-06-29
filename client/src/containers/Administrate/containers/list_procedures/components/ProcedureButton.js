import React from 'react';
import css from './ProcedureButton.module.css';

import MainButton from '../../../components/MainButton/MainButton';
import MainTooltip from '../../../components/MainTooltip/MainTooltip';
import MainInput from '../../../components/MainInput/MainInput';
import MainSelect from '../../../components/MainSelect/MainSelect';
// import { reject } from 'q'; 
export default class ProcedureButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipAction: '',
      isInitialized: false
    };
    this.id = this.props.id ? this.props.id : null;
    this.name = this.props.name ? this.props.name : ''; 
    this.description = this.props.description ? this.props.description : '';
    this.fk_status = this.props.fk_status ? this.props.fk_status : 1;
    this.isUpdate = this.props.id ? true : false;
    this.isStarting = false;
  }
  getTooltipContent() {
    if (this.state.tooltipAction === 'unhidding') { 
        let saveButton = (
          <MainButton handleClick={this.handleCreate}>Agregar</MainButton>
        );  
      return (
        <div className={css.tooltipContainer}>
          <strong className={css.title}>Grupo responsable</strong>
          <div>Nombre</div>
          <MainInput
            handleChange={this.handleChangeName}
            value={this.name}
          ></MainInput> 
          <div>Descripcion</div>
          <MainInput
            handleChange={this.handleChangeDescription}
            value={this.description}
          ></MainInput> 
          <MainButton handleClick={this.handleCancel}>Cancelar</MainButton>
          {saveButton}
        </div>
      );
    }
    return null;
  }
  render() { 
    return (
      <div className={css.container}>
        <MainButton
          handleClick={this.handleMainButtonClick}
          className={css.mainButton}
        >
          {this.props.name ? this.props.name : this.props.children}
        </MainButton>
        <MainTooltip
          align={this.props.tooltipPosition}
          inOutTime={350}
          action={this.state.tooltipAction}
          sizeSeparation={25}
          width="content"
          isStarting={this.isStarting}
        >
          {this.getTooltipContent()}
        </MainTooltip>
      </div>
    );
  }
  componentDidMount() {
    this.isStarting = false;
  }
  // Main button
  toogleTooltipAction(tooltipAction) {
    if (tooltipAction === 'hidding') return 'unhidding';
    return 'hidding';
  }
  handleMainButtonClick = async () => {
    if (this.state.isInitialized === false) await this.initializeModal();
    if (this.state.tooltipAction === '') {
      this.setState({ tooltipAction: 'unhidding' });
    } else {
      this.setState(prevState => ({
        tooltipAction: this.toogleTooltipAction(prevState.tooltipAction)
      }));
    }
  };
  initializeModal = () => {

  };  
  handleCancel = () => {
    this.setState(prevState => ({
      tooltipAction: this.toogleTooltipAction(prevState.tooltipAction)
    }));
  };
  handleCreate = () => {
    if (this.props.handleCreate) {
      this.props.handleCreate({
        id: this.id,
        name: this.name, 
        description: this.description, 
        fk_status: this.fk_status
      });
    }
    this.setState({ tooltipAction: 'hidding' });
  }; 
  handleChangeName = event => {
    this.name = event.target.value;
    this.setState({});
  }; 
  handleChangeDescription = event => {
    this.description = event.target.value;
    this.setState({});
  };
}
