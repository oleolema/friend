import {DownOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {SorterResult} from 'antd/es/table/interface';
import TableForm from './components/TableForm';
import {FriendData, TableListItem, TableListParams} from './data.d';
import {add, deleteFriendByIds, query, update} from '@/services/friendTableList';


/**
 * 添加节点
 * @param friendData
 * @param actionRef
 */
const handleAdd = async (
  friendData: FriendData,
  actionRef: React.MutableRefObject<ActionType | undefined>,
) => {
  const hide = message.loading('正在添加');
  try {
    const res = await add(friendData);
    hide();
    if (res?.code !== 0) {
      message.error(res.msg);
      return false;
    }
    message.success('添加成功');
    actionRef.current?.reload();
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param friendData
 * @param actionRef
 */
const handleUpdate = async (
  friendData: FriendData,
  actionRef: React.MutableRefObject<ActionType | undefined>,
) => {
  const hide = message.loading('正在修改');
  try {
    const res = await update(friendData);
    hide();
    if (res?.code !== 0) {
      message.error(res.msg);
      return false;
    }
    message.success('修改成功');
    actionRef.current?.reload();
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const handleDelete = async (
  id: string[],
  actionRef: React.MutableRefObject<ActionType | undefined>,
) => {
  const hide = message.loading('正在删除');
  try {
    const res = await deleteFriendByIds(id);
    hide();
    if (res?.code !== 0) {
      message.error(res.msg);
      return false;
    }
    message.success('删除成功');
    actionRef.current?.reload();
    return true;
  } catch (error) {
    hide();
    message.error('删除失败请重试！');
    return false;
  }
};

function showDeleteConfirm({
                             onOk,
                             title = '',
                             content = '',
                           }: {
  onOk: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
}) {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined/>,
    content,
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      onOk();
    },
    onCancel() {
    },
  });
}

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [dataSource, setDataSource] = useState<FriendData[]>([]);
  const [queryData, setQueryData] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInForm: true


    },
    {
      title: '姓名',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '姓名为必填项',
        },
      ],
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        '0': '男',
        '1': '女',
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      rules: [
        {
          message: '请输入有效电话',
          pattern: /^\d{3,}$/,
        },
      ],
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
      rules: [
        {
          message: '请输入有效QQ',
          pattern: /^\d{5,}$/,
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: any) => (
        <>
          <Button
            size="small"
            type="dashed"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </Button>
          <Divider type="vertical"/>
          <Button
            size="small"
            type="dashed"
            onClick={() => {
              showDeleteConfirm({
                title: (
                  <>
                    确定删除好友 <a>{record.name}</a> 吗?
                  </>
                ),
                content: <>id: {record.id}</>,
                onOk: () => {
                  handleDelete([record.id], actionRef);
                },
              });
            }}
            danger
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="我的好友"
        actionRef={actionRef}
        // scroll={{y: 'calc(100vh - 174px)'}}
        rowKey="id"
        onLoad={(d: any[]) => {
          setDataSource(d);
        }}
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        search={false}
        params={{
          sorter,
        }}
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 添加好友
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleDelete(
                        (selectedRows as any).map((item: FriendData) => item.id),
                        actionRef,
                      );
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined/>
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertOptionRender={false}
        tableAlertRender={(selectedRowKeys, selectedRows) =>
          selectedRowKeys.length !== 0 ? (
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 个好友&nbsp;&nbsp;
              <span>
                当前页 <a style={{fontWeight: 600}}>{dataSource.length}</a> 个好友
              </span>
            </div>
          ) : (
            <>
              {/*当前页 <a style={{fontWeight: 600}}>{dataSource.length}</a> 个好友*/}
              你有 <a style={{fontWeight: 600}}>{queryData.total}</a> 个好友
            </>
          )
        }
        request={(params) => requestQuery(params, setQueryData)}
        columns={columns}
        rowSelection={{}}

      />
      <TableForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={async (params) => {
          const success = await handleAdd(params, actionRef);
          if (success) {
            handleModalVisible(false);
          }
        }}
        title="添加好友"
        submitText="添加"
        columns={columns}
      />
      <TableForm
        onSubmit={async (params, values) => {
          const success = await handleUpdate({id: values.id, ...params}, actionRef);
          if (success) {
            handleUpdateModalVisible(false);
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        title="修改好友"
        submitText="修改"
        modalVisible={updateModalVisible}
        values={stepFormValues}
        columns={columns}
      />
    </>
  );
};

async function requestQuery(params?: TableListParams, setQueryData?: any): Promise<{ data: any }> {
  return query(params).then((res) => {
    if (res?.code !== 0) {
      message.error(res.msg);
      return {
        data: [],
      }
    }
    if (setQueryData) {
      setQueryData(res.data);
    }
    return res.data;
  });
}

export default TableList;
