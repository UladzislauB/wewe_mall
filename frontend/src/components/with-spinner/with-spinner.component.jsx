import { Spin } from "antd";

import "./with-spinner.styles.scss";

const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div className="spinner__wrapper">
      <Spin className="spinner__spin" size={"large"} />
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default withSpinner;
