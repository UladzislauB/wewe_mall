import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsShopListFetching } from "../../redux/shops/shops.selectors";
import ShopsOverview from "./shops-overview.component";
import withSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsShopListFetching,
});

const ShopsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(ShopsOverview);

export default ShopsOverviewContainer;
