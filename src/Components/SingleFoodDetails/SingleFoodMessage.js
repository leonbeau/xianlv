import React, { Component } from 'react'
import './SingleFoodMessage.css';
import './SingleFoodMessage.m.css';
import { Button, Input } from 'antd';
const { TextArea } = Input;

export default class SingleFoodMessage extends Component {

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
                                <span className="unit_btn"><Button type="primary" size="large">加入购物车</Button></span>

                            </div>
                        </span>

                    </div>


                </div>
            </>
        )
    }
}
