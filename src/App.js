import React from 'react';
import './App.css';
import Header from './Components/common/Header';
import Home from './Page/Home';
import ShoppingCart from './Page/ShoppingCart';
import ForgetPassword from './Page/ForgetPassword';
import SingleFoodDetails from './Page/SingleFoodDetails';
import UserInformation from './Page/UserInformation';
import GoodsPublish from './Page/GoodsPublish';
import AddNewGoods from './Page/AddNewGoods';
import IamCustomer from './Page/IamCustomer';
import IamSaleman from './Page/IamSaleman';
import Order from './Page/Order';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { message } from 'antd';
// import { HashRouter, Route, Redirect } from 'react-router-dom';
function App() {
  const isLogin = sessionStorage.getItem('isLogin');
  return (
    <div className="App">
      <HashRouter>
        <Route path='/' component={Header}></Route>
        <Route path='/' exact component={Home} ></Route>
        <Route path='/forget' exact component={ForgetPassword}></Route>
        <Route path='/foodDetail/:gid' exact component={SingleFoodDetails}></Route>
        {/* 判断是否登录 */}
        <Route exact path="/shoppingCart" render={
          () => {
            if (isLogin) {
              return (
                <ShoppingCart />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/me" render={
          () => {
            if (isLogin) {
              return (
                <UserInformation />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/publish" render={
          () => {
            if (isLogin) {
              return (
                <GoodsPublish />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/addNewGoods" render={
          () => {
            if (isLogin) {
              return (
                <AddNewGoods />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/customer" render={
          () => {
            if (isLogin) {
              return (
                <IamCustomer />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/saleman" render={
          () => {
            if (isLogin) {
              return (
                <IamSaleman />
              )
            } else {
              message.warning('请登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />

        <Route exact path="/order" render={
          () => {
            if (isLogin && isLogin === 'wangyu') {
              return (
                <Order />
              )
            } else {
              message.warning('请使用wangyu账户登录后查看')
              return (
                <Redirect to="/" />
              )
            }
          }} />




      </HashRouter>
    </div>
  );
}

export default App;
