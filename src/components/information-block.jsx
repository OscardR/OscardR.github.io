import React from "react";

import body from "./information-block.pug";

export const InformationBlock = ({ title, info }) => (
  <>
    {body({
      title,
      pairs: Object.keys(info).map((key) => {
        let reLink = /^((call|mail)to:)/g,
          match = info[key].match(reLink),
          value = info[key].replace(reLink, ""),
          link = match !== null ? match.pop() + value : null;

        return { key, value, link };
      })
    })}
  </>
);
