import React from 'react';
import css from './TableSubtitle.module.css';

export default class TableSubtitle extends React.Component {
  render() {
    return (
      <div className={css.subtitle}>
        <strong>{this.props.value ? this.props.value : 'Sin Valor'}</strong>
      </div>
    );
  }
}
