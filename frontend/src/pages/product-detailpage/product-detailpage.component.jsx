import { connect } from "react-redux";

import { selectProductById } from "../../redux/products/products.selectors";

const ProductDetailPage = ({ product }) => <h1>{product}</h1>;

const mapStateToProps = (state, ownProps) => ({
  product: selectProductById(ownProps.match.params.productId)(state),
});

export default connect(mapStateToProps)(ProductDetailPage);
