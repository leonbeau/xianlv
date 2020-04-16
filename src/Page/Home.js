import React,{Component} from 'react';
import RotationChart from '../Components/Home/RotationChart ';
import Classification from '../Components/Home/Classification';
import SingleCardMain from '../Components/Home/SingleCardMain'
import Footer from '../Components/common/Footer'
import {Row,Col} from 'antd';
class Home extends Component{

    render(){
        return (
            <>
            {/* 采用antd栅格布局 */}
            <Row type="flex" justify="center" >
                <br/>
                {/* banner栏 */}
                <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                    {/* 轮播图 */}
                    <RotationChart />

                    <Col xs={6} sm={6} md={6} lg={6} xl={4}>
                       <Classification />
                    </Col>
                    <Col xs={18} sm={18} md={18} lg={18} xl={20}>
                        {/* 卡片组 */}
                        <SingleCardMain />
                    </Col>
                  
                    {/* 页脚 */}
                    <Footer/>
                </Col>
            </Row>
            </>
        )
    }
}

export default Home;