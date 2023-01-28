import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export interface AnimationConfig {
  animationData?: any;
  loop?: boolean | number;
}

function LottieIllustration(props: AnimationConfig) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current as Element,
      renderer: "svg",
      loop: props.loop,
      autoplay: true,
      animationData: props.animationData,
    });

    return () => animation.destroy();
  }, [props.animationData, props.loop]);

  return <Box height="100%" width="100%" ref={container} />;
}

LottieIllustration.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  illustration: PropTypes.object.isRequired,
  loop: PropTypes.bool,
};

LottieIllustration.defaultProps = {
  loop: true,
};

export default LottieIllustration;
