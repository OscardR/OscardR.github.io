import { withPrefix } from "gatsby";

// Common styles and scripts
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// Different routes load different CSS files
export function onRouteUpdate({ location }) {
  require("@css/theme.scss");

  switch (location.pathname) {
    case withPrefix("/memoria/"):
      require("@css/memoria.scss");
      break;
    case withPrefix("/cv/"):
      require("@css/cv.scss");
      break;
  }
}
