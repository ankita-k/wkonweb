import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './form.css';
import { Form, Icon, Input, Button, Checkbox, Radio, Row, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;

function onChange(date, dateString) {
    console.log(date, dateString);
}  

class NormalLoginForm extends React.Component {
 state = {
    value: 1,
    }
    onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
        value: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24}>
            <Col span={12}>
              <FormItem>
                {getFieldDecorator('firstname', {
                rules: [{ required: true, message: 'Please input your firstname!' }],
                })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Firstname" />
                )}
             </FormItem>
             <FormItem>
                    <DatePicker onChange={onChange}  placeholder="Date of Birth"/>
             </FormItem>
            </Col>

            <Col span={12}>
                <FormItem>
                    {getFieldDecorator('lastname', {
                    rules: [{ required: true, message: 'Please input your lastname!' }],
                    })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Lastname" />
                    )}
                </FormItem>
              
                <FormItem>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                    <Radio value={3}>Other</Radio>
                </RadioGroup>
             </FormItem>

            </Col>
        </Row>

        <Row gutter={24}>
            <FormItem>
              <TextArea rows={4} placeholder="Description" />
            </FormItem>
        </Row>
    

        <FormItem style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default WrappedNormalLoginForm;
