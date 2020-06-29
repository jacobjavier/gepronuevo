import React from 'react';
import css from './BasicInput.module.css';

class BasicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: this.props.action ? this.props.action : ''
    };
    this.animationSize = '';
  }
  handleChange = event => {
    if (this.props.handleChange) {
      this.props.handleChange(event.target.value);
    }
  };
  handleBlur = () => {
    if (this.props.handleBlur) {
      this.props.handleBlur(
        this.props.id,
        this.props.value,
        this.props.savedValue
      );
    }
  };
  handleFocus = () => {
    this.props.handleFocus();
  };
  render() {
    let classNameImgCont = [css.imageContainer];
    let classNameInput = [css.inputText];
    let imgSrc = '';
    switch (this.props.animationSize) {
      case 'in':
        classNameImgCont.push(css.animShowImg);
        classNameInput.push(css.animSizeIn);
        break;
      case 'out':
        classNameImgCont.push(css.animHideImg);
        classNameInput.push(css.animSizeOut);
      default:
        break;
    }
    switch (this.props.action) {
      case 'loading':
        imgSrc = process.env.PUBLIC_URL + '/svg/basicLoading.svg';
        break;
      case 'editing':
        imgSrc = process.env.PUBLIC_URL + '/icons/pencil.png';
        break;
      case 'allGreen':
        imgSrc = process.env.PUBLIC_URL + '/svg/ok.gif';
        break;
      case 'normal':
        imgSrc = process.env.PUBLIC_URL + '/icons/pencil.png';
      default:
        break;
    }
    let stateIcon = (
      <div className={classNameImgCont.join(' ')}>
        <img className={css.loader} src={imgSrc} alt="Cargando" />
      </div>
    );
    return (
      <div className={css.inputContainer}>
        <input
          style={{
            backgroundColor: this.props.color ? this.props.color : '#11111122'
          }}
          className={classNameInput.join(' ')}
          type={this.props.type}
          value={this.props.value ? this.props.value : ''}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {stateIcon}
      </div>
    );
  }
}

export default BasicInput;
