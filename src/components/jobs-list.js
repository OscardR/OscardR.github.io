import React from "react";

import body from './jobs-list.pug'

export const JobsList = ({jobs}) => <>
  {body({jobs})}
</>;