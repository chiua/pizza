import React from 'react';
import './app.css';
import Menu from './menu';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <Menu></Menu>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
