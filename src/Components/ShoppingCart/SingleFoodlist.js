import React, { Component } from 'react'
import {Checkbox,InputNumber,Icon} from 'antd';
import './SingleFoodlist.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actionCreator';

class SingleFoodlist extends Component {
    state={
        unitTotleValue : 0,
    }
    onChange=(e)=> {
        console.log(`checked = ${e.target.checked}`);
    }
    // 改变数量按钮
    changeMount = (mountValue)=>{
        const unitPrice = this.props.item.price;
        const totlePrice = unitPrice * mountValue;
        console.log(totlePrice);
        
        // this.setState({
        //     unitTotleValue:totlePrice
        // })
        // console.log('changed', mountValue);
    }
    deleteShoppingCart(gid){
        console.log('deleteShoppingCart',gid);
        this.props.deleteShoppingCart(gid);
    }
    render() {
        return (
            <>
                {/* 一个菜品 */}
                <div className="content_area">

                    <div className="single_foods">
                        <span className="choose">
                            <Checkbox onChange={this.onChange}></Checkbox>
                        </span>
                        <span className="food">

                            <img src={"http://120.79.56.242:8080/"+this.props.item.path} alt='/' />
                        <span className="food_name">{this.props.item.name}</span>
                        </span>
                        <span className="unitprice">{this.props.item.price}</span>
                        <span className="mount">
                            <InputNumber
                                min={1}
                                max={this.props.item.sum}
                                defaultValue={1}
                                onChange={this.changeMount}
                            />
                        </span>
                        <span className="money">
                            <span className="howmuch">￥{this.props.item.price}</span>
                        </span>
                        <span onClick={()=>this.deleteShoppingCart(this.props.item.gid)} className="option" >
                            <Icon  type="close" />
                        </span>
                    </div>
                </div>
                {/* 一个菜品结束 */}

            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteShoppingCart: (gid) => {
            dispatch(actionCreators.deleteShoppingCart(gid))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleFoodlist) 