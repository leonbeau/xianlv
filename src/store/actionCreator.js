import axios from 'axios';
import * as actionTypes from './actionTypes'
import { message } from 'antd';
import Qs from 'qs';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export const showModal = () => ({
    type: actionTypes.SHOW_MODAL
});
export const welcomeSaveIsAdminToTrue = () => ({
    type: actionTypes.WELCOME_IS_ADMIN_TO_TRUE
})
export const welcomeSaveIsAdminToFalse = () => ({
    type: actionTypes.WELCOME_IS_ADMIN_TO_FALSE
})
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

// 获取验证码button状态，从false改为true

export const changeGetCodeBtnToTrue = () => ({
    type: actionTypes.CHANGE_GETCODE_BTN_TO_TRUE
})

export const changeGetCodeBtnToFalse = () => ({
    type: actionTypes.CHANGE_GETCODE_BTN_TO_FALSE
})
// 获取验证码接口
export const getRegisterCode = (email) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: '/api/getCode?email=' + email,
        }).then((res) => {
            message.success(res.data.message);
        }).catch((error) => {
            // console.log(error);
            dispatch(changeGetCodeBtnToTrue)
            message.error('失败,请稍后重试。', error);

        })
    }
}
// 注册
export const toRegister = (RegisterObject) => {
    console.log(RegisterObject);

    return (dispatch) => {
        let data = RegisterObject;
        // console.log(data)

        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/reg',
            data: data
        }).then((res) => {
            if (res.data.code === 0) {
                // 跳转到登录页
                message.success(res.data.message);
                dispatch(toLoginMain());
            } else {
                message.warning(res.data.message);
            }
        }).catch((error) => {
            message.error('注册失败：', error);

        })
    }
}


// 登录  --------------------------------------------------------------------
export const toLogin = (LoginObject) => {
    // console.log('actioncreateorLogin');
    // console.log(LoginObject);
    return (dispatch) => {
        let data = LoginObject;
        console.log(data.username);
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: '/api/login?username=' + LoginObject.username + '&password=' + LoginObject.password,
            data: Qs.stringify(data)
        }).then((res) => {
            // console.log(res);

            if (res.data.code === 0) {
                // console.log(res.data)
                message.success('登录成功');
                dispatch(loginSuccessSaveState(res.data.data));
                // 登录成功保存状态和token到sessionStroge
                sessionStorage.setItem('isLogin', res.data.data);
                //跳转到主页
                history.push('/#/');
                setTimeout(() => history.go(), 1600);

                dispatch(cancelModal());
            } else {
                message.warning(res.data.message);
            }

        }).catch((error) => {
            message.error('登录失败：', error);
        })
    }
}
// 登录成功保存状态
export const loginSuccessSaveState = (LoginSuccessObject) => ({
    type: actionTypes.LOGIN_SUCCESS_SAVE_STATE,
    data: LoginSuccessObject
})

// 登出
export const logoutDispatch = () => ({
    type: actionTypes.TO_LOGIN_OUT
})

