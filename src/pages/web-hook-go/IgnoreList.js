import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, Menu, Row, Table, Tag} from "antd";
import {DownOutlined, PlusCircleOutlined, SettingOutlined} from "@ant-design/icons";
import {WebHookGoService} from "./web-hook-go.service";
import {Link} from "react-router-dom";

const PAGE_SIZE = 10;

const IgnoreList = () => {
  const [ignores, setIgnores] = useState([]);

  useEffect(() => {
    loadIgnores({
      page: 1
    });
  }, []);

  const loadIgnores = (params) => {
    params.pageSize = PAGE_SIZE;
    WebHookGoService.getIgnores(params).then(response => {
      setIgnores(response.data.result);
    });
  }

  const ignoreTableChanged = (e) => {
    const params = {
      page: e.current,
    };

    loadIgnores(params);
  }

  const columns = [{
    title: 'Instance',
    dataIndex: 'instance',
  }, {
    title: 'Alert name',
    dataIndex: 'alert_name',
  }, {
    title: 'Job',
    dataIndex: 'job',
  }, {
    title: 'Status',
    dataIndex: 'status',
  }, {
    title: 'Forever',
    dataIndex: 'forever',
    render: (text, record) => (
      <Tag color={record.forever ? 'magenta' : 'blue'}>{String(record.forever)}</Tag>
    )
  }, {
    title: '',
    align: 'right',
    render: (text, record) => {
      return (
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="0">
              <Button type="text">삭제</Button>
            </Menu.Item>
          </Menu>} trigger={['click']}>
          <Button style={{borderRadius: '5px'}} icon={<SettingOutlined/>}>
            <DownOutlined/>
          </Button>
        </Dropdown>)
    }
  }];

  return (
    <>
      <div style={{margin: "10px", paddingTop: "10px"}}>
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Link to="/web-hook-go/ignores/new">
              <Button type="default" icon={<PlusCircleOutlined/>}>
                Ignore 추가
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      <Table rowKey="id" dataSource={ignores} columns={columns} locale={{emptyText: "데이터 없음"}}
             pagination={{pageSize: PAGE_SIZE, total: 10}}
             onChange={ignoreTableChanged}/>
    </>)
};

export default IgnoreList;
