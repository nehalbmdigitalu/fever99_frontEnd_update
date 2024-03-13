import React from "react";
import { useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  const currentURL = location.pathname;

  if (
    currentURL == "/" ||
    currentURL == "/login" ||
    currentURL.split('/')[1] == "people" ||
    currentURL.split('/')[1] == "blog" ||
    currentURL.split('/')[1] == "home-service" ||
    currentURL == "/register" ||
    currentURL == "/about" ||
    currentURL == "/service" ||
    currentURL == '/terms-condition' ||
    currentURL == '/privacy' ||
    currentURL == '/e-clinic-register' ||
    currentURL == '/career' ||
    currentURL == '/refuncpolicy' ||
    
    
    currentURL.split("/")[1] == "prescription"
  ) {
    return null;
  }

  return <div>&nbsp;</div>;
}

export default Footer;
