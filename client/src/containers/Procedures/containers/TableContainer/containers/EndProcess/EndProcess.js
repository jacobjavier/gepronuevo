import React from 'react';
// components
import MainButton from './../../../../../../components/MainButton/MainButton';
export default class EndProcess extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.eventStatus = this.props.eventStatus ? this.props.eventStatus : null;
    let backgroundColor = this.props.color ? this.props.color : '#000000';
    let style = {
      backgroundColor: `${backgroundColor}33`,
      color: 'var(--color-dark)',
      border: '1px solid var(--color-dark)',
      height: '22px'
    };
    //aqui se editan el estado de las filas de cada proceso
    let text = 'Finalizar Proceso';
    if (this.eventStatus === null) return null;
    if (this.eventStatus === 3) text = 'Reabrir Proceso';
    return (
      <MainButton style={style} handleClick={this.handleClick}>
        {text}
      </MainButton>
    );
  }
  handleClick = async event => {
    let urlUpdate = `${process.env.REACT_APP_API}/evento/update/status`;
    let newStatus = 3;
    if (this.eventStatus === 3) newStatus = 1;
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: this.props.eventId,
        status: newStatus
      })
    };
    let updateResponse = await fetch(urlUpdate, options).then(r => r.json());
    if (this.props.handleUpdate) {
      this.props.handleUpdate(this.props.rowIdx, this.props.cellIdx, newStatus);
    }
  };
}
