import React, { Component } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { editCampaign } from '../../redux-saga/transactions/transaction.action'
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from './QuillToolbar'
import { Tag, Input, DatePicker } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined, CheckCircleOutlined, ToolOutlined } from '@ant-design/icons';
import moment from 'moment'

class CampaignDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            name: "",
            date: new Date(),
            tags: ['abc@gmail.com'],
            inputVisible: false,
            inputValue: '',
            didMount: true,
            content: ""
        };
        this.onChange = this.onChange.bind(this)
        this.saveName = this.saveName.bind(this)
        this.saveContent = this.saveContent.bind(this)
    };
    componentDidMount() {
        if (this.props.details)
            this.setState({
                ...this.state,
                ...this.props.details,
                tags: this.props.details ? this.props.details.targets : this.state.tags,
                date: new Date(this.props.details ? this.props.details.date : null)
            })
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
            this.setState({ error: false })
        } else return this.setState({ error: true })
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        const tagElem = (
            <Tag
                icon={<CheckCircleOutlined />} color="success"
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };
    showModal() {
        this.setState({
            visible: true,
            didMount: true
        });
    };
    onChange(e) {
        this.setState({ date: new Date(e) })
    }
    handleOk(e) {
        this.setState({ loading: true });
        if (this.state.name &&
            this.state.content &&
            this.state.date &&
            this.state.tags) {
            const { editCampaign } = this.props
            setTimeout(() => {
                editCampaign({
                    id: this.state._id,
                    name: this.state.name,
                    content: this.state.content,
                    date: this.state.date,
                    targets: this.state.tags
                })
                this.setState({ loading: false, visible: false, didMount: false });
            }, 1000);
        } else {
            this.setState({ loading: false });
            alert('All Fields are Required!!')
        }
    };
    saveName(e) {
        this.setState({ name: e.target.value })
    }
    saveContent(e) {
        this.setState({ content: e })
    }
    handleCancel(e) {
        this.setState({ visible: false, didMount: false });
    };

    render() {
        const { visible, loading, name, content } = this.state;
        const { tags, inputVisible, inputValue, date } = this.state;
        const tagChild = tags.map(this.forMap);
        const defaultMsg = "Let us drive a Campaign !!"
        return (
            < div >
                <Button size="small"
                    type="primary"
                    onClick={() => this.showModal()}
                    icon={<ToolOutlined />}
                >
                    Update
                </Button>
                <Modal
                    width={'70%'}
                    bodyStyle={{ height: '400px' }}
                    visible={visible}
                    title={this.state.name ? this.state.name : "Add New Campaign"}
                    onCancel={() => this.handleCancel()}
                    footer={[
                        <Button key="cancel" onClick={() => this.handleCancel()}>
                            Cancel
                        </Button>,
                        <Button key="purchase" type="primary" loading={loading} onClick={() => this.handleOk()}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Row span={24}>
                        <Col style={{ marginTop: 5 }} span={17}>
                            {this.state.didMount ? (<><EditorToolbar />
                                <ReactQuill
                                    theme="snow"
                                    modules={modules ? modules : null}
                                    formats={formats ? formats : null}
                                    onChange={this.saveContent}
                                    value={content}
                                    placeholder={defaultMsg}
                                    style={{ height: '270px', overflowY: 'scroll', overflow: 'hidden' }}
                                /></>) : null}
                        </Col>
                        <Col span={1} />
                        <Col span={6}>
                            <h4 >Campaign Name</h4>
                            <p> <Input placeholder="Basic usage" value={name} onChange={this.saveName} /> </p>
                            <h4 style={{ marginTop: 15 }}>Date</h4>
                            <p> <DatePicker selected={date} onChange={this.onChange} />
                            </p>
                            <h4>Targets</h4>
                            <p style={{ height: '180px', overflowY: 'scroll' }}>
                                <div style={{ marginBottom: 16 }}>
                                    <TweenOneGroup
                                        enter={{
                                            scale: 0.8,
                                            opacity: 0,
                                            type: 'from',
                                            duration: 100,
                                            onComplete: e => {
                                                e.target.style = '';
                                            },
                                        }}
                                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                        appear={false}
                                    >
                                        {tagChild}
                                    </TweenOneGroup>
                                </div>
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag onClick={this.showInput} className="site-tag-plus">
                                        <PlusOutlined /> New Email
                                    </Tag>
                                )}
                                {this.state.error ? <p style={{ color: "red" }}>Invalid Email</p> : null}
                            </p>
                        </Col>
                    </Row>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = ({ campaigns }) => {
    const { campaignsList, loading, error } = campaigns;
    return { campaignsList, loading, error };
};

export default connect(mapStateToProps, {
    editCampaign,
})(CampaignDetailModal);