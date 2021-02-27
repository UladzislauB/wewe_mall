import { Col } from "antd";

import "./shop-card.styles.scss";

const ShopCard = ({ span, shop }) => {
  return (
    <Col className="shopcard" span={span}>
      <div
        className="shopcard__background"
        style={{ backgroundColor: shop.color_hex }}
      >
        <div className="shopcard__content">
          <h1 className="shopcard__name">{shop.name}</h1>
        </div>
      </div>
    </Col>
  );
};

export default ShopCard;
