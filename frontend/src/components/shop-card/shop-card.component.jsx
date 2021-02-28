import { Col } from "antd";
import { useHistory, useRouteMatch } from "react-router";

import "./shop-card.styles.scss";

const ShopCard = ({ span, shop }) => {
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <Col className="shopcard" span={span} onClick={() => history.push(`${match.path}/${shop.id}`)}>
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
