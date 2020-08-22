import React, { Component } from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import { Button, Modal, Avatar, Row, Col } from 'antd';
import { purchaseProduct } from '../../redux-saga/transactions/transaction.action'
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from './QuillToolbar'
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined, CheckCircleOutlined, ToolOutlined } from '@ant-design/icons';

class CampaignDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            product: {
                productName: "abc",
                description: "aycsfdgyihjadsfuyshudfkl",
                price: 500
            },
            tags: ['Tag 1', 'Tag 2', 'Tag 3'],
            inputVisible: false,
            inputValue: '',
            didMount: true,
            //   profile: this.props.profile
        };
        // this.showModal = this.showModal.bind(this);
        // this.handleOk = this.handleOk.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
    };
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
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
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
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

    handleOk(e) {
        this.setState({ loading: true });
        setTimeout(() => {
            //   this.props.purchaseProduct({
            //     productId: this.state.product.productId,
            //     buyerId: this.state.profile[0] ? this.state.profile[0]._id : null,
            //   })
            this.setState({ loading: false, visible: false, didMount: false });
        }, 1000);
    };

    handleCancel(e) {
        this.setState({ visible: false, didMount: false });
    };

    render() {
        const { visible, loading } = this.state;
        const { name, content, date, target } = this.props.details
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        const defaultMsg = "Let us drive a Campaign !!"
        return (
            < div >
                <Button type="primary" onClick={() => this.showModal()}>
                    <ToolOutlined /> Edit Campaign
                </Button>
                <Modal
                    width={'60%'}
                    bodyStyle={{ height: '400px' }}
                    visible={visible}
                    title={name}
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
                                    onChange={(e) => console.log(e)}
                                    placeholder={defaultMsg}
                                    style={{ height: '270px', overflowY: 'scroll', overflow: 'hidden' }}
                                /></>) : null}
                        </Col>
                        <Col span={1} />
                        <Col span={6}>
                            <h4 >Product Name</h4>
                            <p> {name}</p>
                            <h4 style={{ marginTop: 15 }}>Date</h4>
                            <p> {date}</p>
                            <h4>Targets</h4>
                            <p>
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
                                        <PlusOutlined /> New Tag
                                    </Tag>
                                )}
                            </p>
                        </Col>
                    </Row>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = ({ forSale }) => {
    const { purchase, loading, error } = forSale;
    return { purchase, loading, error };
};

export default connect(mapStateToProps, {
    purchaseProduct
})(CampaignDetailModal);