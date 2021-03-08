import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopsPage from "./pages/shopspage/shopspage.component";
import Error404Page from "./pages/error404page/error404page.component";
import ProductDetailPageContainer from "./pages/product-detailpage/product-detailpage.container";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const { currentUser } = this.props;
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
          <Route
            exact
            path="/login"
            component={SignInAndSignUpPage}
            // render={() => currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}
          />
          <Route component={Error404Page} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
