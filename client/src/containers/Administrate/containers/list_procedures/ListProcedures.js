import React from 'react';
import css from './ListProcedures.module.css';
// Components
import MainButton from './../../../../components/MainButton/MainButton';
import MainInput from './../../../../components/MainInput/MainInput';
import NewProcess from './../NewProcess/NewProcess';
import LoadingBars from './../../../../components/LoadingBars/LoadingBars';
export default class ListProcedures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'loading'
    };
    this.processes = [];
  }
  async getData() {
    let processUrl = `${process.env.REACT_APP_API}/proceso/get/administrables`;
    let options = {
      method: 'POST',
      body: JSON.stringify({
        userId: localStorage.getItem('userid')
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      let processesRes = await fetch(processUrl, options).then(r => r.json());
      if (processesRes.status === 200) {
        this.processes = processesRes.response;
      } else {
        throw processesRes.message;
      }
      this.setState({ action: 'active' });
    } catch (error) {
      console.log(error);
    }
  }
  handleClick = (event, processId) => {
    if (this.props.handleProcedureClick) {
      this.props.handleProcedureClick(processId);
    }
  };
  createButtonProcedure = (id, text, key) => {
    return (
      <div key={key}>
        <MainButton
          onClick={e => {
            this.handleClick(e, id);
          }}
        >
          {text}
        </MainButton>
      </div>
    );
  };
  handleAddClick = event => {
    this.setState({ action: 'loading' });
  };
  handleAdd = newProcess => {
    this.processes.splice(0, 0, newProcess);
    this.setState({ action: 'active' });
  };
  activeView() {
    let urlElements = [];
    this.processes.map((process, processIdx) => {
      if (typeof this.props.isNew !== 'undefined') {
        urlElements.push(
          this.createButtonProcedure(process.id, process.nombre, processIdx)
        );
      }
    });
    return (
      <div className={css.list}>
        <div>
          <h2>Crear proceso</h2>
          <NewProcess
            handleAdd={this.handleAdd}
            handleClick={this.handleAddClick}
          ></NewProcess>
        </div>
        <div>
          <h2>Editar</h2>
          <div className={css.listContent}>{urlElements}</div>
        </div>
      </div>
    );
  }
  render() {
    switch (this.state.action) {
      case 'loading':
        return <LoadingBars></LoadingBars>;
      case 'active':
        return this.activeView();
      default:
        return 'Error en los estados';
    }
  }
  componentDidMount() {
    this.getData();
  }
}
