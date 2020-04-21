import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    isAdmin: false,
    modalVisible: false,
    showRegisterOrLoginMain: false,
    allowSendCode: true,
    isLogin: false,
    token: '',
    dishesCategoriesList: [],
    adminSiderSelectedState: '1',
    classifyAddModalShowOrCancel: false,
    homeDishesList: [],
    meMessage: [],
    meMessageEditModalState: false,
    myPublishGoodsList:[],
    showOrCancelMyPublishGoodsEditModal:false,
    publiseUserChooseGoodsGid:null,
    totalPage:1,
    shoppingCartGoods:[],
    goodsDetails:{},
    shoppingCartTotalPrice:0,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        //欢迎界面保存是否是管理员状态
        case actionTypes.WELCOME_IS_ADMIN_TO_TRUE:
            return state.set('isAdmin', true);
        case actionTypes.WELCOME_IS_ADMIN_TO_FALSE:
            return state.set('isAdmin', false);
        // 打开登录注册弹窗
        case actionTypes.SHOW_MODAL:
            return state.set('modalVisible', true);
        // 关闭登录注册弹窗
        case actionTypes.CANCEL_MODAL:
            return state.set('modalVisible', false);
        case actionTypes.TO_REGISTER_MAIN:
            return state.set('showRegisterOrLoginMain', true);
        case actionTypes.TO_LOGIN_MAIN:
            return state.set('showRegisterOrLoginMain', false);
        case actionTypes.CHANGE_GETCODE_BTN_TO_TRUE:
            return state.set('allowSendCode', true);
        case actionTypes.CHANGE_GETCODE_BTN_TO_FALSE:
            return state.set('allowSendCode', false);
        case actionTypes.LOGIN_SUCCESS_SAVE_STATE:
            return state.merge({
                'isLogin': true,
                'token': action.data,
            });
        case actionTypes.TO_LOGIN_OUT:
            return state.merge({
                'isLogin': false,
                'token': ''
            })
        // 获取主页分类列表
        case actionTypes.GET_ALL_CATEGORIES:
            return state.set('dishesCategoriesList', action.data);
        case actionTypes.CHANGE_ADMIN_SIDER_STATE:
            return state.set('adminSiderSelectedState', action.data + '');
        case actionTypes.CLASSIFY_SHOW_ADD_MODAL:
            return state.set('classifyAddModalShowOrCancel', true)
        case actionTypes.CLASSIFY_CANCEL_ADD_MODAL:
            return state.set('classifyAddModalShowOrCancel', false);
        case actionTypes.HOME_DISHES_LIST:
            return state.set('homeDishesList', action.data);

        //保存用户信息
        case actionTypes.GET_ME_MESSAGE:
            return state.set('meMessage', action.data);

        case actionTypes.SHOW_ME_MESSAGE_EDIT_MODAL:
            return state.set('meMessageEditModalState', true)
        case actionTypes.CANCAL_ME_MESSAGE_EDIT_MODAL:
            return state.set('meMessageEditModalState', false)
        case actionTypes.MY_PUBLISH_GOODS:
            return state.set('myPublishGoodsList',action.data)
        //显示或者关闭我发布的商品编辑Modal框
        case actionTypes.SHOW_PUBLISH_GOODS_EDIT_MODAL:
            return state.set('showOrCancelMyPublishGoodsEditModal',true)
        case actionTypes.CANCEL_PUBLISH_GOODS_EDIT_MODAL:
            return state.set('showOrCancelMyPublishGoodsEditModal',false);
        //当用户点击我的发布的商品编辑时，保存商品gid
        case actionTypes.SAVE_USER_CHOOSE_EDIT_GOODS_GID:
            return state.set('publiseUserChooseGoodsGid',action.data);
        case actionTypes.TOTAL_PAGE:
            return state.set('totalPage',action.data);
        case actionTypes.SHOPPING_CART_GOODS:
            return state.set('shoppingCartGoods',action.data);
        case actionTypes.GOODS_DETAILS:
            return state.set('goodsDetails',action.data);
        case actionTypes.SHOPPING_CART_TOTAL_PRICE:
            return state.set('shoppingCartTotalPrice',action.data);
        default:
            return state;
    }


}
