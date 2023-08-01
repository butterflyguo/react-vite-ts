import { Form, Input, Button,Table,Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useEffect, useState,useRef} from "react";
import CreateModal from './CreateModal';
import { Dept } from "@/types/api";
import { IAction } from '@/types/modal';
import {formatDate} from "@/utils"
import api from "@/api";
export default () => {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const deptRef = useRef<{
    open:(type:IAction,data?:Dept.DeptItem)=>void,
    data?:Dept.DeptItem[]
  }>();
  const columns: ColumnsType<any> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName'
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    }, {
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <>
          
            <Button type='text' onClick={()=>handleAdd(record)}>新增</Button>
            <Button type='text' onClick={()=>handleEdit(record)}>编辑</Button>
            <Button type='text' danger onClick={()=>handleDelete(record)}>
              删除
            </Button>
          </>
        )
      }
    }
  ]
  const [data,setData] = useState<Dept.DeptItem[]>([])
  const getDeptList = async (params?:{deptName:string})=>{
   const data = await api.queryDeptList(params)
   setData(data)
  }
  useEffect(()=>{
    getDeptList()
  },[])
  //新增
  const handleAdd = (record?:Dept.DeptItem)=>{
    deptRef.current?.open('create',record)
  }
  //编辑
  const handleEdit = (record:Dept.DeptItem)=>{
    deptRef.current?.open('edit',record)
  }
  //删除
  const handleDelete = (record:Dept.DeptItem)=>{
    modal.confirm({
        title: '温馨提示',
        content: '确认删除该部门吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: ()=>{
          queryDelete(record._id)
        }
      });
  }
  const queryDelete = async (_id:string)=>{
    await api.queryDelete(_id)
    getDeptList();
  }
  return (
    <div className='dept-list'>
        {contextHolder}
        <CreateModal mRef={deptRef} update={getDeptList} data={data}/>
      <div className='search-form'>
        <Form layout='inline' form={form}>
          <Form.Item label='部门名称' name='deptName'>
            <Input type='text' placeholder='部门名称' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={()=> getDeptList(form.getFieldsValue()) }>搜索</Button>
            <Button className='ml20' onClick={()=>form.resetFields()}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className='main-container'>
        <div className='header-waraper'>
          <div>部门列表</div>
          <div>
            <Button type='primary' onClick={()=>handleAdd()}>新增</Button>
          </div>
        </div>
        <div className='table-waraper'>
          <Table
            rowKey='_id'
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}
