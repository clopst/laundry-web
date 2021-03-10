import React from 'react';
import { Spin } from 'antd';
import './Loading.css';

const Loading = (props) => (
  <div className="loading">
    <Spin size="large" spinning={props.spinning} />
  </div>
)

export default Loading;
