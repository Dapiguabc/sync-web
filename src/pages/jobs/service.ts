// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { JobListItem } from './data';
// @ts-ignore
const api = process.env.NODE_ENV === 'development'? '': API_ENV
/** Fetch jobs GET /api/rule */
export async function getJob(
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: JobListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(api + '/api/job', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** update  /api/job */
export async function updateJob(data: { [key: string]: any }) {
  return request<JobListItem>(api + '/api/job/update', {
    data,
    method: 'POST',
  });
}

/** add new job POST /api/job */
export async function addJob(data: { [key: string]: any }) {
  return request<JobListItem>(api + '/api/job/add', {
    data,
    method: 'POST',
  });
}

/** remove a job /api/job */
export async function removeJob(name: string) {
  return request<Record<string, any>>(api + `/api/job/remove/${name}`, {
    method: 'GET',
  });
}

/** start a job /api/job */
export async function startJob(name: string ) {
  return request<Record<string, any>>(api + `/api/job/start/${name}`, {
    method: 'GET',
  });
}


/** run a job /api/job */
export async function runJob(name: string ) {
  return request<Record<string, any>>(api + `/api/job/run/${name}`, {
    method: 'GET',
  });
}

/** stop a job /api/job */
export async function stopJob(name: string ) {
  return request<Record<string, any>>(api + `/api/job/stop/${name}`, {
    method: 'GET',
  });
}

