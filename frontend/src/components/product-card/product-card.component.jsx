import { Card } from "antd";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => (
  <Card
    className="product-card"
    hoverable
    cover={<img className="product-card__image" src={product.images[0].image} alt="" />}
  >
    <Card.Meta title={product.name} />
  </Card>
);

export default ProductCard;
