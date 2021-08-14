import React from "react";
import PropType from "prop-types";
import { CircularProgress } from "@material-ui/core";

const Loading = props => {
  return (
    <div className='loading-container'>
      <CircularProgress />
    </div>
  );
};

Loading.propTypes = {
  size: PropType.oneOf(["default", "large", "small"])
};
Loading.defaultProps = {
  size: "large"
};

export default Loading;
