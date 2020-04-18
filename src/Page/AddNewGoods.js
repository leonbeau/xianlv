import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import CommonBanner from '../Components/common/CommonBanner';
import {Row,Col} from 'antd';
import Footer from '../Components/common/Footer';
import AddNewGoodsContent from '../Components/AddNewGoods/AddNewGoodsContent';
// import AddNewGoodsOther from '../Components/AddNewGoods/AddNewGoodsOther';
const { Content } = Layout;

class AddNewGoods extends Component {

  render() {

    return (
        <>
             <Row type="flex" justify="center" >
                {/* banner栏 */}
                <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                    <CommonBanner commonbannerTitle="添加新商品"/>
                 
                        <AddNewGoodsContent/>
                    {/* 页脚 */}
                    <Footer />
                </Col>
            </Row>
        </>
    )
   
  }
}
export default AddNewGoods;