export const logout = () => {
    const userid = sessionStorage.getItem('isLogin');
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/logout?username=' + userid,
        }).then((res) => {
            sessionStorage.removeItem("isLogin");
            dispatch(logoutDispatch());
        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

export const getAllCategoriesList = (categoriesData) => ({
    type: actionTypes.GET_ALL_CATEGORIES,
    data: categoriesData
})

//获得主页菜品分类列表  ---------------------------------------------------------

export const getAllCategories = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getGoodsType',
        }).then((res) => {
            // console.log(res);
            dispatch(getAllCategoriesList(res.data));
        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//改变管理sider的选择状态
export const changeSiderSelectState = (key) => ({
    type: actionTypes.CHANGE_ADMIN_SIDER_STATE,
    data: key
})

//显示addClissifyContent Modal
export const classifyShowAddModal = () => ({
    type: actionTypes.CLASSIFY_SHOW_ADD_MODAL
})

export const classifyCancelAddModal = () => ({
    type: actionTypes.CLASSIFY_CANCEL_ADD_MODAL
})





//删除分类
export const deleteCategory = (categoryName) => {
    return (dispatch) => {
        let data = {
            name: categoryName
        };
        // console.log('actionCreator data',data); 
        axios({
            method: 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority': sessionStorage.getItem('token')
            },
            url: '/api/m/admin/mealKind/' + categoryName,
            data: Qs.stringify(data)
        }).then((res) => {
            if (res.data.success) {
                message.success('删除分类成功');
                history.push('/#/a/classify');
                setTimeout(() => history.go(), 1600);
            } else {
                message.warning(res.data.message);
            }

        }).catch((error) => {
            message.error('删除分类失败：', error);
        })
    }
}

//编辑分类
export const editCategory = (oldCategoryName, newCategoryName) => {
    return (dispatch) => {
        let data = {
            oldName: oldCategoryName,
            newName: newCategoryName
        };
        // console.log('actionCreator data',data); 
        axios({
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority': sessionStorage.getItem('token')
            },
            url: '/api/m/admin/mealKind/' + oldCategoryName,
            data: Qs.stringify(data)
        }).then((res) => {
            if (res.data.success) {
                message.success('修改分类成功');
                history.push('/#/a/classify');
                setTimeout(() => history.go(), 1600);
            } else {
                message.warning(res.data.message);

            }

        }).catch((error) => {
            message.error('修改分类失败：', error);
        })
    }
}

//删除菜品通过id
export const deleteDishById = (dishId) => {
    return (dispatch) => {
        let data = {
            id: dishId
        };
        // console.log('actionCreator data',data); 
        axios({
            method: 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority': sessionStorage.getItem('token')
            },
            url: '/api/m/admin/meal/' + dishId,
            data: Qs.stringify(data)
        }).then((res) => {
            // console.log(res);

            if (res.data.success) {
                message.success('删除菜品成功');
                history.push('/#/a/disheslist');
                setTimeout(() => history.go(), 1600);
            } else {
                message.warning(res.data.message);
            }

        }).catch((error) => {
            message.error('删除菜品失败：', error);
        })
    }
}

// 前台用户部分







// 获取用户信息
export const saveMeMessage = (meData) => ({
    type: actionTypes.GET_ME_MESSAGE,
    data: meData
})
export const getMeMessage = () => {
    const userid = sessionStorage.getItem('isLogin');
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/findUser?username=' + userid,
        }).then((res) => {
            //    console.log(res);
            if (res.data.status === 1) {
                dispatch(saveMeMessage(res.data));
            } else {
                message.warning('警告')
            }

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}


// 显示用户编辑Modal框  ---------------------------------------------------


export const showMeMessageEditModal = () => ({
    type: actionTypes.SHOW_ME_MESSAGE_EDIT_MODAL,
})

//隐藏
export const cancelMeMessageEditModal = () => ({
    type: actionTypes.CANCAL_ME_MESSAGE_EDIT_MODAL,
})



//编辑个人信息
export const editMeMessage = (meObj) => {
    const userid = sessionStorage.getItem('isLogin');
    return (dispatch) => {
        let data = {
            username: userid,
            password: meObj.newPassword,
            vx: meObj.newVx,
            qq: meObj.newQQ,
            phone: meObj.newPhone,
        };
        // console.log('actionCreator data',data); 
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/updateUser',
            data: data
        }).then((res) => {
            if (res.data.code === 1) {
                message.success(res.data.message);
                history.push('/#/me');
                setTimeout(() => history.go(), 1600);
            } else {
                message.success(res.data.message);
            }
            // console.log(res);

        }).catch((error) => {
            message.error('更改个人信息失败：', error);
        })
    }
}

/**
 *    我的发布页面
 *    相关接口：查询我发布的商品
 *             增加发布的商品
 *             更新发布的商品
 *             删除发布的商品
 */


