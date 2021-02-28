import { connect } from "react-redux";

import "./shop-detailpage.styles.scss";

import { selectShopById } from "../../redux/shops/shops.selectors";

const ShopDetailPage = ({ shop }) => {
  console.log(shop);
  return shop ? (
    <div
      className="shop-detailpage"
      style={{ backgroundColor: `${shop.color_hex}` }}
    >
      <div className="shop-detailpage__content">
        <h1 className="shop-detailpage__name">{shop.name}</h1>
      </div>
    </div>
  ) : <h1>Error 404 not found</h1>;
};

const mapStateToProps = (state, ownProps) => ({
  shop: selectShopById(ownProps.match.params.shopId)(state),
});

export default connect(mapStateToProps)(ShopDetailPage);
