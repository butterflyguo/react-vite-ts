import { Form, Input, Button, Space, Table } from 'antd'
import { useAntdTable } from 'ahooks'
import api from "@/api"
import { Role } from '@/types/api'
export default function RoleList() {
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
  const formData:Role.Params =  form.getFieldsValue()
  const getTableData = ({ current, pageSize }:{current:number,pageSize:number},formData: Role.Params): Promise<Result> => {
    return api.queryRoleList({ ...formData,pageNum:current, pageSize }).then(res=>{
      return {
        total: res.page.total,
        list: res.list
      }
    })
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })
  const handleAdd = () => {}
  return (
    <>
      <div className='role-list'>
        <div className='search-form'>
          <Form form={form} layout='inline'>
            <Form.Item label='角色名称' name='roleName'>
              <Input placeholder='请输入角色名称'></Input>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type='primary'>搜索</Button>
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
    </>
  )
}
