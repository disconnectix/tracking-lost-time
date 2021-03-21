import React from 'react';
import { Button } from 'primereact/button';

const ControlButton = ({icon, classes, controlHandler}) => {
  return (
    <Button
      icon={icon}
      className={classes}
      onClick={controlHandler}
    />
  )
}

export default ControlButton;
