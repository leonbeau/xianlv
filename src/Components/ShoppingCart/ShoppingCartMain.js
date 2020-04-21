import React, { Component } from 'react'
import './ShoppingCartMain.css';
import {Button} from 'antd';
import SingleFoodlist from './SingleFoodlist';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
class ShoppingCartMain extends Component {
   
    
    componentDidMount(){
        this.props.getMyShoppingCart();
    }
    render() {
        return (
            <>
                <div className="shoppingcartPage">
                    <div className="shoppingcartmain">
                        {/* 当购物车为空 */}
                        {/* <div className="shoppingcart_empty"><span>购物车空空如也</span></div> */}
                        {/* 购物车头部 */}
                        <div className="shoppingcart_header">
                            <span className="choose">
                                
                            </span>
                            <span className="food">商品</span>
                            <span className="unitprice">单价</span>
                            <span className="mount">数量</span>
                            <span className="money">金额</span>
                            <span className="option">操作</span>
                        </div>

                        {/* 菜品内容区域 */}
                        <div className="shoppingcart_content">
                        {
                            this.props.shoppingCartGoods.map((item, index) => {
                                // console.log(item);
                                
                                return (
                                    // console.log(item,index)
                                    
                                    <SingleFoodlist key={index} item={item} />
                                    // <GoodList item={item} key={index} refresh={this.refresh.bind(this)}/>
                                )
                            })
                        }
                         
                        </div>
                        {/* 购物车页脚 */}
                        <div className="shoppingcart_footer">
                            <div className="footer_area">
                                <span className="footer_btn">
                                    <Button size="large" type="primary">去结算</Button>
                                </span>
                                <span className="footer_money">
                                    总计金额:
                                    <span className="money_value">
                                       ￥{this.props.shoppingCartTotalPrice}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        shoppingCartGoods: state.get('shoppingCartGoods'),
        shoppingCartTotalPrice:state.get('shoppingCartTotalPrice')
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMyShoppingCart: () => {
            dispatch(actionCreators.getMyShoppingCart())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCartMain);