import React from 'react';
import css from './ColumnButton.module.css';
import MainButton from './../../../components/MainButton/MainButton';
import MainTooltip from './../../../components/MainTooltip/MainTooltip';
import MainInput from './../../../components/MainInput/MainInput';
import MainSelect from './../../../components/MainSelect/MainSelect';

export default class ColumnButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id ? this.props.id : null;
    this.name = this.props.name ? this.props.name : '';
    this.textButton = this.props.textButton ? this.props.textButton : this.name;
    this.type = this.props.type ? this.props.type : '';
    this.order = this.props.order ? this.props.order : '';
    this.group = this.props.group ? this.props.group : '';
    this.status = this.props.status ? this.props.status : '';
    this.isObligatory = this.props.isObligatory ? this.props.isObligatory : 0;
    this.description = this.props.description ? this.props.description : '';
    this.isUpdate = this.props.id ? true : false;
    this.state = {
      tooltipAction: ''
    };
  }
  createTooltipContent() {
    // Options
    let selectsOptions = this.props.selectsOptions
      ? this.props.selectsOptions
      : {};
    let saveElements;
    if (this.isUpdate === true) {
      saveElements = (
        <div className={css.saveButtons}>
          <MainButton handleClick={this.handleSave}>Actualizar</MainButton>
          <MainButton handleClick={this.handleDelete}>Eliminar</MainButton>
        </div>
      );
    } else {
      saveElements = (
        <MainButton handleClick={this.handleSave}>Agregar</MainButton>
      );
    }
    let element = (
      <div className={css.tooltip}>
        <h3 className={css.title}>Columna</h3>
        <div>Nombre</div>
        <MainInput
          name="name"
          value={this.name}
          handleChange={this.handleInputChange}
        ></MainInput>
        <div>Tipo</div>
        <MainSelect
          name="type"
          options={selectsOptions.types}
          handleSelection={this.handleSelection}
          value={this.type}
        />
        <div>Orden</div>
        <MainInput
          name="order"
          value={this.order} //agregar auto increment para nuevas partidas
          handleChange={this.handleInputChange}
        ></MainInput>
        <div>Responsable</div>
        <MainSelect
          name="group"
          options={selectsOptions.groups}
          handleSelection={this.handleSelection}
          value={this.group}
        ></MainSelect>
        <div>Estatus</div>
        <MainSelect
          name="status"
          options={selectsOptions.status}
          handleSelection={this.handleSelection}
          value={this.status}
        ></MainSelect>
        <div>Es Obligatorio</div>
        <MainSelect
          name="isObligatory"
          options={selectsOptions.isObligatory}
          handleSelection={this.handleSelection}
          value={this.isObligatory}
        ></MainSelect>
        <div>Descripcion</div>
        <MainInput
          name="description"
          value={this.description}
          handleChange={this.handleInputChange}
        />
        <MainButton handleClick={this.handleCancelButton}>Cancelar</MainButton>
        {saveElements}
      </div>
    );
    if (this.state.tooltipAction === 'unhidding') {
      return element;
    }
    return <div className={css.tooltip}></div>;
  }
  render() {
    this.process = this.props.process ? this.props.process : '';
    return (
      <div className={css.column} ref="column">
        <MainButton handleClick={this.handleMainButtonClick}>
          {this.textButton}
        </MainButton>
        <MainTooltip
          action={this.state.tooltipAction}
          align={this.props.align ? this.props.align : 'bottom-left'}
          inOutTime={350}
          sizeSeparation={1}
        >
          {this.createTooltipContent()}
        </MainTooltip>
      </div>
    );
  }
  handleMainButtonClick = () => {
    let tooltipAction = 'unhidding';
    if (this.state.tooltipAction === 'unhidding') tooltipAction = 'hidding';
    if (this.state.tooltipAction === '') tooltipAction = 'unhidding';
    this.setState({ tooltipAction: tooltipAction });
  };
  handleInputChange = (event, compName) => {
    this[compName] = event.target.value;
    this.setState({});
  };
  handleSelection = (value, text, selectName) => {
    this[selectName] = value;
    this.setState({});
  };
  handleCancelButton = () => {
    this.setState({ tooltipAction: 'hidding' });
  };
  //incluir aqui update para las nuevas partidas 
  handleSave = () => {
    if (this.props.handleSave) {
      this.props.handleSave({
        id: this.id,
        nombre: this.name,
        textButton: this.textButton,
        fk_tipo: this.type,
        orden: this.order,
        fk_responsable: this.group,
        fk_estatus: this.status,
        es_obligatorio: this.isObligatory,
        descripcion: this.description,
        fk_proceso: this.process,
        isUpdate: this.isUpdate
      });
    }
    this.setState({ tooltipAction: 'hidding' });
  };
  handleDelete = () => {
    if (this.props.handleDelete) this.props.handleDelete(this.id);
    this.setState({ tooltipAction: 'hidding' });
  };
  componentDidMount = () => {
    document.addEventListener('click', this.handleOutsideClick);
  };
  handleOutsideClick = event => {
    if (!this.refs.column.contains(event.target)) {
      this.setState({ tooltipAction: 'hidding' });
    }
  };
  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleOutsideClick);
  };
}
