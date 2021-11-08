import Request from './request'

export default class LoginService {
    static async Signin(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: '/AppUsers/loginUser',
                data
              }).then((result = {})=>{
                const { statusCode, data } = result
                if(statusCode === 200) {
                    return resolve(data)
                }else{
                    return resolve({ })
                }
              })
        })
    }
    static async getDetailByUrl(stationsUrl) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: '/Stations/getDetailByUrl',
                data: {
                    stationsUrl: stationsUrl
                }
              }).then((result = {})=>{
                const { statusCode, data } = result
                if(statusCode === 200) {
                    return resolve(data)
                }else{
                    return resolve({ })
                }
              })
        })
    }
}