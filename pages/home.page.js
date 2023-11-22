import {init} from "../utils/web.components"
import {Action} from "../utils/helpers/action";
import {dataGeneratorHelper} from "../utils/helpers/data.generator";
let action, data
export class homePage {

    constructor(page) {
        this.page = page
        action = new Action(this.page)
        data = new dataGeneratorHelper()
        // this.tableRows = this.page.locator('tr[ng-repeat="dataRow in displayedCollection"]');
        this.tableUsers = this.page.locator('xpath=//tbody')
        this.rowsUsers = this.page.locator("tr.smart-table-data-row.ng-scope")
        this.btnAddUser = this.page.getByRole('button', { name: 'Add User' })
        this.inputFirstName = this.page.locator('input[name="FirstName"]')
        this.inputLastName = this.page.locator('input[name="LastName"]')
        this.inputUsername = this.page.locator('input[name="UserName"]')
        this.inputPassword = this.page.locator('input[name="Password"]')
        this.rdbCompnayAAA = this.page.locator('form[name="smartTableValidForm"]').getByText('Company AAA')
        this.rdbCompnayBBB = this.page.locator('form[name="smartTableValidForm"]').getByText('Company BBB')
        this.dropboxRole = this.page.getByRole('combobox')
        this.inputEmail = this.page.locator('input[name="Email"]')
        this.errEmail = this.page.getByText('Not valid email!')
        this.inputCellPhone = this.page.locator('input[name="Mobilephone"]')
        this.btnSave = this.page.locator('css=.btn-success')
        this.txtModalHeading = this.page.locator('h3.ng-binding');
        this.inputSearch = this.page.locator('input[placeholder=\'Search\']')
        this.firstRowCellEmail = this.page.locator('.smart-table-data-cell').nth(6)
    }

    async addUser(customer, role){
        await action.clickOnElement(this.btnAddUser)
        await action.setElement(this.inputFirstName,data.getFirstName())
        await action.setElement(this.inputLastName,data.getLastName())
        await action.setElement(this.inputUsername,data.getUsername())
        await action.setElement(this.inputPassword,data.getPassword())
        await this.setCustomer(customer)
        await this.setRole(role)
        await action.setElement(this.inputEmail,data.getEmail())
        await action.setElement(this.inputCellPhone,data.getPhoneNumber())
        await action.clickOnElement(this.btnSave)
        await this.page.waitForLoadState();
    }

    async setCustomer(value){
        let element
        element = value.toLowerCase().includes('a') ? this.rdbCompnayAAA : this.rdbCompnayBBB;
        await action.clickOnElement(element)
    }

    async setRole(value){
        let element
        await action.clickOnElement(this.dropboxRole)
        switch (value.toLowerCase()) {
            case "sales team":
                element = this.dropboxRole.selectOption('0')
                break
            case "admin":
                element = this.dropboxRole.selectOption('2')
                break;
            case "customer":
                element = this.dropboxRole.selectOption('1')
                break;
            default:
                throw new Error("Unknown value " + value)
        }
        await action.clickOnElement(element)
    }

}