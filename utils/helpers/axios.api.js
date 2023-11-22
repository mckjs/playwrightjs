import axios from "axios";
export class apiMethodHelper{
    constructor() {
        this.instance = axios.create({
            headers:{'Content-Type':'application/json'},
        })

        this.instance.interceptors.request.use((config)=>{
            config.ts = Date.now()
            return config
        })

        this.instance.interceptors.response.use(async (response)=>{
            response.latency = `${Number(Date.now()-response.config.ts).toFixed()}ms`;
            return response
        })
    }

    GET = async (url)=>{
        let response
        try{
            response =  await this.instance({
                method:'get',
                url: url
            })
        }catch (err){
            response = err.response
        }
        return response
    }
    POST = async (url, headers, data)=>{
        let response
        try{
            response = await this.instance({
                method:'post',
                url: url,
                data,
                headers
            })
        }catch (err){
            response = err.response
        }
        return response;
    }

}