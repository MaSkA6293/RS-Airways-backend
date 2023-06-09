export type loggerInfoProps = {
  date: string;
  duration?: string;
  url: string;
  method: string;
  queryParams: string;
  body: string;
  statusCode: number;
  errorMessage?: string;
  resBody: string;
};