//查询我发布的商品
export const getMyPulishGoodsSave = (data) => ({
    type: actionTypes.MY_PUBLISH_GOODS,
    data: data
})

export const getMyPulishGoods = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/findMyGoods',
        }).then((res) => {
            if (Array.isArray(res.data)) {
                dispatch(getMyPulishGoodsSave(res.data));
            }
            //    console.log(res);
        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//增加我发布的商品
export const addGoods = (goodsObject) => {
    // console.log(goodsObject);

    return (dispatch) => {
        let data = {
            name: goodsObject.goodsName,
            type: goodsObject.goodsType,
            price: parseFloat(goodsObject.goodsUnitPrice),
            sum: parseInt(goodsObject.goodsSum),
            beizhu: goodsObject.goodsDescribe,
            path: goodsObject.dishPicture.file.response,
        }
        // console.log('actionCreator data',data);



        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/addGoods',
            data: data
        }).then((res) => {
            // console.log(res);

            if (res.data === "success") {
                message.success('增加我的发布商品成功');
                history.push('/#/publish');
                setTimeout(() => history.go(), 1600);
            } else {
                message.warning(res.data.message);
            }

        }).catch((error) => {
            message.error('增加商品失败：', error);
        })
    }
}

//删除我发布的商品


export const deleteGoodsItem = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/deleteGoodsByGid?gid=' + gid,
        }).then((res) => {
            if (res.data.code === 1) {
                message.success(res.data.message);
                history.push('/#/publish');
                setTimeout(() => history.go(), 1600);
            }
            //    console.log(res);
        }).catch((error) => {
            message.error('删除失败：', error);
        })
    }
}
//当用户点击我的发布的商品编辑时，保存商品gid
export const saveUserChooseEditGoodsGid = (gid) => ({
    type: actionTypes.SAVE_USER_CHOOSE_EDIT_GOODS_GID,
    data: gid
})

//显示或关闭我发布商品的编辑modal框
export const showPublishGoodsEditModal = () => ({
    type: actionTypes.SHOW_PUBLISH_GOODS_EDIT_MODAL,
})

//隐藏
export const cancelPublishGoodsEditModal = () => ({
    type: actionTypes.CANCEL_PUBLISH_GOODS_EDIT_MODAL,
})



//增加我发布的商品
export const editPublishGoods = (goodsObject, gid) => {
    // console.log(goodsObject);

    return (dispatch) => {
        let data = {
            gid: gid,
            name: goodsObject.goodsName,
            type: goodsObject.goodsType,
            price: parseFloat(goodsObject.goodsUnitPrice),
            sum: parseInt(goodsObject.goodsSum),
            beizhu: goodsObject.goodsDescribe,
            path: goodsObject.dishPicture.file.response,
        }


        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/updateGoods',
            data: data
        }).then((res) => {
            // console.log(res);

            if (res.data === "success") {
                message.success('编辑我的发布商品' + gid + '成功');
                history.push('/#/publish');
                setTimeout(() => history.go(), 1600);
            } else {
                message.warning(res.data.message);
            }

        }).catch((error) => {
            message.error('编辑商品失败：', error);
        })
    }
}


//获取全部商品
//保存总页数，分页用
export const saveTotalMount = (totalPage) => ({
    type: actionTypes.TOTAL_PAGE,
    data: totalPage
});

