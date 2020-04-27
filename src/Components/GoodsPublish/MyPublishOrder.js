import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import EditPublishGoodsModal from './EditPublishGoodsModal';
import * as actionCreators from '../../store/actionCreator';
import './MyPublishOrder.css';
class MyPublishOrder extends Component {
    deleteGoodsItem(gid){
        console.log('deleteGoodItem',gid);
        this.props.deleteGoodsItem(gid)
    }
    editGoodsItem(gid){
        this.props.saveUserChooseEditGoodsGid(gid)
        this.props.showPublishGoodsEditModal()
    }
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
                        <div className="myorder_title" style={{textAlign:"right"}}>
                            <Link to="/addNewGoods">
                            <Button type="primary">添加新的商品</Button>
                            </Link>
                            

                        </div>

                        {
                            this.props.myPublishGoodsList.map((item,index) => {
                                return (
                                    <>
                                        {/* 一个订单 */}
                    
                                        <div className="single_order" key={item.gid}>
                                            {/* 图片 */}
                                            <span className="order_food_picture">
                                                <img src={"http://120.79.56.242:8080/"+item.path}/>
                                                {/* <img src="http://120.79.56.242:8080/{item.path}" alt="" /> */}
                                            </span>
                                            <div className="order_other_things">
                                                {/* 名称时间数量 */}
                                                <span className="order_message">
                                                    <div className="single_order_name">{item.name}</div>
                                                    <div className="single_order_time">类型: {item.type}</div>
                                                    <div className="single_order_mount">数量: {item.sum}</div>
                                                </span>
                                                {/* 总价 */}
                                                <span className="order_total_price">
                                                    总价: ￥{item.price}
                                                </span>
                                                {/* 状态 */}
                                                <span className="order_status">
                                                <Button onClick={()=>this.editGoodsItem(item.gid)} size="small" style={{ marginRight: "1rem" }}>编辑</Button>
                                                <Button onClick={()=>this.deleteGoodsItem(item.gid)} size="small" type="danger">删除</Button>
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
                <EditPublishGoodsModal />
            </>
        )
    }
    componentDidMount() {
        this.props.getMyPulishGoods()
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        myPublishGoodsList: state.get('myPublishGoodsList')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMyPulishGoods: () => {
            dispatch(actionCreators.getMyPulishGoods())
        },
        deleteGoodsItem:(gid) => {
            dispatch(actionCreators.deleteGoodsItem(gid))
        },
        showPublishGoodsEditModal:()=>{
            dispatch(actionCreators.showPublishGoodsEditModal())
        },
        saveUserChooseEditGoodsGid:(gid)=>{
            dispatch(actionCreators.saveUserChooseEditGoodsGid(gid))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPublishOrder);
