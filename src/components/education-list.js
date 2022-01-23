import React from "react";

import body from './education-list.pug'

export const EducationList = ({education}) => <>
  {body({education})}
</>;