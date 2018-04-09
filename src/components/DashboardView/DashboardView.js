import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './DashboardView.css';
import total from '../../Images/total.png';
import convert from '../../Images/convert.png';
import pipeline from '../../Images/pipeline.png';

class DashboardView extends Component {

    render() {
        return (
            <div className="dashboardMain">
                {/* dashboardviewcustomer */}
                <div className="dashboardView">
                    <h1 className="customer">CUSTOMERS</h1>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={total} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 class="totalNumber">1833</h1>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={convert} className="totalImg" alt="Convert" /><span className="totalContent">Converted</span>
                                </p>
                                <h1 class="totalNumber">1000</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={pipeline} className="totalImg" alt="Pipeline" /><span className="totalContent">Pipeline</span>
                                </p>
                                <h1 class="totalNumber">500</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* dashboardviewcustomer */}
                {/* dashboardProject */}
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
                {/* dashboardProject */}
                {/* Recentactivity */}
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
                {/* Recentactivity */}
            </div>
        );
    }
}

export default DashboardView;
