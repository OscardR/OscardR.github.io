import React from "react";
import { createGlobalStyle } from "styled-components";

// Styles
import "@css/ei1061.scss";

// Templates
import body from "@templates/ei1061/i02/body.pug";

const GlobalStyle = createGlobalStyle`
body {
  background: #fafafa;
}

li {
  margin-bottom: .8em;
}
`;

const I02 = () => {
  return (
    <>
      <GlobalStyle />
      {body()}
    </>
  );
};

export default I02;
