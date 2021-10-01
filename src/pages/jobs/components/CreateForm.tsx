import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
} from '@ant-design/pro-form';
import type { JobListItem } from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<JobListItem>;

export type CreateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void | boolean>;
  createModalVisible: boolean;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="Config Job"
            visible={props.createModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        title="Basic Info"
      >
        <ProFormText
          name="name"
          label="Job Name"
          width="md"
          rules={[
            {
              required: true,
              message: 'Please enter job name',
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label="Job Description"
          placeholder="Please enter at least five characters"
          rules={[
            {
              required: true,
              message: 'Please enter at least five characters',
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          type: 'token',
          status: 1,
        }}
        title="Config Job Attribute"
      >
        <ProFormSelect
          name="type"
          width="md"
          label="Type"
          valueEnum={{
            'token': 'token',
            'token-registry': 'token-registry',
            'dswap-storage': 'dswap-storage',
          }}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="canisterId"
          label="CanisterId"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="cron"
          label="Cron"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          name="db"
          label="DB"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          label="Status"
          options={[
            {
              value: 0,
              label: 'stop',
            },
            {
              value: 1,
              label: 'running',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          run: false,
        }}
        title="Run Or Not"
      >
        <ProFormRadio.Group
          name="run"
          label="Do you want to run it immediately?"
          options={[
            {
              value: true,
              label: 'Yes',
            },
            {
              value: false,
              label: 'No',
            },
          ]}
          rules={[
            {
              required: true,
              message: "This does not abide by cron and spawns workers immediately"
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateForm;
