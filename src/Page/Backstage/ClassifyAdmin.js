import React, { Component } from 'react'
import { Layout, Breadcrumb,Row,Col } from 'antd';
import AdminSider from '../../Components/Admin/common/AdminSider';
import AdminHeader from '../../Components/Admin/common/AdminHeader';
import AdminFooter from '../../Components/Admin/common/AdminFooter';
import ClassifyContent from '../../Components/Admin/ClassifyAdmin/ClassifyContent';
const { Content } = Layout;

class ClassifyAdmin extends Component {

  render() {
    return (
      <>
      <Layout style={{ minHeight: '100vh' }}> 
      <AdminSider />
      <Layout style={{ textAlign: "left",padding: 0}}>
          <AdminHeader />
          <Content style={{ margin: '0 16px' }}>

            {/* 面包屑导航 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>登录</Breadcrumb.Item>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            </Breadcrumb>
            <Row type="flex" justify="center" >
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              {/* 内容区域 */}
              <ClassifyContent />
              </Col>
            </Row>

          </Content>
          <AdminFooter/>
        </Layout>
      </Layout>
      </>
    );
  }
}
export default ClassifyAdmin;


