import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './ForgetPasswordMain.css';
import {connect}　from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
class ForgetPassword extends Component {

    handleSubmit = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.toRetrievePassword(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className="forgetPassword_main">
                    <div className="forgetPassword_area">
                        <Form onSubmit={this.handleSubmit} className="login-form">

                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '邮箱不能为空' }],
                                })(
                                    // 登录
                                    <Input
                                        size="large"
                                        placeholder="请输入您的用户名"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                                    />
                                )}
                            </Form.Item>
                            <Form.Item style={{textAlign:"right",margin:"6rem 0"}}>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                    点击找回
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}

const ForgetPasswordMain = Form.create({ name: 'normal_login' })(ForgetPassword);


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toRetrievePassword: (value) => {
            dispatch(actionCreators.toRetrievePassword(value.username))
        }
    }
}
export default connect(null,mapDispatchToProps)(ForgetPasswordMain);