export const getFirstPageGoods = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getGoods?page=1',
        }).then((res) => {
            dispatch(changeSkeletonStateTofalse());
            const goodsLength = res.data.length;
            dispatch(saveTotalMount(goodsLength))
            dispatch(getSelectKeyDishesList(res.data));

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}


//根据用户选择的id去更改渲染home商品列表
//将拿到的菜品列表放到仓库中
export const getSelectKeyDishesList = (dishesData) => ({
    type: actionTypes.HOME_DISHES_LIST,
    data: dishesData
})
//改变骨架屏状态
export const changeSkeletonStateTofalse = ()=>({
    type: actionTypes.HOME_GOODS_LIST_SKELETON_STATE,
})

export const changeHomeDishesList = (selectKey) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getGoodsByType?type=' + selectKey + '&page=1',
        }).then((res) => {
            console.log(res);
            //改变骨架屏状态
            dispatch(changeSkeletonStateTofalse())
            dispatch(getSelectKeyDishesList(res.data));
           
            

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//获取购物车的物品 保存到reducer
export const shoppingCartGoods = (dishesData) => ({
    type: actionTypes.SHOPPING_CART_GOODS,
    data: dishesData
})
export const shoppingCartTotalPrice = (price) => ({
    type: actionTypes.SHOPPING_CART_TOTAL_PRICE,
    data: price
})
export const getMyShoppingCart = (selectKey) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getshop',
        }).then((res) => {
            // console.log(res);
            //计算总费用
            let sum = 0;
            res.data.map((item, index) => {
                const singleMoney = parseFloat(item.price) * parseInt(item.shoppingsum);
                sum = singleMoney + sum
                return sum
            })
            dispatch(shoppingCartTotalPrice(sum))
            dispatch(shoppingCartGoods(res.data));

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//获取商品细节
// showGoodsDetail

export const showGoodsDetailSave = (goodsData) => ({
    type: actionTypes.GOODS_DETAILS,
    data: goodsData
})
export const showGoodsDetail = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getGoodsById?gid=' + gid,
        }).then((res) => {
            // console.log(res);
            dispatch(showGoodsDetailSave(res.data));

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//加入商品到购物车
export const addGoodsToShoppingCart = (gid) => {
    let data = {
        gid: parseInt(gid),
        sum: parseInt(1)
    }
    return (dispatch) => {
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            url: '/api/addShopping',
            data: JSON.stringify(data),
        }).then((res) => {
            message.success('添加到购物车成功')

        }).catch((error) => {
            message.error('获取失败：', error);
        })
    }
}

//把商品从购物车删除
export const deleteShoppingCart = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            url: '/api/deleteShopById?gid=' + gid,
        }).then((res) => {
            message.success('删除购物车商品成功');
            history.push('/#/shoppingcart');
            setTimeout(() => history.go(), 1000);

        }).catch((error) => {
            message.error('删除购物车商品失败', error);
        })
    }
}

//更新购物车商品的数量

export const changeShoppingCartGoodsMount = (mount, gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/updateShoppingSum?gid=' + gid + '&sum=' + mount,
        }).then((res) => {
            // console.log(res);
            if (res.data === 'success') {
                message.success('更新购物车商品成功');
                history.push('/#/shoppingcart');
                setTimeout(() => history.go(), 800);
            }
            // message.success('删除购物车商品成功');
            // history.push('/#/shoppingcart');
            // setTimeout(() => history.go(), 1000);

        }).catch((error) => {
            message.error('更新商品数量失败', error);
        })
    }
}

/**
 * 把购物车商品加入购物车
 */

export const addOrder = (goods) => {
    let goodsData = [];
    for (var i = 0; i < goods.length; i++) {
        var newObject = {};
        newObject.gid = goods[i].gid;
        newObject.sum = goods[i].shoppingsum;
        goodsData.push(newObject);
    }
    console.log(JSON.stringify(goodsData));
    
    return (dispatch) => {
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/addDingDan',
            data: JSON.stringify(goodsData),
        }).then((res) => {
            console.log(res);
            // if (res.data === 'success') {
            //     message.success('下单成功');
            // }

        }).catch((error) => {
            message.error('下单失败', error);
        })
    }
}

/**
 * 管理员wangyu确认订单页面
 *
 */

export const orderListSave = (orderlist) => ({
    type: actionTypes.ADMIN_ORDER_LIST,
    data: orderlist
})

export const showAllOrderList = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getDingdan',
        }).then((res) => {
            console.log(res);
            dispatch(orderListSave(res.data));

        }).catch((error) => {
            message.error('下单失败', error);
        })
    }
}

