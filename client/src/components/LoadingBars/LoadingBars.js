import React from 'react';
import css from './LoadingBars.module.css';
export default class LoadingBars extends React.Component {
  imageSrc = process.env.PUBLIC_URL + '/animations/loading.gif';
  render() {
    let style = {
      width: this.props.width ? this.props.width : null
    };
    return (
      <div className={css.Loading}>
        <img src={this.imageSrc} style={style} alt="Loading..." />
      </div>
    );
  }
}
