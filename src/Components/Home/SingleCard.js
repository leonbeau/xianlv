import React, { Component } from 'react'
import './SingleCard.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreator';
class SingleCard extends Component {
    addToShoppingCart(gid){
        // console.log('addToShoppingCart gid'+gid);
        this.props.addGoodsToShoppingCart(gid)
    }
    render() {
        return (
            <>
            
                {/* 一个卡片菜品 */}
                <div className="singlecard">

                    {/* 图片区域 */}
                    <div className="singlecard_pic">
                        <img src={"http://120.79.56.242:8080/"+this.props.item.path}/>
                    </div>
                    {/* 价格，数量区域 */}
                    <div className="singlecard_content">
                        <div className="food_name"><span>{this.props.item.name}</span></div>
                        <div className="food_message">
                            <span className="food_price">￥<span>{this.props.item.price}</span> </span>

                            <span className="food_order">
                                <Link to={`/foodDetail/${this.props.item.gid}`}><Button>详情</Button></Link>
                                {
                                    this.props.isLogin === true || sessionStorage.getItem('isLogin') != null ?
                                    <Button type="primary" onClick={()=>this.addToShoppingCart(this.props.item.gid)}>加入购物车</Button>
                                    :
                                    <Button type="primary" onClick={()=>this.props.showModal()}>立即订购</Button>
                                }
                                
                            </span>
                        </div>

                    </div>
                </div>
                {/* 一个卡片菜品　截止 */}
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
        addGoodsToShoppingCart: (gid) => {
            dispatch(actionCreators.addGoodsToShoppingCart(gid))
        },
        showModal(){
            dispatch(actionCreators.showModal())
        },
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SingleCard) ;