export const orderAgree = (id) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/agree?username=wangyu&did=' + id,
        }).then((res) => {
            // console.log(res);
            if (res.data === 'success') {
                message.success('已同意订单');
                history.push('/#/order');
                setTimeout(() => history.go(), 800);
            }

        }).catch((error) => {
            message.error('同意订单失败', error);
        })
    }
}

export const orderDisagree = (id) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/noagree?did=' + id,
        }).then((res) => {
            // console.log(res);
            if (res.data === 'success') {
                message.success('已不同意订单');
                history.push('/#/order');
                setTimeout(() => history.go(), 800);
            }

        }).catch((error) => {
            message.error('不同意订单失败', error);
        })
    }
}

//找回密码
export const toRetrievePassword = (username) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/findPassword?username=' + username,
        }).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                message.success(res.data.message);
                history.push('/#/');
                setTimeout(() => history.go(), 1600);
            }

        }).catch((error) => {
            message.error('找回密码失败', error);
        })
    }
}

//买家查看所有订单
export const customerOrdersList = (orderlist) => ({
    type: actionTypes.CUSTOMER_ORDER_LIST,
    data: orderlist
})
export const getCustomerOrders = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getWuliu',
        }).then((res) => {
            // console.log(res.data);
            dispatch(customerOrdersList(res.data))

        }).catch((error) => {
            message.error('获取买家订单失败', error);
        })
    }
}

//买家确认收货
export const confirmOrder = (did) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/recevied?did='+did,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('确认收货成功');
                history.push('/#/customer');
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('确认收货失败', error);
        })
    }
}

//卖家查看所有订单
export const salemanOrdersList = (orderlist) => ({
    type: actionTypes.SALEMAN_ORDER_LIST,
    data: orderlist
})
export const getSalemanOrders = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getDanzi',
        }).then((res) => {
            // console.log(res.data);
            dispatch(salemanOrdersList(res.data))

        }).catch((error) => {
            message.error('获取卖家订单失败', error);
        })
    }
}

//卖家不同意订单
export const disagreeOrder = (did) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/noagreeDanzi?did='+did,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('不同意订单成功');
                history.push('/#/saleman');
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('不同意订单失败', error);
        })
    }
}
//卖家同意订单
export const agreeOrder = (did) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/agreeDanzi?did='+did,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('同意订单成功');
                history.push('/#/saleman');
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('同意订单失败', error);
        })
    }
}

//管理员查看所有的物流信息单

export const allExpressOrdersList = (orderlist) => ({
    type: actionTypes.ALL_EXPRESS_ORDER,
    data: orderlist
})
export const getAllOrderExpress = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getAllDanzi',
        }).then((res) => {
            // console.log(res.data);
            dispatch(allExpressOrdersList(res.data))

        }).catch((error) => {
            message.error('获取订单失败', error);
        })
    }
}

//删除订单
export const removeOrder = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/deleteGoods?gid='+gid,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('删除订单成功');
                history.push('/#/express');
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('删除订单失败', error);
        })
    }
}
//加入收藏夹
export const addCollect = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/addCollection?gid='+gid,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('添加收藏成功');
                history.push('/#/foodDetail/'+gid);
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('添加收藏失败', error);
        })
    }
}

//查看收藏列表

export const allCollectOrdersList = (orderlist) => ({
    type: actionTypes.ALL_COLLECT_ORDER,
    data: orderlist
})
export const getCollectOrders = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: '/api/getCollection',
        }).then((res) => {
            console.log(res.data);
            dispatch(allCollectOrdersList(res.data))

        }).catch((error) => {
            message.error('获取收藏列表失败', error);
        })
    }
}

//删除收藏
export const deleteCollectOrder = (gid) => {
    return (dispatch) => {
        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            url: 'api/deleteCollection?gid='+gid,
        }).then((res) => {
            if(res.data === 'success'){
                message.success('删除收藏成功');
                history.push('/#/collect');
                setTimeout(() => history.go(), 1600);
            }
        }).catch((error) => {
            message.error('删除收藏失败', error);
        })
    }
}