import React from 'react';
import { Space } from 'antd';
import './PageHeader.css';

const PageHeader = (props) => (
  <div className="page-header">
      <h3>{props.title}</h3>
      <div className="page-action">
        <Space size="middle">
          {props.children}
        </Space>
      </div>
  </div>
)

export default PageHeader;
