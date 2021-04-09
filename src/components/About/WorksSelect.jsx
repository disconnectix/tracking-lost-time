import React from 'react';
import chroma from 'chroma-js';

import { colourOptions } from './data';
import Select from 'react-select';

let myColor = '#00ff00';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 50,
    width: 50,
  },
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: myColor }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: data.color
      // isDisabled
      //   ? null
      //   : isSelected
      //   ? data.color
      //   : isFocused
      //   ? color.alpha(0.1).css()
      //   : null
      // ,
      // color: isDisabled
      //   ? '#ccc'
      //   : isSelected
      //   ? chroma.contrast(color, 'white') > 2
      //     ? 'white'
      //     : 'black'
      //   : data.color,
      // cursor: isDisabled ? 'not-allowed' : 'default',

      // ':active': {
      //   ...styles[':active'],
      //   backgroundColor:
      //     !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      // },
    };
  },
  //input: styles => ({ ...styles, ...dot() }),
  //placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
  }),
};

export default () => (
  <Select
    defaultValue={colourOptions[1]}
    options={colourOptions}
    styles={colourStyles}
  />
);

