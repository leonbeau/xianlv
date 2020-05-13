import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd';
import * as actionCreators from '../../store/actionCreator';
import './IamSalemanMain.css';
class IamSalemanMain extends Component {
  
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
                            this.props.salemanOrderList.map((item,index) => {
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
                                                    <div className="single_order_mount">总价: ￥{item.goods.price}</div>
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                备注: {item.goods.beizhu}
                                                   
                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status">
                                                <Button onClick={()=>this.props.agreeOrder(item.danzi.did)}  size="small" style={{margin:"0 4px"}}>同意</Button>
                                                <Button onClick={()=>this.props.disagreeOrder(item.danzi.did)} size="small" type="danger">不同意</Button>
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
        this.props.getSalemanOrders()
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        salemanOrderList: state.get('salemanOrderList')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
// 新的
        getSalemanOrders:()=>{
            dispatch(actionCreators.getSalemanOrders())
        },
        agreeOrder:(did)=>{
            dispatch(actionCreators.agreeOrder(did));
        },
        disagreeOrder:(did)=>{
            dispatch(actionCreators.disagreeOrder(did));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IamSalemanMain);
