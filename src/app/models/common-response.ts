export class CommonResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor() {
      
  }
}