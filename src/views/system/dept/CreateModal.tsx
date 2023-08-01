import { Modal, Form, Input, TreeSelect, Select, message, Pagination } from 'antd'
import { IModalProp, IAction } from '@/types/modal'
import { useEffect, useImperativeHandle, useState, useRef } from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Dept } from '@/types/api'
import api from '@/api'

export default (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [userList, setUserList] = useState<Dept.UserItem[]>([])
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  //调用弹窗显示方法
  const open = (type: IAction, data?: Dept.DeptItem) => {
    setVisible(true)
    setAction(type)
    if (type === 'create' && data) {
      form.setFieldValue('parentId', data._id)
    }
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
    }
  }
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params: Dept.CreateParams  = form.getFieldsValue()
      if (action === 'create') {
        submitDept(params)
      } else {
        editDept(params)
      }
      handleCancel()
      props.update()
    }
  }
  const submitDept = async (params: Dept.CreateParams) => {
    await api.queryAddDept(params)
  }
  const editDept = async (params: Dept.CreateParams) => {
    await api.queryEditDept(params)
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const handleUserChange = () => {}
  const getUserList = async () => {
    const data = await api.queryAllUsers()
    setUserList(data)
  }
  useEffect(() => {
    getUserList()
    if (props.data) setDeptList(props.data)
  }, [props.data])
  return (
    <Modal
      title={action === 'create' ? '新增部门' : '编辑部门'}
      width={600}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <FormItem name='_id' hidden>
          <Input></Input>
        </FormItem>
        <FormItem label='上级部门' name='parentId'>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder='请选择'
            allowClear
            treeDefaultExpandAll
            treeData={deptList}
            fieldNames={{
              label: 'deptName',
              value: '_id'
            }}
          />
        </FormItem>
        <FormItem
          label='部门名称'
          name='deptName'
          rules={[
            { max: 10, message: '部门最长不能超过10个字符!' },
            { required: true, message: '部门名称不能为空!' }
          ]}
        >
          <Input placeholder='请输入部门名称'></Input>
        </FormItem>
        <FormItem label='负责人' name='userName' rules={[{ required: true, message: '负责人不能为空!' }]}>
          <Select onChange={handleUserChange}>
            {' '}
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {' '}
                  {item.userName}{' '}
                </Select.Option>
              )
            })}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}
