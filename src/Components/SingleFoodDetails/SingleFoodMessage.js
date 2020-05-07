import React, { Component } from 'react'
import './SingleFoodMessage.css';
import './SingleFoodMessage.m.css';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
const { TextArea } = Input;

class SingleFoodMessage extends Component {

    render() {
        return (
            <>
                <div className="single_food_main">
                    {/* 菜品信息区域 */}
                    <div className="food_message_area">
                        <span className="food_pic">
                            <img src={"http://120.79.56.242:8080/" + this.props.goods.path} />
                        </span>
                        <span className="food_message">
                            <div className="food_name">{this.props.goods.name}</div>
                            <div className="user_star">类型：{this.props.goods.type}</div>
                            <div className="user_star">剩余：{this.props.goods.sum}</div>
                            <div className="food_details">{this.props.goods.beizhu}</div>
                            <div className="unit_price_and_btn">

                                <span className="unit_price">{this.props.goods.price}元</span>
                                <span className="unit_btn">
                                {
                                    this.props.isLogin === true || sessionStorage.getItem('isLogin') != null ?
                                    <Button type="primary" size="large" onClick={()=>this.addToShoppingCart(this.props.item.gid)}>加入购物车</Button>
                                    :
                                    <Button type="primary" size="large" onClick={()=>this.props.showModal()}>立即订购</Button>
                                }
                                </span>

                            </div>
                        </span>

                    </div>


                </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.get('isLogin')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showModal(){
            dispatch(actionCreators.showModal())
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleFoodMessage) ;
