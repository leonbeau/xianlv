import React from 'react'
import './AddNewGoodsContent.css';
import { Row, Col, Form, Input, Upload, Button ,Select,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {connect}　from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
const { Option } = Select;

class DishesAddContent extends React.Component {
    state = {
        fileListLength:0
    }
    //图片上传前判断只能上传一张图片
    beforeUploadMehtod=(file)=>{
        // console.log('beforeUpload');
        // console.log(file);
        // console.log(this.state.fileListLength);
        if(this.state.fileListLength === 0){
            // console.log(this);
            this.state.fileListLength = this.state.fileListLength+1
            return true  
        }else{
            message.error('只能上传一张图片')
            return false
        }
        return false
      }
      //上传组件参数
    uploadPoprs = {
        name: 'pic',
        accept: 'image/webp,image/apng,*/*;q=0.8',
        action: '/api/m/meal/pic',
        listType:'picture'
    };
    //上传完图片执行回调
    onChange(info) {
        if (info.file.status !== 'uploading') {}
        if (info.file.status === 'done') {
            // console.log(info.file, info.fileList);
            // console.log('从这开始打印success');
            // console.log(info.file.response.data)
        //   this.props.getResponseOfPicURL(info.file.response.data);
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
    //提交表单
    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // this.props.toAddDish(values);
                // this.props.toLogin(values);
            }
        });
    };

    // normFile = e => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };
    //下拉框选择
    // handleChange=(value) =>{
        // console.log(`selected ${value}`);
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <>
                {/* <Row type="flex" > */}
                    <div className="dishes_add_main">
                        {/* <Col xs={0} sm={0} md={4} lg={6} xl={6}></Col>
                        <Col xs={24} sm={24} md={16} lg={10} xl={10}> */}
                            <div className="dishes_add_area">
                                <div className="dishes_add_title">添加商品</div>
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
                                            label="商品数量"
                                        >
                                            {getFieldDecorator('goodsSum', {
                                                rules: [{ required: true, message: '请输入商品数量' }],
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
                                                <Upload {...this.uploadPoprs}
                                                onChange={(info)=>this.onChange(info)}
                                                beforeUpload={(file)=>this.beforeUploadMehtod(file)}
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
                                            <Button　size="large" type="primary" htmlType="submit">
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

            </>
        );
    }
    componentDidMount(){
        this.props.getDishesCategories();
    }
}

const DishesAddContentForm = Form.create({ name: 'normal_login' })(DishesAddContent);


const mapStateToProps = (state, ownProps) => {
    return {
        dishesCategoriesList: state.get('dishesCategoriesList'),
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDishesCategories: () => {
            dispatch(actionCreators.getAllCategories())
        },
        toAddDish:(addFormObj) => {
            dispatch(actionCreators.addDish(addFormObj))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DishesAddContentForm) ;