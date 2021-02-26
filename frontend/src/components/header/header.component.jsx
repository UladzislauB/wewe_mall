import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Menu } from "antd";

import { selectMenuItem } from "../../redux/header/header.selectors";

const Header = ({ menuItem }) => {
  return (
    <div className="header">
      <Menu mode="horizontal" selectedKeys={menuItem}>
        <Menu.Item key="home">
          <Link to="">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="about">About</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Link to="search">Search</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menuItem: selectMenuItem,
});

export default connect(mapStateToProps)(Header);
