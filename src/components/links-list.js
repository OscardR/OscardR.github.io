import React from "react";

import body from "./links-list.pug";

export const LinksList = ({ links }) => (
  <>
    {body({
      links: links.map((link) => ({
        ...link,
        iconCode: link.icon.pop(),
        iconType: link.icon.shift(),
      })),
    })}
  </>
);
