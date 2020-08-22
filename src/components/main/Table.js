import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd';
import { connect } from 'react-redux'
import DetailModal from '../CampaignModals/CampaignDetailModal'

class CampaignTable extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
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
                align: "center"
            },
            {
                title: 'Campaign Content',
                dataIndex: 'content',
                key: 'content',
                align: "center"
            },
            {
                title: 'Campaign Start Date',
                dataIndex: 'date',
                key: 'date',
                align: "center"
            },
            {
                title: 'Campaign Targets',
                dataIndex: 'target',
                key: 'target',
                align: "center"
            },
            {
                title: 'Campaign Targets',
                dataIndex: 'target',
                key: 'target',
                align: "center",
                render: (text, record) => (
                    <span>
                        <DetailModal details={record} />
                    </span>
                )
            },
        ];
        return (
            <Table style={{ marginTop: 10 }} columns={columns} loading={this.props.loading} dataSource={data} />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTable)
