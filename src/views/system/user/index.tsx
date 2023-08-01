import { Button, Table, Form, Input, Select,Modal, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { User, ResultData, Pagination } from '@/types/api'
import { useEffect, useState,useRef } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
import CreateUser from './CreateModal'
import { IAction } from '@/types/modal'

export default function UserList() {
  const [modal, contextHolder] = Modal.useModal();
  const userRef = useRef<{
    open:(type:IAction)=>void,
    data?:User.UserItem
  }>()
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<User.UserItem[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  const [ids,setIds] = useState<number[]>([])
  const getUserList = async (pageParams: Pagination) => {
    const values = form.getFieldsValue()
    const params = {
      ...values,
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize
    }
    const result: ResultData = await api.queryUserList(params)
    setData(result.list)
    setTotal(result.page.total)
    // setPagination({
    //   current: result.page.pageNum,
    //   pageSize: result.page.pageSize
    // })
    
  }
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '试用期',
          3: '离职'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <>
          
            <Button type='text' onClick={()=>handleEdit(record)}>编辑</Button>
            <Button type='text' danger onClick={()=>handleDelete(record.userId)}>
              删除
            </Button>
          </>
        )
      }
    }
  ]

  const rowSelection = {
    selectedRowKeys: ids,
    onChange: (selectedRowKeys: React.Key[]) => {
      setIds(selectedRowKeys as number[])
    },
  }
  const handleSearch = () => {
    const params = {
      pageNum: 1,
      pageSize: 10
    }
    getUserList(params)
  }
  const handleReset = () => {
    form.resetFields()
  }
  const handleAdd = ()=>{
    userRef.current?.open('create')
  }
  const handleEdit = (record:User.UserItem)=>{
    userRef.current?.open('edit',record)
  }
  const handleDelete = (userId:number)=>{
    modal.confirm({
      title: '温馨提示',
      content: '确认删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>{
        queryDelete([userId])
      }
    });
  }
  const handleBatchDelete = ()=>{
    if(!ids.length) {
      message.error('请先选择用户!')
      return 
    }
    modal.confirm({
      title: '温馨提示',
      content: '确认删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>{
        queryDelete(ids)
      }
    });
  }
  const queryDelete = async (ids: number[])=>{
    try {
       await api.queryDelete({
       userIds: ids
       })
       getUserList({
        pageNum: pagination.current
      })
      setIds([])
    }catch {

    }
  }
  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])
  return (
    
    <div className='user-list'>
      {contextHolder}
      <CreateUser mRef={userRef} update={()=>getUserList({
        pageNum:1
      })}/>
      <div className='search-form'>
        <Form layout='inline' form={form}>
          <Form.Item label='用户ID' name='userId'>
            <Input placeholder='请输入用户ID' />
          </Form.Item>
          <Form.Item label='用户名称' name='userName'>
            <Input placeholder='请输入用户名称' />
          </Form.Item>
          <Form.Item label='状态' name='state'>
            <Select
              defaultValue='0'
              style={{ width: 120 }}
              options={[
                { value: '0', label: '所有' },
                { value: '1', label: '在职' },
                { value: '2', label: '试用期' },
                { value: '3', label: '离职' }
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button className='ml15' onClick={handleReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='main-container'>
        <div className='header-waraper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' className='btn' onClick={handleAdd}>
              新增
            </Button>
            <Button type='primary' danger className='btn' onClick={handleBatchDelete}>
              批量删除
            </Button>
          </div>
        </div>
        <div className='table-waraper'>
          <Table
            rowKey='userId'
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            columns={columns}
            dataSource={data}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: total => {
                return `总共${total}条`
              },
              onChange: function (page, pageSize) {
                setPagination({
                  current: page,
                  pageSize
                })
              },
              onShowSizeChange: function (current, size) {
                setPagination({
                  current,
                  pageSize: size
                })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
