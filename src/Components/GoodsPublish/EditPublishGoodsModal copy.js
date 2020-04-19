import React,{useState} from 'react';
import { Form, Modal, Input, Button,message,Upload } from 'antd';
import * as actionCreators from '../../store/actionCreator';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function EditPublishGoodsModal(props) {
    const [fileListLength, setfileListLength] = useState(0)
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

     //图片上传前判断只能上传一张图片
     const beforeUploadMehtod = (file) => {
        if (fileListLength === 0) {
            setfileListLength(fileListLength+1)
            return true
        } else {
            message.error('只能上传一张图片')
            return false
        }
    }
    //上传组件参数
    const uploadProps = {
        name: 'file',
        accept: 'image/webp,image/apng,*/*;q=0.8',
        method: 'post',
        action: '/api/upload',
        listType: 'picture',
        // headers: {
        //    'Content-Type':'multipart/form-data',
        // },
    };
    //上传完图片执行回调
    const onChange = (info) => {
        console.log(info);

        if (info.file.status !== 'uploading') { }
        if (info.file.status === 'done') {
            // console.log(info.file, info.fileList);
            console.log('从这开始打印success');
            console.log(info.file)
            //   this.props.getResponseOfPicURL(info.file.response.data);
            message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
    //以下方法为添加按钮modal事件

    const editModalCancel = () => {
        props.cancelPublishGoodsEditModal()
    }

     //提交表单
     const handleSubmit = e => {

        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                this.props.toAddGoods(values);
            }
        });
    };

    return (
        <Modal
            title="编辑商品信息"
            visible={props.showOrCancelMyPublishGoodsEditModal}
            onCancel={editModalCancel}
            footer={null}
            width={800}
        >
            <div className="dishes_add_main">
                    <div className="dishes_add_area">
                        {/* <div className="dishes_add_title">添加商品</div> */}
                        <div className="dishes_add_content">
                            <Form {...formItemLayout} onSubmit={handleSubmit}>

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

                                {/* <Form.Item
                                            label="商品类型"
                                        >
                                            {getFieldDecorator('goodsType', {
                                                rules: [{ required: true, message: '请选择商品类型' }],
                                            })(
                                                <Select
                                                 onChange={this.handleChange}>
                                                {
                                                    this.props.dishesCategoriesList.map((item,index)=>{
                                                        return (
                                                            <Option key={index} value={item.name}>{item.name}</Option>
                                                        )
                                                    })
                                                }
                                               
                                            </Select>
                                             )}

                                        </Form.Item> */}
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
                                    // getvaluefromevent={this.normFile}
                                    extra="选择图片"
                                >
                                    {getFieldDecorator('dishPicture', {
                                        rules: [{ required: true, message: '请上传商品图片' }],
                                    })(
                                        <Upload {...uploadProps}
                                            onChange={(info) => onChange(info)}
                                            beforeUpload={(file) => beforeUploadMehtod(file)}
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
                                        <Link to="/publish">
                                            <Button size="large" style={{ marginRight: "1rem" }}>返回</Button>
                                        </Link>
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
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        showOrCancelMyPublishGoodsEditModal: state.get('showOrCancelMyPublishGoodsEditModal'),
        meMessage: state.get('meMessage')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        cancelPublishGoodsEditModal: () => {
            dispatch(actionCreators.cancelPublishGoodsEditModal())
        },
        editMeMessage: (MeObj) => {
            dispatch(actionCreators.editMeMessage(MeObj))
        }
    }
}

const EditPublishModal = Form.create({ name: 'add_form' })(EditPublishGoodsModal);
export default connect(mapStateToProps, mapDispatchToProps)(EditPublishModal);