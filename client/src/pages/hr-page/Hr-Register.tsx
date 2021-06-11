import React, { useEffect } from 'react'
import { useState } from 'react';
import { getHrById } from '../../utils/drafts/hr.utils'
import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Spin } from "antd";
import { updateHrById } from '../../utils/drafts/hr.utils'
import { useParams } from 'react-router-dom';



export default function HrRegisterForm() {
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

  // fake url paramaters for getHrById() 
  let urlParam = {
    recruiterId: '60b9877a2b619847d84d17a3',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI5ODc3YTJiNjE5ODQ3ZDg0ZDE3YTMiLCJlbWFpbCI6ImphbWJlcnUuc2ltYW50b3ZAZ21haWwuY29tIiwiaWF0IjoxNjIyNzcxNTc4LCJleHAiOjE3MDkxNzE1Nzh9.iFaLe_FL_sMYkZtwHN1CPVwmtAKZNmBkZhTGYJuFfDY'
  }
  // to fix to better looking solution
  const { id, token } = useParams<Record<string, string | undefined>>()
  console.log({ id, token })



  const [hrData, setHrData] = useState({
    id: '',
    email: '',
    name: '',
    phone: '',
    password: '',
    password1: '',
    company: ''
  })
  useEffect(() => {
    let urlParam = {
      recruiterId: '60b9877a2b619847d84d17a3',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI5ODc3YTJiNjE5ODQ3ZDg0ZDE3YTMiLCJlbWFpbCI6ImphbWJlcnUuc2ltYW50b3ZAZ21haWwuY29tIiwiaWF0IjoxNjIyNzcxNTc4LCJleHAiOjE3MDkxNzE1Nzh9.iFaLe_FL_sMYkZtwHN1CPVwmtAKZNmBkZhTGYJuFfDY'
    }
       // consider async function instead of nesting  ===> (async () => {})() : IIFE‏
    getHrById(urlParam.recruiterId, urlParam.token).then(data => {
      // console.log(data);

    setHrData({ ...hrData, company: data.data.company, email: data.data.email });
      // console.log(hrData)
    });
  }
    , [])

  const onFinish = async (values: any) => {
    /* updateHrById({phone:'1800bootstrapON'},"60b61267ac39f113dedb0439",token).then(data => console.log(data)) */


  }
  const onFinishFailed = (errorInfo: any) => { console.log('Failed:', errorInfo) }
  console.log(hrData)

  return (
    <>
    {/* Start with spinner in this tennary add second return to make it more readable */}
      {
        hrData.email && hrData.company ?
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true, email: hrData.email, company: hrData.company }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label='דוא"ל' name="email" rules={[{
              type: 'email',
              message: 'אנא הזן דו"אל תקין!',
            }, { required: true, message: 'בבקשה להקליד מייל' }]}>
              <Input disabled={true} placeholder="mail@gmail.com" />
            </Form.Item>
            <Form.Item label="שם מלא" name="name" rules={[{ required: true, message: 'בבקשה הקלד שם מלא' }]}>
              <Input id="fullName" onChange={e => setHrData({ ...hrData, name: e.target.value })} placeholder="ג'ון סמית" />
            </Form.Item>
            <Form.Item label="טלפון" name="phone" rules={[{ required: true, message: 'בבקשה הקלד מספר טלפון תקין' }]}>
              <Input id="phoneNumber" onChange={e => setHrData({ ...hrData, phone: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="password"
              label="סיסמה"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password onChange={e => { setHrData({ ...hrData, password: e.target.value }) }} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="וודא סיסמה"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password onChange={e => { setHrData({ ...hrData, password1: e.target.value }) }} />
            </Form.Item>

            <Form.Item label="שם ארגון" name="company">
              <Input id="company" disabled={true} />
            </Form.Item>
            <Button id="submitBtn" type="primary" htmlType="submit">
              Submit
        </Button>
          </Form>
          : <Spin />}
    </>
  );
}




// {success: true, data: {…}, message: "success on getHrByUrlId"}
// data:
// company: "jamberTech"
// date: "2021-06-04T01:52:58.049Z"
// email: "jamberu.simantov@gmail.com"
// isCompanyFirstUser: false
// __v: 0
// _id: "60b9877a2b619847d84d17a3"
// __proto__: Object
// message: "success on getHrByUrlId"
// success: true
// __proto__: Object