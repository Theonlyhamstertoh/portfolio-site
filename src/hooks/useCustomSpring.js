import randomColor from "randomcolor";
import { useSpring, config } from "@react-spring/three";
import { useState, useEffect } from "react";
import useStore from "../components/useStore";

export default function useCustomSpring() {
  const [hovered, setHovered] = useState(false);
  const [mobile] = useStore((state) => [state.mobile]);

  function scaleHelper() {
    if (mobile) {
      return hovered ? 0.65 : 0.5;
    } else {
      return hovered ? 1.1 : 1;
    }
  }

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

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

// function mobileResizeHelper() {
//   const isMobile = window.innerWidth < 550;
//   // if both are exactly the same already, then do nothing
//   if (isMobile === mobile) return;
//   return isMobile ? setMobile(true) : setMobile(false);
// }
