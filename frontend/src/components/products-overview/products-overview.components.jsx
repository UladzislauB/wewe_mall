import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./products-overview.styles.scss";
import ProductCard from "../product-card/product-card.component";

import { selectProductsForOverview } from "../../redux/products/products.selectors";

const ProductOverview = ({ products }) => (
  <div className="products">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  products: selectProductsForOverview,
});

export default connect(mapStateToProps)(ProductOverview);
