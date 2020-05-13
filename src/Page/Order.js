import React from 'react'
import CommonBanner from '../Components/common/CommonBanner';
import {Row,Col} from 'antd';
import Footer from '../Components/common/Footer';

import OrderList from '../Components/Order/OrderList';

function Order(){
    return (
        <>
             <Row type="flex" justify="center" >
                {/* banner栏 */}
                <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                    <CommonBanner commonbannerTitle="审批订单（管理员）"/>
                    <OrderList />
                    
                    {/* 页脚 */}
                    <Footer />
                </Col>
            </Row>
        </>
    )
}

export default Order;
