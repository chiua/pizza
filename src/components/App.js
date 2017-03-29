import React from 'react';
import './app.css';
import Menu from './menu';
import Cart from './cart';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <Menu></Menu>
        <Cart></Cart>
      </div>
      );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
