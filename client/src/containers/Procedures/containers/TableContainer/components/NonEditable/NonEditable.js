import React from 'react';
import css from './NonEditable.module.css';
class NonEditable extends React.Component {
  render() {
    let content = 'Campo no editable';
    let borderColor = 'var(--color-dark)';
    if (this.props.value) {
      content = this.props.value;
    }
    return (
      <div
        className={css.NonEditable}
        style={{
          backgroundColor: `${this.props.color}CA`,
          color: borderColor,
          borderColor: borderColor
        }}
      >
        {content}
      </div>
    );
  }
}
export default NonEditable;
