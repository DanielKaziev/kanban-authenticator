export interface IResponseMessage {
  access: boolean;
  code: number;
  message: string;
}

export interface IRoles {
  name: string;
  permissions: Array<string>;
}
