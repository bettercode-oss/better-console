import React, {useEffect, useState} from "react";
import {Button, Form, Input, message} from 'antd';
import {WebHookGoService} from "./web-hook-go.service";
import SiteService from "../../components/settings/site.service";

const { TextArea } = Input;

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

const TemplateForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [template, setTemplate] = useState(null);

  useEffect(() => {
    WebHookGoService.getTemplate().then(response => {
      form.setFieldsValue({
        template: response.data.result
      });
    });
  }, [form]);


  const save = async (values) => {
    const template = {
      content: values.template
    };

    setLoading(true);
    const response = await WebHookGoService.checkTemplateSyntax(template);
    if(response.data.result === "OK") {
      WebHookGoService.saveTemplate(template).then(() => {
        message.success("저장 되었습니다.");
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
      message.error("문법 오류 입니다. : " + response.data.result, 10);
    }
  }

  const reloadTemplate = () => {
    setLoading(true);

    WebHookGoService.reloadTemplate().then(() => {
      message.success("템플릿 Reload 완료");
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Form {...formItemLayout} form={form} onFinish={save}>
        <Form.Item
          name="template"
          label="템플릿"
          rules={[{
            required: true,
            message: '템플릿을 입력해 주세요.',
          }]}
        >
          <TextArea rows={20} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
            저장
          </Button>

          <Button loading={loading} style={{marginLeft: "10px"}} onClick={reloadTemplate}>
            템플릿 Reload
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};
export default TemplateForm;
