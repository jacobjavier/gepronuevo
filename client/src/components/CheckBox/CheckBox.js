import React from 'react';

import css from './CheckBox.module.css';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOn: false};
  }
  
  handleToggle(e) {
    this.setState({isOn: !this.state.isOn});
  }
  
  render() {
    let classNames = [css.component_wrapper, (this.state.isOn) ? css.component_wrapper_is_light : css.component_wrapper_is_dark].join(" ");
    
    let switchClassNames = ["switch", (this.props.isOn) ? css.switch_is_on : css.switch_is_off ].join(" "); 

    let toggleClassNames = ["toggle-button", (this.props.isOn) ? "toggle-button_position-right" : "toggle-button_position-left"].join(" ");
   
    return (<>  
            <div className={toggleClassNames} isOn={this.props.isOn} > 
              <input type="checkbox"></input>
            </div> 
        </>
    );
  }
}

 
 

export default  CheckBox;