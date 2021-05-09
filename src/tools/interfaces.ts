export interface VacanycInterface {
    id: number;
    recruiter__username: string;
    title: string;
    views: number;
    salary:number;
    publish_date:string;
  }
export interface RouteParams {id: string, param2?: string}



export interface IRespond{
  "id":number;
  "title": string;
  "views":number;
  "publish_date": string;
  "respond__username": string;
  "respond__avatar": string;
  "respond__github": string;
  respond__salary_expectation:number;
  respond__telephone:string;
  skills:[]
}