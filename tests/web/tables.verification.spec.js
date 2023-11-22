const { test, expect } = require('@playwright/test');
const {initWeb} = require("../../utils/web.components");
let action, sUrls, data, pageHome
test.beforeEach(async ({ page }) => {
    ({action, sUrls, data, pageHome}= await initWeb(page))
    let redirectUrl = sUrls.WEB + '/angularjs-protractor/webtables'
    await action.navigateTo(redirectUrl)
});

/**
 * Navigate to - http://www.way2automation.com/angularjs-protractor/webtables/
 * o Validate that you are on the User List Table
 * o Click Add user
 * o Add users with the following details:
 * o Ensure that User Name (*) is unique on each run
 * o Ensure that your users are added to the list
 * **/
const users = [
    {customer: 'a', role: 'sales team'},
    {customer: 'b', role: 'admin'}
]
for (const user of users) {
    test(`testing with ${user.role}`, async () => {
       await test.step('Validate that you are NOT on the User List Table and Add User', async () => {
            await pageHome.tableUsers.isVisible()
            await expect(pageHome.rowsUsers).toHaveCount(7);
            // console.log('Row count:', await pageHome.rowsUsers.count());
        })
       await test.step('Add User', async () => {
           await pageHome.addUser(user.customer, user.role)
        });
        await test.step('Verify User was added', async () => {
            await action.setElement(pageHome.inputSearch,data.getEmail())
            await expect(pageHome.rowsUsers).toHaveCount(1);
            await action.verifyElementTextEquals(pageHome.firstRowCellEmail,data.getEmail())

        });
    });
}

