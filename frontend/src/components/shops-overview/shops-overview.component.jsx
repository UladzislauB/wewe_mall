import { Row } from "antd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./shops-overview.styles.scss";
import ShopCard from "../shop-card/shop-card.component";

import { selectShopsForOverview } from "../../redux/shops/shops.selectors";

const ShopsOverview = ({ shops }) => {
  return (
    <div className="shops-overview">
      <Row gutter={20}>
        {shops.slice(0, 3).map((shop) => (
          <ShopCard key={shop.id} span={8} shop={shop} />
        ))}
      </Row>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shops: selectShopsForOverview,
});

export default connect(mapStateToProps)(ShopsOverview);
