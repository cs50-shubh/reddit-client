import React, { Component } from 'react'
import { Table, Button, Row, Col } from 'antd';
import { connect } from 'react-redux'
import DetailModal from '../CampaignModals/CampaignDetailModal'
import { fetchCampaigns, deleteCampaign } from '../../redux-saga/transactions/transaction.action'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons';

class CampaignTable extends Component {

    componentDidMount() {
        this.props.fetchCampaigns()
    }
    handleDelete(data) {
        if (window.confirm('Are you sure you want to delete the Campaign !?')) {
            // Save it!
            this.props.deleteCampaign(data._id)
        } else {
            // Do nothing!
            console.log('Not Deletion.');
        }
    }
    render() {
        const { campaignList } = this.props
        const data = [{
            name: "Diwali Dhamaka",
            content: "<HTML>",
            date: '20 - 08 - 2020',
            target: 500
        }, {
            name: "Diwali Dhamaka",
            content: "<HTML>",
            date: '20 - 08 - 2020',
            target: 500
        }];
        const columns = [
            {
                title: 'Campaign Name',
                dataIndex: 'name',
                key: 'name',
                align: "center",
                ellipsis: true
            },
            {
                title: 'Campaign Content',
                dataIndex: 'content',
                key: 'content',
                align: "center",
                ellipsis: true
            },
            {
                title: 'Campaign Start Date',
                dataIndex: 'date',
                key: 'date',
                align: "center",
                ellipsis: true,
                render: (text, record) => (moment(text).format("DD/MM/YY")),
            },
            {
                title: 'Campaign Targets',
                dataIndex: 'targets',
                key: 'targets',
                align: "center",
                ellipsis: true,
                render: (text, record) => (text ? text.map((item) => (item + ",")) : null),
            },
            {
                title: 'Actions',
                align: 'center',
                render: (text, record) => (
                    <Row>
                        <DetailModal details={record} />
                        <span style={{ width: "10px" }} />
                        <Button size="small" onClick={() => this.handleDelete(record)} icon={<DeleteOutlined />} type="danger">Delete</Button>
                    </Row>
                ),
                ellipsis: true
            },
        ];
        return (
            <Table style={{ marginTop: 10 }} columns={columns} loading={this.props.loading} dataSource={campaignList[0] ? campaignList : null} />
        )
    }
}

const mapStateToProps = ({ campaigns }) => {
    const { campaignList, loading, error } = campaigns;
    return { campaignList, loading, error };
}

const mapDispatchToProps = {
    fetchCampaigns,
    deleteCampaign
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTable)
