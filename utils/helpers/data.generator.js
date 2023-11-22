import {faker, fakerEN} from "@faker-js/faker";
let fname = faker.person.firstName()
let lname = faker.person.lastName()

const USER = {
    FIRSTNAME: fname,
    LASTNAME: lname,
    EMAIL: `${fname}.${lname}@mail.com`,
    USERNAME:`${fname}.${lname}`,
    MOBILE: faker.string.numeric("083#######"),
    PWD : 'password1'

};
export class dataGeneratorHelper {

    getEmail(){
        return USER.EMAIL
    }

    getPhoneNumber(){
        return USER.MOBILE
    }

    getUsername(){
        return USER.USERNAME
    }

    getFirstName(){
        return USER.FIRSTNAME
    }

    getLastName(){
        return USER.LASTNAME
    }

    getPassword(){
        return USER.PWD
    }
}