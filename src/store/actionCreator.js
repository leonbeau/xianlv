import axios from 'axios';
import * as actionTypes from './actionTypes'
import { message } from 'antd';
import Qs from 'qs';

export const showModal = () => ({
    type: actionTypes.SHOW_MODAL
});

export const cancelModal = () => ({
    type: actionTypes.CANCEL_MODAL
})
// 模态框从登录变为注册
export const toRegisterMain = () => ({
    type: actionTypes.TO_REGISTER_MAIN
})
// 模态框从注册变为登录
export const toLoginMain = () => ({
    type: actionTypes.TO_LOGIN_MAIN
})

// 获取验证码接口
export const getRegisterCode = (email) => {
    console.log('xxxx'+email);
    
    console.log(Qs.stringify(email))
    return (dispatch) => {
        let data = {
            email:email
        }
        console.log(JSON.stringify(data))
        console.log(Qs.stringify(data))
        axios({
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url:'/vccode',
            data:Qs.stringify(data)
        }).then((res)=>{
            // console.log(res.data.success);
            // dispatch(toRegister(res.data.success));
            message.success(res.data.message);
            // history.push('/#/');
            // setTimeout( ()=>  history.go(),1600);
            console.log(res)
        }).catch((error)=>{
            console.log(error);
            
            message.error('失败,请稍后重试。',error);
            
        })
    }
}