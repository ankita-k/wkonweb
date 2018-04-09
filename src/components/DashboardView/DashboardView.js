import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './DashboardView.css';
import total from '../../Images/total.png';
import convert from '../../Images/convert.png';
import pipeline from '../../Images/pipeline.png';
import projecttotal from '../../Images/projecttotal.png';
import progress from '../../Images/progress.png';
import projectpipe from '../../Images/projectpipe.png';
import man from '../../Images/wkon-2-21.png';
import mantwo from '../../Images/wkon-2-22.png';
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
                 {/* Project section start */}

                 <div className="ProjectSection">
                 <h1 className="ProjectHead">PROJECTS</h1>
                 <div className="ProjectDetails">
                 <Row>
                     <Col xs={24} sm={24} md={8} lg={8}>
                         <div className="ProjectTotal">
                         <p>
                                 <img src={projecttotal} alt="Customer" /><span>Total</span>
                         </p>
                         <h1 class="ProjectNumber">300</h1>
                         </div>
                     </Col>
                     <Col xs={24} sm={24} md={8} lg={8}>
                      <div className="ProjectTotal">
                      <p>
                                 <img src={progress} alt="Customer" /><span>In Progress</span>
                         </p>
                         <h1 class="ProjectNumber">250</h1>
                         </div>
                         </Col>
                     <Col xs={24} sm={24} md={8} lg={8}>
                      <div className="ProjectTotal">
                      <p>
                                 <img src={projectpipe} alt="Customer" /><span>Pipeline</span>
                         </p>
                         <h1 class="ProjectNumber">200</h1>
                         </div>
                         </Col>
                 </Row>
                 </div>
                 </div>
 
                  {/* Project section end */}
                {/* Recentactivity */}
                <div className="recentactivity">
                <h1>RECENT ACTIVITY</h1>

                <div className="firstman">
                    <Row>
                        <Col lg={4}>
                            <img src={man} /></Col>
                        <Col lg={12}>
                            <p>Mr. Stacey R.Eshelman our recently converted customer.</p></Col>
                        <Col lg={6}><p className="date">09.04.2018</p></Col>
                    </Row>
                </div>

                <div className="secondman">
                    <Row>
                        <Col lg={4}>
                            <img src={mantwo} /></Col>
                        <Col lg={12}>
                            <p>Mr.Felix D.Navarro in the pipeline customer</p></Col>
                        <Col lg={6}><p className="date">01.03.2018</p></Col>
                    </Row>
                </div>

            </div>
                {/* Recentactivity */}
            </div>
        );
    }
}

export default DashboardView;
