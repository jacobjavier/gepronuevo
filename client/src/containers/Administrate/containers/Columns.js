import React from 'react';
import css from './Columns.module.css';
import ColumnButton from '../components/ColumnButton';

export default class Columns extends React.Component {
  constructor(props) {
    super(props);
  }
  handleColumnSave = data => {
    let saveUrl;
    let optionsBody = { ...data };
    if (data.isUpdate === true) {
      saveUrl = `${process.env.REACT_APP_API}/columna/update`;
    } else {
      saveUrl = `${process.env.REACT_APP_API}/columna/create`;
    }
    let options = {
      method: 'POST',
      body: JSON.stringify(optionsBody),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(saveUrl, options)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.status === 200) {
          this.jsonColumns[jsonResponse.request_data.id] =
            jsonResponse.request_data;
          if (this.props.handleCreateColumn) {
            jsonResponse.request_data['value'] = jsonResponse.request_data.id;
            jsonResponse.request_data['text'] = jsonResponse.request_data.name;
            this.props.handleCreateColumn(jsonResponse.request_data);
          }
        } else {
          //console.log('jsonResponse', jsonResponse);
        }
        this.setState({});
      });
  };
  handleColumnDelete = async id => {
    let url = `${process.env.REACT_APP_API}/columna/delete`;
    let options = {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    };
    let deleteResponse = await fetch(url, options).then(r => r.json());
    if (deleteResponse.status === 200) {
      // if (this.handleColumnDelete) this.handleColumnDelete(id);
      if (this.jsonColumns[id]) delete this.jsonColumns[id];
      this.setState({});
    }
  };
  createButtons(data) {
    let buttons = [];
    this.jsonColumns = this.props.data.columns ? this.props.data.columns : [];
    let jsonColumnsLenght = Object.keys(this.jsonColumns).length;
    Object.keys(this.jsonColumns).map((columnId, columnIdx) => {
      let position = 'center-left';
      if (columnIdx < 4) position = 'bottom-left';
      if (columnIdx > jsonColumnsLenght - 7 && jsonColumnsLenght > 11) {
        position = 'top-left';
      }
      let column = this.jsonColumns[columnId];
      buttons.push(
        <ColumnButton
          align={position}
          key={columnIdx}
          id={column.id}
          name={column.name}
          textButton={column.name}
          selectsOptions={this.props.data ? this.props.data : null}
          type={column.idType}
          order={column.order}
          handleSave={this.handleColumnSave}
          handleDelete={this.handleColumnDelete}
          group={column.idResponsible}
          status={column.fkStatus}
          isObligatory={column.isObligatory}
          description={column.description}
          process={this.props.data.process.id}
        ></ColumnButton>
      );
    });
    return buttons;
  }
  render() {
    let buttons;
    let process;
    if (this.props.data) {
      buttons = this.createButtons(this.props.data);
      process = this.props.data.process.id;
    }
    return (
      <div className={css.columns}>
        <ColumnButton
          textButton="Agregar Columna"
          selectsOptions={this.props.data ? this.props.data : null}
          handleSave={this.handleColumnSave}
          handleDelete={this.handleColumnDelete}
          process={process}
        ></ColumnButton>
        {buttons}
      </div>
    );
  }
}
