import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProColumns, ActionType, TableDropdown } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { getJob, addJob, updateJob, startJob, removeJob, runJob, stopJob } from './service';
import type { JobListItem, JobListPagination } from './data';
import CreateForm from './components/CreateForm';
/**
 * Add job
 *
 * @param fields
 */

const handleAdd = async (fields: JobListItem) => {
  const hide = message.loading("Creating...");

  try {
    await addJob({ ...fields });
    hide();
    message.success('Created Successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Created Failed！');
    return false;
  }
};
/**
 * Update job
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: JobListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateJob({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * Start job
 *
 * @param selectedRows
 */

 const handleStart = async (selectedRows: JobListItem) => {
  const hide = message.loading('Starting...');
  if (!selectedRows) return true;

  try {
    await startJob(selectedRows.name);
    hide();
    message.success('Started successfully and will be refreshed soon');
    return true;
  } catch (error) {
    hide();
    message.error('Started failed，please try again');
    return false;
  }
};

/**
 * Run job
 *
 * @param selectedRows
 */

 const handleRun = async (selectedRows: JobListItem) => {
  const hide = message.loading("Running...");
  if (!selectedRows) return true;

  try {
    await runJob(selectedRows.name);
    hide();
    message.success('Running successfully and will be refreshed soon');
    return true;
  } catch (error) {
    hide();
    message.error('Running failed，please try again');
    return false;
  }
};

/**
 * Stop job
 *
 * @param selectedRows
 */

 const handleStop = async (selectedRows: JobListItem) => {
  const hide = message.loading('Stoping...');
  if (!selectedRows) return true;

  try {
    await stopJob(selectedRows.name);
    hide();
    message.success('Stoped successfully and will be refreshed soon');
    return true;
  } catch (error) {
    hide();
    message.error('Stoped failed，please try again');
    return false;
  }
};


/**
 * Remove job
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: JobListItem) => {
  const hide = message.loading('Removing...');
  if (!selectedRows) return true;

  try {
    await removeJob(selectedRows.name);
    hide();
    message.success('Removed successfully and will be refreshed soon');
    return true;
  } catch (error) {
    hide();
    message.error('Removed failed，please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<JobListItem>();
  //const [selectedRowState, setSelectedRow] = useState<JobListItem>();
  /** 国际化配置 */

  const columns: ProColumns<JobListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      valueType: 'text',
      editable: false,
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      valueType: 'text',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      editable: false,
      valueEnum: {
        0: {
          text: 'Stop',
          status: 'Default',
        },
        1: {
          text: 'Running',
          status: 'Success',
        },
        2: {
          text: 'Processing',
          status: 'Processing',
        },
        3: {
          text: 'Error',
          status: 'Error',
        },
      },
    },
    {
      title: 'CanisterId',
      dataIndex: 'canisterId',
      valueType: 'text',
    },
    {
      title: 'Cron',
      dataIndex: 'cron',
      valueType: 'text',
    },
    {
      title: 'DB',
      dataIndex: 'db',
      valueType: 'text',
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (text, record, _, action) => [
        // <a
        //   key="editable"
        //   onClick={() => {
        //     action?.startEditable?.(record.name);
        //   }}
        // >
        //   Edit
        // </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={async (key)=> {
            let success = false;
            switch(key){
              case 'start':
                success = await handleStart(record);
                break;
              case 'stop':
                success = await handleStop(record);
                break;
              case 'run':
                success = await handleRun(record);
                break;
              case 'remove':
                success = await handleRemove(record);
                break;
            }
            if(success){
              action?.reload();
            }
          }}
          menus={[
            { key: 'start', name: 'Start'},
            { key: 'stop', name: 'Stop' },
            { key: 'run', name: 'Run' },
            { key: 'remove', name: 'Remove' },
          ]}
        />,

      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<JobListItem, JobListPagination>
        headerTitle="Jobs Manage"
        actionRef={actionRef}
        rowKey="name"
        search={{
          filterType: 'light',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> Add
          </Button>,
        ]}
        request={getJob}
        columns={columns}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value as JobListItem);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true;
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        createModalVisible={createModalVisible}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<JobListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<JobListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
