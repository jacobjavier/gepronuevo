import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// CSS
import css from './MainLink.module.css';
class MainLink extends React.Component {
  render() {
    let element;
    if (this.props.children) {
      element = (
        <div className={css.link}>
          <div className={css.MainLink}>
            <div>{this.props.text}</div>
            <div className={css.linkList}>{this.props.children}</div>
          </div>
        </div>
      );
    } else {
      element = (
        <Link to={this.props.to} className={css.link}>
          <div className={css.MainLink}>
            <div>{this.props.text}</div>
          </div>
        </Link>
      );
    }
    return element;
  }
}
export default MainLink;
