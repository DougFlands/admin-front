export default function resData(code: number = -1, msg: string = 'Faild', data: any = {}) {
  return {
    Code: code,
    Msg: msg,
    Data: data,
  }
}