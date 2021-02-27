import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";

import "./shopspage.styles.scss";

import ShopsOverviewContainer from "../../components/shops-overview/shops-overview.container";

import { selectMenuItemAction } from "../../redux/header/header.actions";
import { fetchShopsStart } from "../../redux/shops/shops.actions";

class ShopsPage extends Component {
  componentDidMount() {
    const { selectMenuItem, fetchShopsStart } = this.props;
    selectMenuItem();
    fetchShopsStart();
  }
  render() {
    const { match } = this.props;
    return (
      <div className="shoppage">
        <Route path={`${match.path}`} component={ShopsOverviewContainer} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectMenuItem: () => dispatch(selectMenuItemAction("shops")),
  fetchShopsStart: () => dispatch(fetchShopsStart()),
});

export default connect(null, mapDispatchToProps)(ShopsPage);
