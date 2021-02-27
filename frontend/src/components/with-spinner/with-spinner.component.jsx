import { Spin } from "antd";

const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spin /> : <WrappedComponent {...otherProps} />;
};

export default withSpinner;
