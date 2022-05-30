import randomColor from "randomcolor";
import { useSpring, config } from "@react-spring/three";
import { useState, useEffect } from "react";

export default function useCustomSpring() {
  const [hovered, setHovered] = useState(false);
  const [mobile, setMobile] = useState(false);
  function mobileResizeHelper() {
    const isMobile = window.innerWidth < 650;
    console.log(mobile);
    // if both are exactly the same already, then do nothing
    if (isMobile === mobile) return;
    return isMobile ? setMobile(true) : setMobile(false);
  }

  function scaleHelper() {
    if (mobile) {
      return hovered ? 0.65 : 0.55;
    } else {
      return hovered ? 1.1 : 1;
    }
  }

  useEffect(() => {
    // do a initial call
    mobileResizeHelper();
    window.addEventListener("resize", mobileResizeHelper);
    return () => window.removeEventListener("resize", mobileResizeHelper);
  }, [mobile]);

  const spring = useSpring({
    scale: scaleHelper(),
    wireframe: hovered ? false : true,
    config: { mass: 3, tension: 200, friction: 10 },
  });

  const { color } = useSpring({
    color: randomColor({ luminosity: "light" }),
    config: config.slow,
  });

  return { hovered, setHovered, spring, color };
}
