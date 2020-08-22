import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout'


function CampaignClient() {
  return (
    <Layout>
    </Layout>
  );
}

export default connect()(CampaignClient);;
