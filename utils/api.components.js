import URLs from "./enums/urls.enums";
import {apiMethodHelper} from "./helpers/axios.api";
import {dataGeneratorHelper} from "./helpers/data.generator";


let sUrls,api, data

async function initApi(){
    sUrls = URLs
    api = new apiMethodHelper()
    data = new dataGeneratorHelper()
    return {
        sUrls,
        api,
        data
    }
}

module.exports={initApi}