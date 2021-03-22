import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProductOverview from "./products-overview.components";
import withSpinner from "../with-spinner/with-spinner.component";
import { selectIsProductListFetching } from "../../redux/products/products.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsProductListFetching,
});

const ProductOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(ProductOverview);

export default ProductOverviewContainer;
