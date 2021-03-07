import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, id }) => {
  const mount = document.getElementById(id);
  const el = document.createElement("div");

  useEffect(() => {
    mount?.appendChild(el);
    return () => mount?.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
