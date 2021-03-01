import React from "react";
import { connect } from "react-redux";

import "./shop-detailpage.styles.scss";
import Error404Page from "../error404page/error404page.component";

import { selectShopById } from "../../redux/shops/shops.selectors";
import { fetchProductsByShopStart } from "../../redux/products/products.actions";

class ShopDetailPage extends React.Component {
  componentDidMount() {
    const { shop, fetchProductsByShopStart } = this.props;
    fetchProductsByShopStart(shop.id);
  }

  render() {
    const { shop } = this.props;
    return shop ? (
      <div
        className="shop-detailpage"
        style={{ backgroundColor: `${shop.color_hex}` }}
      >
        <div className="shop-detailpage__content">
          <h1 className="shop-detailpage__name">{shop.name}</h1>
        </div>
      </div>
    ) : (
      <Error404Page />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  shop: selectShopById(ownProps.match.params.shopId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsByShopStart: (shopId) => dispatch(fetchProductsByShopStart(shopId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailPage);
