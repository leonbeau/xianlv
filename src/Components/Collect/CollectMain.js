import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as actionCreators from '../../store/actionCreator';
import './CollectMain.css';
class IamCustomerMain extends Component {

    render() {
        return (
            <>
                <div className="myorder_area" style={{ minHeight: "35rem" }}>
                    {/* 订单为空时 */}
                    {/* <div className="myorder_empty">
                        <div className="empty_text">订单当前为空，赶快下单吧！</div>
                    </div> */}
                    {/* 订单不为空时开始 */}
                    <div className="myorder_content">
                        {/* 该区域名 */}
                        <div className="myorder_title">
                            收藏商品列表
                        </div>

                        {
                            this.props.allCollectOrder.map((item, index) => {
                                return (
                                    <>
                                        {/* 一个订单 */}

                                        <div className="single_order" key={item.gid}>
                                            {/* 图片 */}
                                            <span className="order_food_picture">
                                                <img src={"http://120.79.56.242:8080/" + item.path} />
                                            </span>
                                            <div className="order_other_things">
                                                {/* 名称时间数量 */}
                                                <span className="order_message">
                                                    <div className="single_order_name">{item.name}</div>
                                                    <div className="single_order_time">类型: {item.type}</div>
                                                    <div className="single_order_mount">数量: {item.sum}</div>
                                                    <div className="single_order_mount">总价: ￥{item.price}</div>
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                    备注: {item.beizhu}

                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status_collect">
                                                    <Button onClick={()=>this.props.addToShoppingCart(item.gid)} size="small" style={{margin:"0 8px"}} >加入购物车</Button>
                                                    <Button onClick={() => this.props.deleteCollectOrder(item.gid)} size="small" type="danger">删除收藏</Button>
                                                </span>
                                            </div>

                                        </div>
                                        {/* 一个订单结束 */}
                                    </>

                                )
                            })
                        }





                    </div>
                    {/* 订单不为空时结束 */}
                </div>
            </>
        )
    }
    componentDidMount() {
        this.props.getCollectOrders()
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        allCollectOrder: state.get('allCollectOrder')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 新的
        getCollectOrders: () => {
            dispatch(actionCreators.getCollectOrders())
        },
        deleteCollectOrder: (gid) => {
            dispatch(actionCreators.deleteCollectOrder(gid))
        },
        addToShoppingCart:(gid)=>{
            dispatch(actionCreators.addGoodsToShoppingCart(gid))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IamCustomerMain);
