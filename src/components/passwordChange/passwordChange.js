
import React, { Component } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';
import {config} from '../../config';

const FormItem = Form.Item;

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let conf=config.headers;
            let data={
                id: sessionStorage.getItem('id'),
                password: values.oldPassword,
                newPassword: values.password

            }
            axios.put(config.apiUrl+'user/resetPassword',data,conf)
            .then((response)=> {
              if(response.data & response.data._id)
              {
                  this.props.history.push('/dashboard');
              }
            })
            .catch((error)=> {
              console.log(error);
              alert("An error occurred");
            });
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Old Password">
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: 'Please input your old Password!' }],
                        })(
                            <Input type="password" placeholder="Old Password" />)}
                    </FormItem>
                    <FormItem label="New Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }, {
                                validator: this.validateToNextPassword,
                              }],
                        })(
                            <Input type="password" placeholder="New Password" />
                        )}
                    </FormItem>
                    <FormItem label="Confirm New Password">
                        {getFieldDecorator('confirm', {
                            rules: [{ required: true, message: 'Please confirm your new Password!' },{
                                validator: this.compareToFirstPassword,
                              }],
                        })(
                            <Input type="password" placeholder="Confirm New Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const ChangePassword = Form.create()(ChangePasswordForm);


export default ChangePassword;