import {expect, test} from "@playwright/test"

export class Action {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(sUrl) {
        await test.step('navigate to site', async () => {
            await this.page.goto(sUrl,{waitUntil:"commit"})
        })
    }

    async clickOnElement(element){
        try{
            await this.verifyElementVisible(element)
            await element.click()
        }catch (err){
            if(!this.isPromise(element))
                console.error(`Failed to click on element ${element.toString()}`)
        }
    }

    async setElement(element, text){
        try{
            await element.fill(text)
            await this.verifyElementHaveValue(element,text)
        }catch (err){
            console.error(
                `Failed to set text on element ${element.toString()}`
            )
        }
    }

    async verifyElementHaveValue(element, text){
        try{
            await expect(element).toHaveValue(text)
        }catch (err){
            console.error(
                `Failed to verify that element have value ${element.toString()}`
            )
        }
    }

    async verifyElementVisible(element){
        await expect(element).toBeVisible()
    }

    async verifyElementTextEquals(element, expectedText){
        await expect(element).toHaveText(expectedText)
    }

     isPromise(p) {
        return p && Object.prototype.toString.call(p) === "[object Promise]";
    }
}

