import React, { Component } from 'react'
import CommonBanner from '../Components/common/CommonBanner';
import {Row,Col} from 'antd';
import Footer from '../Components/common/Footer';
import MyPublishOrder from '../Components/GoodsPublish/MyPublishOrder';

export default class GoodsPublish extends Component {
    render() {
        return (
            <>
                 <Row type="flex" justify="center" >
                    {/* banner栏 */}
                    <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                        <CommonBanner commonbannerTitle="我的发布"/>
                        {/* 个人信息组件 */}
                        <MyPublishOrder />
                        {/* 页脚 */}
                        <Footer />
                    </Col>
                </Row>
            </>
        )
    }
}
