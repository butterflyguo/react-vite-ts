import { Form, Input, Button, Space, Table,Modal } from 'antd';
const { TextArea } = Input;
import { useAntdTable } from 'ahooks'
import api from "@/api"
import { Role } from '@/types/api'
import React, { useState } from 'react';
export default function RoleList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryParams] = Form.useForm()
  const [form] = Form.useForm()
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render() {
        return (
          <>
            <Button type='text'>编辑</Button>
            <Button type='text'>设置权限</Button>
            <Button type='text'>删除</Button>
          </>
        )
      }
    }
  ]
  interface Result {
    total: number;
    list: Role.RoleItem[];
  }
  const getTableData = ({ current, pageSize }:{current:number,pageSize:number},formData:Role.Params): Promise<Result> => {
    return api.queryRoleList({ ...formData,pageNum:current, pageSize }).then(res=>{
      return {
        total: res.page.total,
        list: res.list
      }
    })
  };
 


  const { tableProps, search } = useAntdTable(getTableData, {
    form:queryParams,
    defaultPageSize: 10
  })
  const handleAdd = () => {
    setIsModalOpen(true)
  }
  const handleOk = async ()=>{
    const formData:Role.CreateParams =  form.getFieldsValue();
      await  api.queryRoleAdd(formData)
      setIsModalOpen(false)
      // getTableData()
  }
  const handleCancel = ()=>{}
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <>
      <div className='role-list'>
        <div className='search-form'>
          <Form form={queryParams} layout='inline'>
            <Form.Item label='角色名称' name='roleName'>
              <Input placeholder='请输入角色名称'></Input>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type='primary' onClick={()=>search}>搜索</Button>
                <Button type='default'>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className='main-container'>
          <div className='header-waraper'>
            <div>角色列表</div>
            <div>
              <Button type='primary' onClick={() => handleAdd()}>
                新增
              </Button>
            </div>
          </div>
          <div className='table-waraper'>
            <Table columns={columns} rowKey='email' {...tableProps} />
          </div>
        </div>
      </div>
      <Modal title="新增" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
      <Form form={form} {...layout}>
            <Form.Item label='角色名称' name='roleName'  rules={[{ required: true, message: '角色名称不能为空!' }]} >
              <Input placeholder='请输入角色名称'></Input>
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <TextArea rows={2} placeholder="请输入备注" maxLength={10} />
            </Form.Item>
          </Form>
      </Modal>
    </>
  )
}
