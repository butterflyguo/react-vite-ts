import {  Modal,Form,Input,Select,Upload,message } from "antd";
import {LoadingOutlined,PlusOutlined}from "@ant-design/icons";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import storage  from "@/utils/storage";
import { useState, useImperativeHandle } from "react"
import { IModalProp,IAction } from '@/types/modal'
import { User } from '@/types/api'
import api from "@/api"

const CreateUser = (props:IModalProp) => {
  const [visible,setVisible] = useState(false)
  const [action,setAction] = useState<IAction>('create')
  //暴露子组件的open 方法
useImperativeHandle(props.mRef, () => {
  return {
    open
  }
})
//调用弹窗显示方法
const open = (type:IAction,data?:User.UserItem )=>{
  setVisible(true)
  setAction(type)
  if(type === 'edit' && data) { 
    form.setFieldsValue(data)
    setImageUrl(data.userImg)
  }
}
  const handleOk = ()=>{}
  const title = '新增'
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState('')
  const [form] = Form.useForm()
  const handleCancel = ()=>{
      setVisible(false)
      form.resetFields()
  }
  const onFinish = async ()=>{
    const valid = await  form.validateFields()
    if(valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: imageUrl
      }
      if(action === 'create') {
        addUser(params)
      }else if(action === 'edit') {
        editUser(params)
      }
    }
  }
  const addUser = async (params:User.CreateParams)=>{
     await api.queryAdd(params)
    props.update()
    handleCancel()
  }
  const editUser = async (params:User.EditParams)=>{
     await api.queryEdit(params)
    props.update()
    handleCancel()
  }
  const onFinishFailed = ()=>{}
  //文件上传之前处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件!');
      return
    }
    const isLt500k = file.size / 1024 / 1024  < 0.5;
    if (!isLt500k) {
      message.error('文件大小不能超出 500K!');
    }
    return isJpgOrPng && isLt500k;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        const { code,data,msg } = info.file.response
        if(code === 0 ) {
          setImageUrl(data.file);
        }else {
          message.error(msg)
        }
      }else if(info.file.status === 'error') {
        message.error('服务器异常，请稍后重试')
      }
    };
  
  
  
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传头像</div>
      </div>
    );
  return (
    <Modal title={{'create':'新增','edit':'修改','delete':'删除'}[action]} open={visible} width={800} okText="确定" cancelText="取消" onOk={onFinish}  onCancel={handleCancel}>
       <Form
       form={form} 
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
    initialValues={{ remember: true }}
    autoComplete="off"
  >
    <Form.Item
      label="用户ID"
      name="userId"
      hidden
    >
      <Input placeholder="请输入用户名称"/>
    </Form.Item>
    <Form.Item
      label="用户名称"
      name="userName"
      rules={[{required: true,message:'用户名称不能为空!'},{ min: 5,max: 12, message: '用户名称最小5个字符，最大12个字符!' }]}
    >
      <Input placeholder="请输入用户名称"/>
    </Form.Item>

    <Form.Item
      label="邮箱"
      name="userEmail"
      rules={[{ type: 'email', message: '邮箱格式错误!' }]}
    >
      <Input placeholder="请输入用户邮箱" disabled={action==='edit'}/>
    </Form.Item>
    <Form.Item
      label="手机号"
      name="mobile"
      rules={[{len: 11,message:'手机号必须为11位数字'},{pattern:/1[1-9]\d{9}/,message:'手机号必须为1开头的11位数字'}]}
    >
      <Input placeholder="请输入手机号" />
    </Form.Item>
    <Form.Item
      label="部门"
      name="deptId"
      rules={[{ required: false, message: '请输入部门!' }]}
    >
      <Input placeholder="请输入部门"/>
    </Form.Item>
    <Form.Item
      label="岗位"
      name="job"
    >
      <Input placeholder="请输入岗位"/>
    </Form.Item>
    <Form.Item
      label="状态"
      name="state"
    >
      <Select  options={[
        { value: 1, label: '在职' },
        { value: 2, label: '离职' },
        { value: 3, label: '试用期' },
      ]}>
      </Select>
    </Form.Item>
    <Form.Item
      label="系统角色"
      name="roleList"
    >
      <Input placeholder="请输入系统角色"/>
    </Form.Item>
    <Form.Item
      label="用户头像"
    >
     <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        headers={{
            Authorization: "Bearer "+ storage.local.get('token'),
            icode: "E69163D5ABC1EE69"
        }}
        action="/api/users/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </Form.Item>
    </Form>
    </Modal>
  )
}
export default CreateUser
