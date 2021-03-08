import { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./sign-in.styles.scss";

import { selectSignInError } from "../../redux/user/user.selectors";
import { signInStart } from "../../redux/user/user.actions";

const SignIn = ({ signInError, signInStart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email && password) signInStart({ email, password });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
    >
      <h2 className="title">I already have an accoount</h2>
      <span>Sign in with your email and password</span>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Form.Item>
      <span className="login-form-error">{signInError}</span>
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  signInError: selectSignInError,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (credentials) => dispatch(signInStart(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
