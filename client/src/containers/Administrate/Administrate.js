import React from 'react';
// Components
import LoadingBars from './../../components/LoadingBars/LoadingBars';
import MainButton from '../../components/MainButton/MainButton';
import MainInput from '../../components/MainInput/MainInput';
import MainModal from './../../components/MainModal/MainModal';
// Utilities
import Groups from './containers/Groups';
import GetDataColumns from './utilities/GetDataColumns';
import ParseServerColumn from './utilities/ParserServerColumn';
// Main css
import css from './Administrate.module.css';
// Conteiners
import ListProcedures from './containers/list_procedures/ListProcedures';
import Columns from './containers/Columns';

export default class Administrate extends React.Component {
  abortController = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      action: 'starting'
    };
    this.id = this.props.id ? this.props.id : null;
    this.name = '';
    this.description = '';
    this.fk_estatus = 1;
  }
  async getData() {
    let processUrl = `${process.env.REACT_APP_API}/proceso/get/avaibles`;
    try {
      let processesResponse = await fetch(processUrl).then(r => r.json());
      if (processesResponse.status === 200) {
        this.processes = processesResponse.response;
      } else {
        throw processesResponse.message;
      }
      this.setState({ action: 'active' });
    } catch (error) {
      console.log(error);
    }
  }
  handleChangeProcessName = event => {
    this.name = event.target.value;
    this.setState({});
  };
  handleChangeProcessDescription = event => {
    this.description = event.target.value;
    this.setState({});
  };
  handleOnBlurInput = (event, name) => {
    let saveUrl = `${process.env.REACT_APP_API}/proceso/update`;
    let optionsBody = {
      signal: this.abortController.signal,
      method: 'POST',
      body: JSON.stringify({
        id: this.id,
        nombre: this.name,
        descripcion: this.description,
        fk_estatus: this.fk_estatus
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    let jsonResponse = fetch(saveUrl, optionsBody).then(r => r.json());
  };
  handleDeleteProcess = event => {
    let saveUrl = `${process.env.REACT_APP_API}/proceso/delete`;
    let options = {
      signal: this.abortController.signal,
      method: 'POST',
      body: JSON.stringify({ id: this.id }),
      headers: { 'Content-Type': 'application/json' }
    };
    let jsonResponse = fetch(saveUrl, options).then(r => r.json());
    this.setState({ action: 'starting' });
  };
  createFirstInputs() {
    return (
      <>
        <h3>Nombre</h3>
        <h3>Descripcion</h3>
        <MainInput
          key="name"
          name="name"
          value={this.name}
          handleChange={this.handleChangeProcessName.bind(this)}
          handleBlur={this.handleOnBlurInput.bind(this)}
        ></MainInput>
        <MainInput
          key="description"
          name="description"
          value={this.description}
          handleChange={this.handleChangeProcessDescription.bind(this)}
          handleBlur={this.handleOnBlurInput.bind(this)}
        ></MainInput>
        <MainButton
          handleClick={this.handleDeleteProcess}
          className={css.delete}
        >
          Eliminar
        </MainButton>
      </>
    );
  }
  handleCreateColumn = newColumn => {
    this.data.columns[newColumn.id] = ParseServerColumn(newColumn);
    this.setState({});
  };
  handleColumnDelete = id => {
    delete this.data.columns[id];
    this.setState({});
  };
  createMenu() {
    let element;
    if (this.id === null) {
      element = (
        <ListProcedures
          isNew={true}
          handleProcedureClick={this.handleProcedureClick}
        ></ListProcedures>
      );
    }
    element = (
      <ListProcedures
        isNew={false}
        handleProcedureClick={this.handleProcedureClick}
      ></ListProcedures>
    );
    return element;
  }
  handleProcedureClick = processId => {
    console.log('handleProcedureClick', processId);
    this.id = processId;
    this.setState({ action: 'loading' });
  };
  render() {
    switch (this.state.action) {
      case 'loading':
        this.getInfo();
        return (
          <div className={css.Administrate}>
            {this.createMenu()}
            <LoadingBars width="250px"></LoadingBars>
          </div>
        );
      case 'starting':
        return <div className={css.Administrate}>{this.createMenu()}</div>;
      case 'active':
        return (
          <div className={css.Administrate}>
            {this.createMenu()}
            <div className={css.CreateProcedure}>
              <h2 className={css.title}>
                {this.id === -1 ? 'Nuevo proceso' : this.name}
              </h2>
              {this.createFirstInputs()}
              <h3>Grupos Responsables</h3>
              <h3>Columnas</h3>
              <Groups
                responsiblesTypes={
                  this.data ? this.data.responsiblesTypes : null
                }
                dataProcess={this.data ? this.data.process : null}
                jsonGroups={this.data ? this.data.groups : null}
                jsonUsers={this.data ? this.data.users : null}
              ></Groups>
              <Columns
                data={this.data ? this.data : null}
                handleCreateColumn={this.handleCreateColumn}
              ></Columns>
            </div>
          </div>
        );
      default:
        break;
    }
  }
  getInfo() {
    GetDataColumns(this.id).then(dataColumns => {
      this.data = dataColumns;
      this.id = this.data.processData.id;
      this.name = this.data.processData.nombre;
      this.description = this.data.processData.descripcion;
      this.fk_estatus = this.data.processData.fk_estatus;
      this.setState({ action: 'active' });
    });
  }
}
