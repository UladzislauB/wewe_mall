import React, { Component } from "react";
import { connect } from "react-redux";

import { selectMenuItemAction } from "../../redux/header/header.actions";

class HomePage extends Component {
  componentDidMount() {
    const { selectMenuItem } = this.props;
    selectMenuItem("home");
  }

  render() {
    console.log("Shit");
    return <div>Home</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectMenuItem: (item) => dispatch(selectMenuItemAction(item)),
});

export default connect(null, mapDispatchToProps)(HomePage);
