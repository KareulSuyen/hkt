// components/ScrollManager.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollMemory = {};

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const fullPath = pathname + search + hash;

  useEffect(() => {
    // Save current scroll position before changing routes
    const currentScroll = window.scrollY;
    scrollMemory[fullPath] = currentScroll;

    // Restore scroll position for the new route
    const savedScroll = scrollMemory[fullPath];
    
    if (savedScroll !== undefined) {
      window.scrollTo(0, savedScroll);
    } else {
      // First time visiting this route, scroll to top
      if (!hash) {
        window.scrollTo(0, 0);
      }
    }

  }, [fullPath, hash]);

  return null;
}