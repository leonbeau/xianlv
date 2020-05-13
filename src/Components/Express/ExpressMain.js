import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd';
import * as actionCreators from '../../store/actionCreator';
import './ExpressMain.css';
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
                            订单列表(物流信息)
                        </div>

                        {
                            this.props.allExpressOrder.map((item,index) => {
                                return (
                                    <>
                                        {/* 一个订单 */}
                    
                                        <div className="single_order" key={item.gid}>
                                            {/* 图片 */}
                                           
                                            <div className="order_other_things">
                                                {/* 名称时间数量 */}
                                                <span className="order_message">
                                                    <div className="single_order_name">{item.username}</div>
            
                                                    <div className="single_order_mount">数量: {item.sum}</div>
                                                   
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                总价: ￥{item.money}
                                                   
                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status">
                                            
                                                <Button onClick={()=>this.props.removeOrder(item.gid)} size="small" type="danger">删除订单</Button>
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
        this.props.getAllOrderExpress()
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        allExpressOrder: state.get('allExpressOrder')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
// 新的
    getAllOrderExpress:()=>{
            dispatch(actionCreators.getAllOrderExpress())
        },
        removeOrder:(gid)=>{
            dispatch(actionCreators.removeOrder(gid));
        },
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IamSalemanMain);
