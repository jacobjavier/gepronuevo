import React from 'react';
// Main
import css from './Procedures.module.css';
// Components
import MainInput from './../../components/MainInput/MainInput';
import TableCell from './containers/TableContainer/containers/TableCell/TableCell';
import MainButton from './../../components/MainButton/MainButton';
import MainSelect from './../../components/MainSelect/MainSelect';
import MainTooltip from './../../components/MainTooltip/MainTooltip';
import LoadingBars from './../../components/LoadingBars/LoadingBars';
// Utilities
import GetEvents from './utilities/GetEvents';
import ParseEventCell from './utilities/ParseEventCell';
import GetProceduresOptions from './utilities/GetProceduresOptions';
import TableContainer from './containers/Table/TableContainer';

/*------------------------select procedures---------------------------------*/
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class Procedures extends React.Component {
  constructor(props) {
    super(props);
    this.newEventKey = null;
    this.processId = null;
    this.state = {
      processId: null,
      table: 'inactive',
      page: 'loading',
      submenu: 'inactive',
      tooltipAddAction: 'hidding'
    };
    GetProceduresOptions().then(arrayProcedures => {
      this.procedures = arrayProcedures;
      this.setState({ page: 'active' });
    });
    this.events = [];
  }
  createMenuContainer() {//esta parte esta comentada la seccion del segundo div 
    return (
      <>
        <h1 className={css.title}>Seleccionar Proceso</h1>
        <div className={css.selectContainer}>
          <MainSelect
            options={this.procedures ? this.procedures : []}
            width="100%"
            tooltipHeight="300px"
            handleSelection={this.handleSelectProcedure}
          ></MainSelect>
        </div> 
        
      

        
        <div className={css.menu}>
          
          {/* <h3>Ver historico</h3> }
          { <MainInput></MainInput> }
          { <h3>Desde</h3> }
          { <MainInput></MainInput> }
          { <h3>Hasta</h3> }
    {<MainInput></MainInput>
    */ }
    
    
        </div>
      </>
    );
  }
  
  createTableContainer() {
    switch (this.state.table) {
      case 'inactive':
        return null;
      case 'active':
        return (
          <TableContainer
            processId={this.processId}
            events={this.events}
            handleUpdateStatus={this.handleUpdateStatus}
            handleUpdateValue={this.handleUpdateValue}
          ></TableContainer>
        );
      case 'loading':
        return <LoadingBars width="150px"></LoadingBars>;
      default:
        break;
    }
  }
  createSubmenuContainer() {
    switch (this.state.submenu) {
      case 'active':
        let classNames = [css.submenu, css.animOpacityIn];
        return (
          <div className={classNames.join(' ')}>
            <div className={css.addBtn}>
              <MainButton onClick={this.toogleTooltipAction}>
                {this.state.tooltipAddAction === 'hidding'
                  ? 'Agregar'
                  : 'Cancelar'}
              </MainButton>
              <MainTooltip
                action={this.state.tooltipAddAction}
                align="top-center"
                width="80%"
                sizeSeparation={5}
              >
                <div className={css.addContainer}>
                  <h3>Nuevo evento</h3>
                  <div>Clave de identificación</div>
                  <MainInput
                    handleChange={this.handleChangeNewEvent}
                    value={this.newEventKey}
                  ></MainInput>
                  <MainButton
                    handleClick={() => {
                      this.setState({ tooltipAddAction: 'hidding' });
                    }}
                  >
                    Cancelar
                  </MainButton>
                  <MainButton handleClick={this.handleClickSave}>
                    Agregar
                  </MainButton>
                </div>
              </MainTooltip>
            </div>
          </div>
        );
      case 'inactive':
        return null;
      case 'loading':
        return 'loading';
      default:
        return null;
    }
  }
  render() {
    if (this.state.page === 'active') {
      let classNames = [css.procedures, css.animOpacityIn];
      return (
        <div className={classNames.join(' ')}>
          {this.createMenuContainer()}
          {this.createTableContainer()}
          {this.createSubmenuContainer()}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
  toogleTooltipAction = () => {
    if (this.state.tooltipAddAction === 'hidding') {
      this.setState({ tooltipAddAction: 'unhidding' });
    } else {
      this.setState({ tooltipAddAction: 'hidding' });
    }
  };
  // EVENTS
  handleChangeNewEvent = event => {
    this.newEventKey = event.target.value;
    this.setState({});
  };
  handleClickSave = async event => {
    this.setState({ submenu: 'loading' });
    let options = {
      method: 'POST',
      body: JSON.stringify({
        processId: this.state.processId,
        userId: localStorage.getItem('userid'),
        keyEvent: this.newEventKey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let createUrl = `${process.env.REACT_APP_API}/evento/create`;
    let jsonResponse = await fetch(createUrl, options).then(r => r.json());
    if (jsonResponse.status === 200) {
      let newCell = ParseEventCell(jsonResponse.response);
      this.events.splice(1, 0, newCell);
    } else {
      console.log('ERROR:', jsonResponse);
      alert(jsonResponse.message);
    }
    this.setState({ submenu: 'active' });
    this.toogleTooltipAction();
  };
  handleSelectProcedure = async value => {
    this.processId = value;
    this.setState({ table: 'loading', submenu: 'inactive' });
    // TableContainer(value);
    this.events = await GetEvents(value);
    this.events = this.events.temp;
    this.setState({
      processId: value,
      table: 'active',
      submenu: 'active'
    });
  };
  handleUpdateStatus = (eventIdx, columnIdx, newStatus) => {
    this.events[eventIdx].map((cell, cellIDX) => {
      this.events[eventIdx][cellIDX].eventStatus = newStatus;
    });
    this.setState({});
  };
  handleUpdateValue = (eventIdx, columnIdx, newValue) => {
    this.events[eventIdx][columnIdx].value = newValue;
    this.setState({});
  };
}
