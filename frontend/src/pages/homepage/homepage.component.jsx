import React, { Component } from "react";
import { connect } from "react-redux";

import { selectMenuItemAction } from "../../redux/header/header.actions";

class HomePage extends Component {
  componentDidMount() {
    const { selectMenuItem } = this.props;
    selectMenuItem();
  }

  render() {
    return <div>Home</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectMenuItem: () => dispatch(selectMenuItemAction("home")),
});

export default connect(null, mapDispatchToProps)(HomePage);
