import React from 'react';
import { Tab as MuiTab } from '@material-ui/core';

const Tab = ({ children, index }) => {
  return (
    <MuiTab
      id={`simple-tab-${index}`}
      aria-controls={`simple-tabpanel-${index}`}
    >
      <div></div>
    </MuiTab>
  );
};

export default Tab;
