import type { Request, Response } from 'express';
import type { JobListItem } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: JobListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    tableListDataSource.push({
      name: 'job1',
      canisterId: "xxxx-xxxx-xxxx",
      type: "token",
      db: "a.db",
      cron: "0 0 0 0 *",
      status: 1,
      desc: "to sync data from xxxx"
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

const tableListDataSource = genList(1, 100);

function getJob(req: Request, res: Response){
  return res.json({
    code: 200,
    success: true,
    msg: "xx",
    data: tableListDataSource
  });
}

function addJob(req: Request, res: Response){
  return res.status(200);
}

function updateJob(req: Request, res: Response){
  return res.status(200);
}

function removeJob(req: Request, res: Response){
  return res.status(200);
}

export default {
  'GET /api/job': getJob,
  'POST /api/job/add': addJob,
  'POST /api/job/update': updateJob,
  'POST /api/rule/remove': removeJob,
};
