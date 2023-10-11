import { Modal, Form, Input, TreeSelect,  Radio, InputNumber } from 'antd'
import { IModalProp, IAction } from '@/types/modal'
import { useEffect, useImperativeHandle, useState,} from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Menu } from '@/types/api'
import api from '@/api'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default (props: IModalProp<Menu.MenuItem>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  //调用弹窗显示方法
  const open = (type: IAction, data: Menu.MenuItem) => {
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
      const params: Menu.CreateParams = form.getFieldsValue()
      if (action === 'create') {
        submitMenu(params)
      } else {
        editMenu(params)
      }
      handleCancel()
      props.update()
    }
  }
  const submitMenu = async (params: Menu.CreateParams) => {
    await api.queryAddMenu(params)
  }
  const editMenu = async (params: Menu.CreateParams) => {
    await api.queryEditMenu(params)
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  useEffect(() => {
    if (props.data) setMenuList(props.data)
  }, [props.data])
  return (
    <Modal
      title={action === 'create' ? '新增菜单' : '编辑菜单'}
      width={600}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} initialValues={{menuType: 1,menuState:1,orderBy: props.data?.children?props.data?.children.length:0 }}>
        <FormItem name='_id' hidden>
          <Input></Input>
        </FormItem>
        <FormItem label='父级菜单' name='parentId'>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            treeData={menuList}
            fieldNames={{
              label: 'menuName',
              value: '_id'
            }}
          />
        </FormItem>
        <FormItem label='菜单类型' name='menuType' rules={[{ required: true, message: '菜单类型不能为空!' }]}>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label='菜单名称'
          name='menuName'
          rules={[
            { max: 10, message: '菜单最长不能超过10个字符!' },
            { required: true, message: '菜单名称不能为空!' }
          ]}
        >
          <Input placeholder='请输入菜单名称'></Input>
        </FormItem>
       
        <FormItem shouldUpdate noStyle>
          {() => {
            return (
              form.getFieldValue('menuType') === 2?  <FormItem label='权限标识' name='menuCode'>
              <Input placeholder='请输入权限标识'></Input>
            </FormItem>:
              <>
                <FormItem label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址'></Input>
                </FormItem>
                <FormItem label='组件名称' name='component'>
                  <Input placeholder='请输入组件名称'></Input>
                </FormItem>
                <FormItem label='菜单图标' name='icon'>
          <Input placeholder='请输入菜单图标'></Input>
        </FormItem>
              </>
            )
          }}
        </FormItem>
        <FormItem label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <QuestionCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序值'></InputNumber>
        </FormItem>
        <FormItem label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  )
}
