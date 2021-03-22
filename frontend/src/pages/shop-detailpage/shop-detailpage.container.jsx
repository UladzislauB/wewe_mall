import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ShopDetailPage from "./shop-detailpage.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";

import { selectIsShopListLoaded } from "../../redux/shops/shops.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsShopListLoaded(state),
});

const ShopDetailPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(ShopDetailPage);

export default ShopDetailPageContainer;
