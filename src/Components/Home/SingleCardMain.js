import React, { Component } from 'react';
import './SingleCardMain.css';
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
                {/* <div className="pagination">
                <div className="layout">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div> */}
            </>
        )
    }

    componentDidMount(){
        //获取所有的分类
        this.props.getAllCategories()
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        homeDishesList: state.get('homeDishesList')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //获取所有的类别
        getAllCategories: () => {
            dispatch(actionCreators.getAllCategories())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (SingleCardMain);