import React, { Component } from 'react'
import CommonBanner from '../Components/common/CommonBanner';
import {Row,Col} from 'antd';
import Footer from '../Components/common/Footer';
import IamCustomerMain from '../Components/IamCustomer/IamCustomerMain';

export default class IamCustomer extends Component {
    render() {
        return (
            <>
                 <Row type="flex" justify="center" >
                    {/* banner栏 */}
                    <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                        <CommonBanner commonbannerTitle="我是买家——订单管理"/>
                        <IamCustomerMain />
                        {/* 页脚 */}
                        <Footer />
                    </Col>
                </Row>
            </>
        )
    }
}
