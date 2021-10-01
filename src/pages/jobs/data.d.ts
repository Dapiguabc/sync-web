export type JobListItem = {
  name: string,
  canisterId: string,
  type: string,
  db: string,
  cron: string,
  desc: string,
  status?: JobStatus
};

export type JobListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type JobListData = {
  list: JobListItem[];
  pagination: Partial<JobListPagination>;
};
