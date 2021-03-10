import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Menu, Button, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

import "./header.styles.scss";

import { selectMenuItem } from "../../redux/header/header.selectors";
import {
  selectIsFetching,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";
import React from "react";

const Header = ({ menuItem, isLoading, currentUser, signOutStart }) => {
  const menuForAuthenticatedUser = (
    <Menu>
      <Menu.Item key="logout" onClick={() => signOutStart()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuForNotAuthenticatedUser = (
    <Menu>
      <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
      <Menu.Item key="sign-up"><Link to="/login">Sign Up</Link></Menu.Item>
    </Menu>
  );
  return (
    <div
      className="header"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Menu mode="horizontal" selectedKeys={menuItem} className="menu">
        <Menu.Item key="home">
          <Link to="">Home</Link>
        </Menu.Item>
        <Menu.Item key="shops">
          <Link to="/shops">Shops</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Link to="/search">Search</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
      <Dropdown
        overlay={
          currentUser ? menuForAuthenticatedUser : menuForNotAuthenticatedUser
        }
        placement="bottomRight"
      >
        <Button
          className="user-button"
          loading={isLoading}
          icon={<DownOutlined />}
        >
          {isLoading ? null : <UserOutlined />}
        </Button>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menuItem: selectMenuItem,
  isLoading: selectIsFetching,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
