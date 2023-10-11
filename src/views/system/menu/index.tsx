import { Form, Input, Button,Table,Modal,Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useEffect, useState,useRef} from "react";
import CreateModal from './CreateModal';
import { Menu } from "@/types/api";
import { IAction } from '@/types/modal';
import {formatDate} from "@/utils"
import api from "@/api";
export default function MenuList(){
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const MenuRef = useRef<{
    open:(type:IAction,data?:Menu.MenuItem)=>void,
    data?:Menu.MenuItem[]
  }>();
  const columns: ColumnsType<any> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType:number) {
        return  {
          1:'菜单',
          2:'按钮',
          3:'页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
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
  const [data,setData] = useState<Menu.MenuItem[]>([])
  const getMenuList = async (params?:Menu.Params)=>{
   const data = await api.queryMenuList(params)
   setData(data)
  }
  useEffect(()=>{
    getMenuList()
  },[])
  //新增
  const handleAdd = (record?:Menu.MenuItem)=>{
    MenuRef.current?.open('create',record)
  }
  //编辑
  const handleEdit = (record:Menu.MenuItem)=>{
    console.log(record,'record')
    MenuRef.current?.open('edit',record)
  }
  //删除
  const handleDelete = (record:Menu.MenuItem)=>{
    let text = "";
    if(record.menuType === 1) text = '菜单'
    if(record.menuType === 2) text = '按钮'
    if(record.menuType === 3) text = '页面'
    modal.confirm({
        title: '温馨提示',
        content: `确认删除该${text}吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: ()=>{
          queryDelete(record._id)
        }
      });
  }
  const queryDelete = async (_id:string)=>{
    await api.queryDelete(_id)
    getMenuList();
  }
  return (
    <div className='Menu-list'>
        {contextHolder}
        <CreateModal mRef={MenuRef} update={getMenuList} data={data}/>
      <div className='search-form'>
        <Form layout='inline' form={form}>
          <Form.Item label='菜单名称' name='menuName'>
            <Input type='text' placeholder='菜单名称' />
          </Form.Item>
          <Form.Item label='菜单状态' name='menuState'>
            <Select style={{width: 110}}>
              <Select.Option value={1}>正常</Select.Option>
              <Select.Option value={0}>停用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={()=> getMenuList(form.getFieldsValue()) }>搜索</Button>
            <Button className='ml20' onClick={()=>form.resetFields()}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className='main-container'>
        <div className='header-waraper'>
          <div>菜单列表</div>
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
