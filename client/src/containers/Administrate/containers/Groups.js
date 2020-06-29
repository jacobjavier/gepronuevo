import React from 'react';
import css from './Groups.module.css';
import GroupButton from '../components/GroupButton';

export default class Groups extends React.Component {
  abortController = new AbortController();
  constructor(props) {
    super(props);
    this.jsonGroups = {};
  }
  handleGroupSave = data => {
    let saveUrl;
    let optionsBody = { ...data };
    if (data.isUpdate === true) {
      saveUrl = `${process.env.REACT_APP_API}/responsable/update`;
    } else {
      saveUrl = `${process.env.REACT_APP_API}/responsable/create`;
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
          this.jsonGroups[jsonResponse.request_data.id] =
            jsonResponse.request_data;
          jsonResponse.request_data['value'] = jsonResponse.request_data.id;
          jsonResponse.request_data['text'] = jsonResponse.request_data.name;
          let responseId = jsonResponse.request_data.id;
          this.jsonGroups[responseId] = jsonResponse.request_data;
        } else {
          console.log('jsonResponse', jsonResponse); //se agrego log en consola
        }
        this.setState({});
      });
  };
  handleDelete = async data => {
    let saveUrl = `${process.env.REACT_APP_API}/responsable/delete`;
    let optionsBody = {
      signal: this.abortController.signal,
      method: 'POST',
      body: JSON.stringify({ id: data.id }),
      headers: { 'Content-Type': 'application/json' }
    };
    let jsonResponse = await fetch(saveUrl, optionsBody).then(r => r.json());
    if (jsonResponse.status === 200) {
      if (this.jsonGroups[data.id]) delete this.jsonGroups[data.id];
    }
    this.setState({});
  };
  render() {
    this.jsonGroups = this.props.jsonGroups ? this.props.jsonGroups : {};
    let content = [];
    let jsonGroupsLenght = Object.keys(this.jsonGroups).length;
    if (jsonGroupsLenght > 0) {
      Object.keys(this.jsonGroups).map((groupId, groupIdx) => {
        let group = this.jsonGroups[groupId];
        let position = 'center-right';
        if (groupIdx < 4) position = 'bottom-right';
        if (groupIdx > jsonGroupsLenght - 6 && jsonGroupsLenght > 11) {
          position = 'top-right';
        }
        content.push(
          <GroupButton
            color={group.color}
            description={group.description}
            handleDelete={this.handleDelete}
            handleSave={this.handleGroupSave}
            responsibleType={group.responsibleType}
            responsiblesTypes={this.props.responsiblesTypes}
            id={groupId}
            key={groupId}
            name={group.name}
            align={position}
            fk_process={group.fk_process}
            users={this.props.jsonUsers ? this.props.jsonUsers : null}
          ></GroupButton>
        );
      });
    }
    return (
      <div className={css.groups}>
        <GroupButton
          fk_process={this.props.dataProcess ? this.props.dataProcess.id : 0}
          handleSave={this.handleGroupSave}
          tooltipPosition="bottom-right"
          users={this.props.jsonUsers ? this.props.jsonUsers : null}
        >
          Agregar
        </GroupButton>
        {content}
      </div>
    );
  }
  componentWillUnmount() {
    this.abortController.abort();
  }
}
