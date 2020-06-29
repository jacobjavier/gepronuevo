import React from 'react';
import css from './GroupButton.module.css';

import MainButton from '../../../components/MainButton/MainButton';
import MainTooltip from '../../../components/MainTooltip/MainTooltip';
import MainInput from '../../../components/MainInput/MainInput';
import MainSelect from '../../../components/MainSelect/MainSelect';
// import { reject } from 'q';
import Member from './Member';
export default class GroupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipAction: '',
      isInitialized: false
    };
    this.responsiblesTypes = this.props.responsiblesTypes
      ? this.props.responsiblesTypes
      : [];
    this.newData = {
      name: this.props.name ? this.props.name : '',
      color: this.props.color ? this.props.color : '',
      description: this.props.description ? this.props.description : '',
      members: this.props.members ? this.props.members : [],
      isUpdate: this.props.id ? true : false 
    };
    // new Values
    this.id = this.props.id ? this.props.id : null;
    this.savedData = {
      name: this.props.name ? this.props.name : '',
      color: this.props.color ? this.props.color : '',
      description: this.props.description ? this.props.description : '',
      members: this.props.members ? this.props.members : [],
      isUpdate: this.props.id ? true : false,
      responsibleType: this.props.responsibleType
        ? this.props.responsibleType
        : []
    };
  }
  getTooltipContent() {
    if (this.state.tooltipAction === 'unhidding') {
      let saveButton;
      if (this.newData.isUpdate === true) {
        saveButton = (
          <div>
            <MainButton handleClick={this.handleSave} style={{ width: '50%' }}>
              Actualizar
            </MainButton>
            <MainButton
              handleClick={this.handleDelete}
              style={{ width: '50%' }}
            >
              Eliminar
            </MainButton>
          </div>
        );
      } else {
        saveButton = (
          <MainButton handleClick={this.handleSave}>Agregar</MainButton>
        );
      }
      let membersElements = [];
      this.newData.members.map((member, memberIdx) => {
        membersElements.push(
          <Member
            key={memberIdx}
            value={member.value}
            handleClick={this.handleDeleteMember}
          >
            {member.text}
          </Member>
        );
      });
      return (
        <div className={css.tooltipContainer}>
          <strong className={css.title}>Grupo responsable</strong>
          <div>Nombre</div>
          <MainInput
            handleChange={this.handleChangeName}
            value={this.newData.name}
          ></MainInput>
          <div>Tipo </div>
          <MainSelect
            options={this.responsiblesTypes} //seccion no desplegable al agregar nueva partida 
            value={this.props.responsibleType}
          ></MainSelect>
          <div>Color</div>
          <MainInput
            handleChange={this.handleChangeColor}
            value={this.newData.color}
            type="color"
          ></MainInput>
          <div>Descripcion</div>
          <MainInput
            handleChange={this.handleChangeDescription}
            value={this.newData.description}
          ></MainInput>
          <div className={css.title}>Integrantes</div>
          <div className={css.membersContainer}>
            <MainSelect
              options={this.props.users ? this.props.users : null}
              handleSelection={this.handleSelectUser}
              tooltipHeight={300}
            ></MainSelect>
            <div className={css.membersContent}>{membersElements}</div>
          </div>
          <MainButton handleClick={this.handleCancel}>Cancelar</MainButton>
          {saveButton}
        </div>
      );
    }
    return <div className={css.tooltipContainer}></div>;
  }
  render() {
    this.fk_process = this.props.fk_process ? this.props.fk_process : null;
    return (
      <div className={css.container} ref="groupButton">
        <MainButton
          handleClick={this.handleMainButtonClick}
          className={css.mainButton}
        >
          {this.props.name ? this.props.name : this.props.children}
        </MainButton>
        <MainTooltip
          align={this.props.align ? this.props.align : 'bottom-right'}
          inOutTime={350}
          action={this.state.tooltipAction}
          sizeSeparation={1}
          width="100%"
        >
          {this.getTooltipContent()}
        </MainTooltip>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }
  handleOutsideClick = event => {
    if (!this.refs.groupButton.contains(event.target)) {
      this.setState({ tooltipAction: 'hidding' });
    }
  };
  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
  // Main button
  toogleTooltipAction(tooltipAction) {
    if (this.props.tooltipAction === '') return 'unhidding';
    if (tooltipAction === 'unhidding') return 'hidding';
    return 'unhidding';
  }
  handleMainButtonClick = async () => {
    if (this.state.isInitialized === false) await this.initializeModal();
    this.setState(prevState => ({
      tooltipAction: this.toogleTooltipAction(prevState.tooltipAction)
    }));
  };
  initializeModal = () => {
    this.state.isInitialized = true;
    return new Promise(async (resolve, reject) => {
      let url = `${process.env.REACT_APP_API}/responsableusuario/getFromResponsible/${this.id}`;
      let options = { method: 'GET' };
      let server = await fetch(url, options).then(r => r.json());
      this.setState({ isInitialized: true });
      server.response.map(row => {
        this.savedData.members.push({
          text: row.usuario,
          value: row.id
        });
      });
      this.newData.members = [...this.savedData.members];
      resolve(server);
    });
  };
  // Tooltip
  handleDeleteMember = value => {
    this.newData.members = this.newData.members.filter(member => {
      return member.value !== value;
    });
    this.setState({});
  };
  handleSelectUser = (value, text) => {
    let alReadyHave = false;
    this.newData.members.map(member => {
      if (member.value === value) alReadyHave = true;
    });
    if (!alReadyHave) {
      this.newData.members.push({ value: value, text: text });
    }
    this.setState({});
  };
  handleCancel = () => {
    this.newData = { ...this.savedData };
    this.setState(prevState => ({
      tooltipAction: this.toogleTooltipAction(prevState.tooltipAction)
    }));
  };
  handleSave = () => {
    if (this.props.handleSave) {
      this.props.handleSave({
        id: this.id,
        name: this.newData.name,
        color: this.newData.color,
        description: this.newData.description,
        members: this.newData.members,
        isUpdate: this.newData.isUpdate,
        fk_process: this.fk_process
      });
    }
    this.setState({ tooltipAction: 'hidding' });
  };
  handleDelete = () => {
    if (this.props.handleDelete) this.props.handleDelete({ id: this.id });
  };
  handleChangeName = event => {
    this.newData.name = event.target.value;
    this.setState({});
  };
  handleChangeColor = event => {
    this.newData.color = event.target.value;
    this.setState({});
  };
  handleChangeDescription = event => {
    this.newData.description = event.target.value;
    this.setState({});
  };
}
