import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

const ScrollManager = () => { 
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    scrollPositions[prevPath.current] = window.scrollY;

    if (scrollPositions[pathname] !== undefined) {
      window.scrollTo(0, scrollPositions[pathname]);
    } else {
      window.scrollTo(0, 0);
    }

    prevPath.current = pathname;
  }, [pathname]);

  return null;
}

export default ScrollManager;
