import React from "react";

import body from './links-list.pug'

export const LinksList = ({links}) => <>
  {body({links})}
</>;