import React, { Component } from 'react'
import Footer from '../Components/common/Footer';
import { Row, Col } from 'antd';
import CommonBanner from '../Components/common/CommonBanner';
import SingleFoodMessage from '../Components/SingleFoodDetails/SingleFoodMessage';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actionCreator';
class SingleFoodDetails extends Component {

    componentDidMount(){
        const gid = this.props.match.params.gid;
        this.props.showGoodsDetail(gid);
    }
    render() {
        return (
            <>
                <Row type="flex" justify="center" >
                    {/* banner栏 */}
                    <Col xs={24} sm={24} md={16} lg={19} xl={16}>
                        <CommonBanner commonbannerTitle="商品详情" />
                        {/* 菜品信息 和评价信息*/}
                        <SingleFoodMessage goods={this.props.goodsDetails}/>
                     
                        {/* 页脚 */}
                        <Footer />
                    </Col>
                </Row>
            </>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        goodsDetails: state.get('goodsDetails')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showGoodsDetail: (gid) => {
            dispatch(actionCreators.showGoodsDetail(gid))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SingleFoodDetails);