import Request from "./request"

export default class uploadService {
  static async uploadImage(data = {}) {
    return new Promise(resolve=>{
      Request.send({
        method: 'POST',
        path: '/Upload/uploadMediaFile',
        data
      }).then((result = {})=>{
        const { statusCode, data } = result
        if(statusCode === 200) {
          return resolve({ issSuccess: true, data })
        }else{
          return resolve({ issSuccess: false })
        }
      })
    })
  }

  static async importDataCustomers(data = {}) {
    return new Promise(resolve=>{
      Request.send({
        method: 'POST',
        path: '/CustomerRecord/importExcel',
        data
      }).then((result = {})=>{
        const { statusCode } = result
        if(statusCode === 200) {
          return resolve({ issSuccess: true })
        }else{
          return resolve({ issSuccess: false })
        }
      })
    })
  }
}