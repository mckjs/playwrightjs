import URLs from "./enums/urls.enums";
import {Action} from "./helpers/action";
import {apiMethodHelper} from "./helpers/axios.api";
import {dataGeneratorHelper} from "./helpers/data.generator";
import {homePage} from "../pages/home.page";


let sUrls, action, api, data
let pageHome

async function initWeb(page){
    sUrls = URLs
    action = new Action(page)
    pageHome = new homePage(page)
    api = new apiMethodHelper()
    data = new dataGeneratorHelper()
    return {
        sUrls,
        api,
        data,
        action,
        pageHome
    }
}

module.exports={initWeb}