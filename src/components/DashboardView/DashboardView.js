import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './DashboardView.css';
import total from '../../Images/total.png';

class DashboardView extends Component {

    render() {
        return (
            // dashboardviewcustomer
            <div className="dashboardView">
                <h1>CUSTOMERS</h1>
                <Row>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <div className="cusTotal">
                            <p>
                                <img src={total} alt="Customer" />Total
                        </p>
                        <h1 class="totalNumber">1833</h1>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>Col</Col>
                    <Col xs={24} sm={24} md={8} lg={8}>Col</Col>
                </Row>
            </div>
            // dashboardviewcustomer
        );
    }
}

export default DashboardView;
