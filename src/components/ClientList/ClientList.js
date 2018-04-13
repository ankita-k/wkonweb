import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row } from 'antd';
import '../NewProject/NewProject.css';
import './ClientList.css';
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  
  }, {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Domain',
    dataIndex: 'domain',
    key: 'domain',
  }, {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
          <Button className="edit">
        <a href="javascript:;"><Icon type="edit" /></a></Button>
        <Button className="delete"><a href="javascript:;"><Icon type="delete" /></a></Button>
      </span>
    ),
  }];
  
  const data = [{
    key: '1',
    name: 'Sukanta Sinha',
    phone:876778906,
    email: 'sukantasinha@memeinfotech.com',
    domain:'Lorem',
    country: 'New York',
    status:'Pipeline',
  }, {
    key: '2',
    name: 'Payel Dutta',
    phone:826778906,
    email: 'payeldutta@memeinfotech.com',
    domain:'Lorem',
    country: 'London',
    status:'Pipeline',
  }, {
    key: '3',
    name: 'Priyanka Saha',
    phone:846778906,
    email: 'priyankasaha@memeinfotech.com',
    domain:'Lorem',
    country: 'Sydney',
    status:'Pipeline',
  }];
class ClientList extends Component {
 
    render() {
     
        return (
            <div>
                    <h1 className="clientList">CLIENT LIST</h1>
                    <Row>
                        <div className="addButton clientadd">
                            <Button onClick={()=>{this.props.history.push('/dashboard/clientcreate')}}>+</Button>
                        </div>
                    </Row>
                {/* clientlist */}
                <Card className="innercardContenta" bordered={false}>
                <Table columns={columns} dataSource={data} />
                </Card>
                {/* clientlist */}
            </div>
        );
    }
}
export default ClientList;
