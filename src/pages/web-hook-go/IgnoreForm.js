import React, {useState} from "react";
import {Button, Form, Input, message} from 'antd';
import {WebHookGoService} from "./web-hook-go.service";

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 7},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 12},
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    }
  },
};

const IgnoreForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const save = (values) => {
    const newIgnore = {
      instance: values.instance
    };

    if (values.alertName) {
      newIgnore.alertName = values.alertName
    }


    if (values.job) {
      newIgnore.job = values.job
    }

    if (values.status) {
      newIgnore.status = values.status
    }

    setLoading(true);

    WebHookGoService.createIgnore(newIgnore).then(() => {
      message.success("저장 되었습니다.");
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Form {...formItemLayout} form={form} onFinish={save}>
        <Form.Item
          name="instance"
          label="Instance"
          rules={[{
            required: true,
            message: 'Instance를 입력해 주세요.',
          }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="alertName"
          label="Alert name"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="job"
          label="Job"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
        >
          <Input/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};
export default IgnoreForm;
