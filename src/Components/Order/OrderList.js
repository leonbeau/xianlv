import React, { Component } from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';
import './OrderList.css';
import * as actionCreators from '../../store/actionCreator';
class OrderList extends Component {
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
                            订单管理页面
                        </div>

                        {
                            this.props.adminOrderList.map((item,index) => {
                                return (
                                    <>
                                        {/* 一个订单 */}
                    
                                        <div className="single_order" key={index}>
                                            
                                            <div className="order_other_things">
                                                {/* 用户金额状态 */}
                                                <span className="order_message">
                                                    <div className="single_order_name">{item.username}</div>
                                                    <div className="single_order_mount">id: {item.did}</div>
                                                    <div className="single_order_mount">
                                                        状态: 
                                                        {item.status===0 ? '未审批':''}
                                                        {item.status===1 ? '已同意':''}
                                                        {item.status===2 ? '已拒绝':''}
                                                    </div>
                                                    
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                    总价: ￥{item.money}
                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status">
                                                <Button onClick={()=>this.orderAgree(item.did)} size="small" style={{ marginRight: "1rem" }}>同意</Button>
                                                <Button onClick={()=>this.orderDisagree(item.did)} size="small" type="danger">不同意</Button>
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

    orderAgree(id){
        this.props.orderAgree(id);
    }

    orderDisagree(id){
        this.props.orderDisagree(id);
    }

    componentDidMount(){
        this.props.showAllOrderList();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        adminOrderList: state.get('adminOrderList')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAllOrderList: () => {
            dispatch(actionCreators.showAllOrderList());
            },
        orderAgree: (id) => {
            dispatch(actionCreators.orderAgree(id))
        },
        orderDisagree: (id) => {
            dispatch(actionCreators.orderDisagree(id))
        }

    }
}   
export default connect(mapStateToProps,mapDispatchToProps)(OrderList)  
