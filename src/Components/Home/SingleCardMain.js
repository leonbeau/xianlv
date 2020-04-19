import React, { Component } from 'react';
import './SingleCardMain.css';
import {Pagination} from 'antd'
import SingleCard from './SingleCard';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actionCreator';



class SingleCardMain extends Component {

    render() {
        return (
            <>

                <div className="Cards">
                
                    {this.props.homeDishesList.map((item, index) => {
                        
                        return (
                            <SingleCard key={index} item={item} />
                        )

                    })}



                </div>

                {/* 分页 */}
                <div className="pagination">
                <div className="layout">
                    <Pagination defaultCurrent={1} pageSize={9} total={this.props.totalPage} />
                </div>
                </div>
            </>
        )
    }

    componentDidMount(){
        //获取所有菜品
        this.props.getFirstPageGoods();
        // //获取所有的分类
        // this.props.getAllCategories()
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        homeDishesList: state.get('homeDishesList'),
        totalPage:state.get('totalPage')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFirstPageGoods:() => {
            dispatch(actionCreators.getFirstPageGoods())
        },
        // //获取所有的类别
        // getAllCategories: () => {
        //     dispatch(actionCreators.getAllCategories())
        // }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (SingleCardMain);