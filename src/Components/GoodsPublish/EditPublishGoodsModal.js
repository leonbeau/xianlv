import React from 'react'
// import './AddNewGoodsContent.css';
import { Form, Input, Upload, Button, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
import { Link } from 'react-router-dom';
// const { Option } = Select;

class DishesAddContent extends React.Component {
    state = {
        fileListLength: 0
    }
    //图片上传前判断只能上传一张图片
    beforeUploadMehtod = (file) => {
        if (this.state.fileListLength === 0) {
            this.setState({
                fileListLength: this.state.fileListLength + 1
            })
            return true
        } else {
            message.error('只能上传一张图片')
            return false
        }
    }
    //上传组件参数
    uploadProps = {
        name: 'file',
        accept: 'image/webp,image/apng,*/*;q=0.8',
        method: 'post',
        action: '/api/upload',
        listType: 'picture',
    };
    //上传完图片执行回调
    onChange(info) {
        console.log(info);

        if (info.file.status !== 'uploading') { }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
    //表单样式
    formItemLayout = {
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
    editModalCancel = () => {
        this.props.cancelPublishGoodsEditModal()
    }

    //提交表单
    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const gid = this.props.publiseUserChooseGoodsGid;
                this.props.toEditGoods(values,gid);
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <>
                <Modal
                    title="编辑商品信息"
                    visible={this.props.showOrCancelMyPublishGoodsEditModal}
                    onCancel={this.editModalCancel}
                    footer={null}
                    width={800}
                >

               
                <div className="dishes_add_main">
                    <div className="dishes_add_area">
                        {/* <div className="dishes_add_title">添加商品</div> */}
                        <div className="dishes_add_content">
                            <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>

                                <Form.Item
                                    label="商品名称"
                                >
                                    {getFieldDecorator('goodsName', {
                                        rules: [{ required: true, message: '请输入商品名称' }],
                                    })(
                                        // 菜品名
                                        <Input />
                                    )}

                                </Form.Item>
                                <Form.Item
                                    label="商品单价"
                                >
                                    {getFieldDecorator('goodsUnitPrice', {
                                        rules: [{ required: true, message: '请输入商品单价' }],
                                    })(
                                        // 菜品名
                                        <Input />
                                    )}

                                </Form.Item>
                                <Form.Item
                                    label="商品数量"
                                >
                                    {getFieldDecorator('goodsSum', {
                                        rules: [{ required: true, message: '请输入商品数量' }],
                                    })(
                                        // 菜品名
                                        <Input />
                                    )}

                                </Form.Item>

                                <Form.Item
                                    label="商品类别"
                                >
                                    {getFieldDecorator('goodsType', {
                                        rules: [{ required: true, message: '请输入商品类别' }],
                                    })(
                                        // 菜品名
                                        <Input />
                                    )}

                                </Form.Item>

                                <Form.Item
                                    label="商品描述"
                                >
                                    {getFieldDecorator('goodsDescribe', {
                                        rules: [{ required: true, message: '请简要描述商品信息' }],
                                    })(
                                        <Input.TextArea />
                                    )}

                                </Form.Item>

                                <Form.Item
                                    name="upload"
                                    label="商品图片"
                                    valuepropname="fileList"
                                    extra="选择图片"
                                >
                                    {getFieldDecorator('dishPicture', {
                                        rules: [{ required: true, message: '请上传商品图片' }],
                                    })(
                                        <Upload {...this.uploadProps}
                                            onChange={(info) => this.onChange(info)}
                                            beforeUpload={(file) => this.beforeUploadMehtod(file)}
                                        >
                                            <Button>
                                                <UploadOutlined /> 点击上传
                                                    </Button>
                                        </Upload>
                                    )}

                                </Form.Item>

                                <Form.Item
                                    label=" "
                                >

                                    <div className="submit_button">
                                        <Button size="large" type="primary" htmlType="submit">
                                            提交
                                            </Button>
                                    </div>

                                </Form.Item>

                            </Form>

                        </div>
                    </div>
                    {/* </Col> */}
                </div>
                {/* </Row> */}
                </Modal>

            </>
        );
    }
   
}

const DishesAddContentForm = Form.create({ name: 'normal_login' })(DishesAddContent);


const mapStateToProps = (state, ownProps) => {
    return {
        showOrCancelMyPublishGoodsEditModal:state.get('showOrCancelMyPublishGoodsEditModal'),
        publiseUserChooseGoodsGid:state.get('publiseUserChooseGoodsGid')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        cancelPublishGoodsEditModal:()=>{
            dispatch(actionCreators.cancelPublishGoodsEditModal())
        },
        toEditGoods: (addFormObj,gid) => {
            dispatch(actionCreators.editPublishGoods(addFormObj,gid))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishesAddContentForm);