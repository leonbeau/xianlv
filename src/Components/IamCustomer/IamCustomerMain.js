import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd';
import * as actionCreators from '../../store/actionCreator';
import './IamCustomerMain.css';
class IamCustomerMain extends Component {
  
    render() {
        return (
            <>
                <div className="myorder_area" style={{minHeight:"35rem"}}>
                    {/* 订单为空时 */}
                    {/* <div className="myorder_empty">
                        <div className="empty_text">订单当前为空，赶快下单吧！</div>
                    </div> */}
                    {/* 订单不为空时开始 */}
                    <div className="myorder_content">
                        {/* 该区域名 */}
                        <div className="myorder_title">
                            订单列表
                        </div>

                        {
                            this.props.customerOrderList.map((item,index) => {
                                return (
                                    <>
                                        {/* 一个订单 */}
                    
                                        <div className="single_order" key={item.goods.gid}>
                                            {/* 图片 */}
                                            <span className="order_food_picture">
                                                <img src={"http://120.79.56.242:8080/"+item.goods.path}/>
                                            </span>
                                            <div className="order_other_things">
                                                {/* 名称时间数量 */}
                                                <span className="order_message">
                                                <div className="single_order_name">{item.goods.name}</div>
                                                    <div className="single_order_time">类型: {item.goods.type}</div>
                                                    <div className="single_order_mount">数量: {item.goods.sum}</div>
                                                    <div className="single_order_mount">类型:{item.goods.type}</div>
                                                    <div className="single_order_mount">单价: ￥{item.goods.price}</div>
                                                    <div className="single_order_mount">总价: ￥{item.danzi.money}</div>
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                买家:{item.danzi.usernames}
                                                <br/>
                                                备注: {item.goods.beizhu}
                                                <br/>
                                                物流状态:
                                                {
                                                        item.danzi.status === 0 ? '未发货' : ''
                                                    }
                                                    {
                                                        item.danzi.status === 1 ? '已发货' : ''
                                                    }
                                                    {
                                                        item.danzi.status === 2 ? '卖家拒绝发货' : ''
                                                    }
                                                    {
                                                        item.danzi.status === 3 ? '买家收到货' : ''
                                                    }
                                                   
                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status">
                                                <Button onClick={()=>this.props.confirmOrder(item.danzi.did)}  type="danger">确认收货</Button>
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
        this.props.getCustomerOrders()
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        customerOrderList: state.get('customerOrderList')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
// 新的
        getCustomerOrders:()=>{
            dispatch(actionCreators.getCustomerOrders())
        },
        confirmOrder:(did) => {
            dispatch(actionCreators.confirmOrder(did))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IamCustomerMain);
