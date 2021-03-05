import React from 'react';

const PageBackground = (props) => (
  <div style={{ 
    background: props.noBg ? null : '#fff', 
    padding: 24, 
    height: '100%' 
  }}>
    {props.children}
  </div>
)

export default PageBackground;
