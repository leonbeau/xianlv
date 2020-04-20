import React, { Component } from 'react'
import './Me.css';
import { Button } from 'antd';
import EditModal from './EditMeModal';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actionCreator';

class Me extends Component {

    
    render() {
        const me = this.props.meMessage
        const showEditMeMessageModal = ()=> {
            this.props.showMeMessageEditModal();
        }
        return (
            <>
                <div className="me_main">
                    {/* 我的信息区域 */}
                    <div className="me_area">
                        <div className="me_content">
                        <span　className="head_picture">
                        <img src="https://i.loli.net/2020/02/19/fdTypGLAM3WRrsI.jpg" alt="/" />
                        </span>
                        <span className="me_message">
                            <div className="me_nickname">{me.username}</div>
                            <div className="me_sex">手机: {me.phone}</div>
                                <div className="me_username">微信: {me.vx}</div>
                            <div className="me_register_time_btn">
                                <span className="me_register_time">Q Q: {me.qq}</span>
                                <span className="me_register_btn"><Button size="large" onClick={()=>showEditMeMessageModal()}>编辑个人资料</Button></span>
                            </div>
                            
                        </span>
                        </div>
                    </div>
                    <EditModal />
                    {/* 我的订单区域 */}
                        {/* <MyOrders /> */}
                    {/* 我的订单结束 */}
                </div>
            </>
        )
    }
    componentDidMount(){
        this.props.getMeMessage();
    }
   
}

const mapStateToProps = (state, ownProps) => {
    return {
        meMessage: state.get('meMessage')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //获取当前用户信息
        getMeMessage: () => {
            dispatch(actionCreators.getMeMessage())
        },
        showMeMessageEditModal:() => {
            dispatch(actionCreators.showMeMessageEditModal())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Me);