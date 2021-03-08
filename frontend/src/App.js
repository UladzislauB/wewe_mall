import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopsPage from "./pages/shopspage/shopspage.component";
import Error404Page from "./pages/error404page/error404page.component";
import ProductDetailPageContainer from "./pages/product-detailpage/product-detailpage.container";

import { checkUserSession } from "./redux/user/user.actions";
import React from "react";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shops" component={ShopsPage} />
          <Route
            exact
            path="/products/:productId"
            component={ProductDetailPageContainer}
          />
          <Route component={Error404Page} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
