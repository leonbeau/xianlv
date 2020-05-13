import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './Login.css';
import {connect}　from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
import { Link } from 'react-router-dom';

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.toLogin(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login_main">

            <div className="Login_title">登　录</div>
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                                { required: true, message: '邮箱不能为空' }],
                    })(
                        // 登录
                        <Input
                            size="large"
                            placeholder="请输入你的用户名"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }],
                    })(
                        // 密码
                        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码"  />
                    )}
                </Form.Item>
                <Form.Item>
                <Link to="/forget"><div　onClick={()=>this.props.cancelModal()} className="forget_password">忘记密码</div></Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                       登　录
                    </Button>
                    <div className="to_register" onClick={this.props.toRegisterMain}>立即注册</div>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


const mapDispatchToProps = (dispatch) => {
    return {
        toRegisterMain: () => {
            dispatch(actionCreators.toRegisterMain())
        },
        toLogin: (LoginObject)=>{
            dispatch(actionCreators.toLogin(LoginObject))
        },
        //忘记密码点击执行
        cancelModal:()=>{
            dispatch(actionCreators.cancelModal());
        }
    }
}
export default connect(null,mapDispatchToProps)(WrappedNormalLoginForm) ;