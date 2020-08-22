import React from 'react';
// import styles from './Layout.module.css';
import { PageHeader, Tabs, Button, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Table from '../main/Table';

const { TabPane } = Tabs;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
    <Descriptions.Item label="Association">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remarks">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

const Layout = () => {
  return (
    <PageHeader
      className="site-page-header-responsive"
      title="Campaign-E"
      subTitle="A One Stop Solution to Email Campaigns"
      extra={[
        <Button
          key="1"
          type="primary"
          danger
          icon={<PlusOutlined />}
        >
          Start New Campaign
        </Button>,
      ]}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1"><Table /></TabPane>
          <TabPane tab="Rule" key="2" />
        </Tabs>
      }
    >
      {/* <Content extra={extraContent}>{renderContent()}</Content> */}
    </PageHeader>
  );
}

export default Layout;