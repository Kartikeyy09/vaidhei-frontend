import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Yeh component har baar page change hone par screen ko top par le aayega
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi URL ka path badlega, yeh effect chalega

  return null; // Yeh component screen par kuch nahi dikhata
};

export default ScrollToTop;