import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import * as actionCreators from '../../store/actionCreator';
import { connect } from 'react-redux';
function EditModal(props) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
            md: { span: 5 },
            lg: { span: 5 },
            xl: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 16 },
            lg: { span: 16 },
            xl: { span: 16 }
        },
    };
    //以下方法为添加按钮modal事件

    const editModalCancel = () => {
        props.cancelAddClassifyModal()
    }

    //提交表单
    const handleSubmit = e => {

        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.addNewCategory(values.newCategoryName)
                console.log('Received values of form: ', values.newCategoryName);
            }
        });
    };

    return (
        <Modal
            title="编辑个人信息"
            visible={props.meMessageEditModalState}
            onCancel={editModalCancel}
            footer={null}
        >
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item
                    label="更改手机号"
                >
                    {getFieldDecorator('newPhone', {
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                        <Input placeholder={props.meMessage.phone}  />
                    )}
                </Form.Item>
                <Form.Item
                    label="更改微信号"
                >
                    {getFieldDecorator('newVx', {
                        rules: [{ required: true, message: '请输入微信号' }],
                    })(
                        <Input placeholder={props.meMessage.vx} />
                    )}
                </Form.Item>

                <Form.Item
                    label="更改QQ号"
                >
                    {getFieldDecorator('newQQ', {
                        rules: [{ required: true, message: '请输入QQ号' }],
                    })(
                        <Input placeholder={props.meMessage.qq}/>
                    )}
                </Form.Item>


                <Form.Item
                    label="更改密码"
                >
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: '请输入新密码' }],
                    })(
                        <Input.Password placeholder="请输入新密码"  />
                    )}
                </Form.Item>


                <div className="submit_button">
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        meMessageEditModalState: state.get('meMessageEditModalState'),
        meMessage: state.get('meMessage')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        cancelAddClassifyModal: () => {
            dispatch(actionCreators.cancelMeMessageEditModal())
        },
        addNewCategory: (categoryName) => {
            dispatch(actionCreators.addCategory(categoryName))
        }
    }
}

const EditMeMessageModal = Form.create({ name: 'add_form' })(EditModal);
export default connect(mapStateToProps, mapDispatchToProps)(EditMeMessageModal);