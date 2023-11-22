# Test Automation Execution

### Install and setup
#### This project you need to make sure you have the following tools install

* [nodejs](https://nodejs.org/en/download/)
```sh
$ node -v
v21.0.0
```

### Steps to take to execute tests
1. clone repo using git clone
```sh
$ git clone https://github.com/mckjs/playwrightjs.git
```

2. navigate to project path
```sh
$ cd absa
```

3. run npm install
```sh
$ npm install
```

4. Run API Tests
```sh
$ npm run test:api
```

5. Terminal output will look as follows

<sub>

> >absa@1.0.0 test:api \
> >cross-env ENV=live npx playwright test --project live-api-dog \
>> Running 9 tests using 4 workers \
>> 9 passed (2.3s) \
>> To open last HTML report run: \
>> npx playwright show-report \

</sub>

6. Run Report, a browser tab will open with tests report or go to path playwright-report/index.html, 
    right click and open in browser.
```sh
$  npx playwright show-report
```

7. Run WEB Tests
```sh
$ npm run test:web
```
8. Repeat step 5 and 6 to see test results