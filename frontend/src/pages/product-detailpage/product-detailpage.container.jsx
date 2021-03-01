import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProductDetailPage from "./product-detailpage.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";

import { selectIsProductListLoaded } from "../../redux/products/products.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsProductListLoaded(state),
});

const ProductDetailPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(ProductDetailPage);

export default ProductDetailPageContainer;
