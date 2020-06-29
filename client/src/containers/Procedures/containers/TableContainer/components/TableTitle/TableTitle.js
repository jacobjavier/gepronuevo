import React from 'react';
import css from './TableTitle.module.css';

class TableTitle extends React.Component {
  render() {
    return (
      <div className={css.title}>
        <strong>{this.props.value ? this.props.value : 'Sin Valor'}</strong>
      </div>
    );
  }
}

export default TableTitle;
