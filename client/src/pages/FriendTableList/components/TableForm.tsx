import React from 'react';
import {Modal} from 'antd';
import {TableListItem} from '@/pages/FriendTableList/data';
import ProTable, {ProColumns} from '@ant-design/pro-table';

export interface TableFormProps {
  modalVisible: boolean;
  onSubmit: (params: any, values: any) => void;
  onCancel: () => void;
  values?: any;
  columns: ProColumns<TableListItem>[];
  title?: string;
  submitText?: string | undefined;
}

const TableForm: React.FC<TableFormProps> = (props) => {
  const {
    modalVisible,
    onCancel,
    values = {},
    onSubmit,
    columns,
    title = '',
    submitText = '提交',
  } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<TableListItem, TableListItem>
        onSubmit={params => {
          onSubmit(params, values);
        }}
        rowKey="key"
        type="form"
        form={{initialValues: values}}
        columns={columns}
        rowSelection={{}}
        search={{submitText}}
      />
    </Modal>
  );
};

export default TableForm;
