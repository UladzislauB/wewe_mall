import React, { Component } from "react";
import { connect } from "react-redux";

import { selectMenuItemAction } from "../../redux/header/header.actions";
import { fetchShopsStart } from "../../redux/shops/shops.actions";

class ShopsPage extends Component {
  componentDidMount() {
    const { selectMenuItem, fetchShopsStart } = this.props;
    selectMenuItem();
    fetchShopsStart();
  }
  render() {
    return <div>Shops</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectMenuItem: () => dispatch(selectMenuItemAction("shops")),
  fetchShopsStart: () => dispatch(fetchShopsStart()),
});

export default connect(null, mapDispatchToProps)(ShopsPage);
