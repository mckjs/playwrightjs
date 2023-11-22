const { test, expect } = require('@playwright/test');
const {initApi} = require("../../utils/api.components");
let api, sUrls
// let parameter = [['retriever',["chesapeake","curly","flatcoated","golden"]],['hound', ["afghan","basset","blood","english","ibizan","walker"]]];
// let parameter = [['retriever',["chesapeake","curly","flatcoated","golden"]],['hound', ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"]]];
test.beforeEach(async () => {
    ({api, sUrls}= await initApi())
});

/**
 * o Perform an API request to produce a list of all dog breeds. (Diagram 1)
 * o Using code, verify “retriever” breed is within the list. (Diagram 2)
 * o Perform an API request to produce a list of sub-breeds for “retriever”. (Diagram 3)
 * o Perform an API request to produce a random image / link for the sub-breed “golden” (Diagram 4)
 * **/
const breeds = [
    {breeder:'retriever',subBreeder:['chesapeake','curly','flatcoated','golden']},
    {breeder:'hound',subBreeder: ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker']},
    {breeder:'bulldog',subBreeder: ['boston', 'english', 'french']}
]

for (const breed of breeds) {
    test(`produce a list of all dog “${breed.breeder}”`, async () => {
        await test.step(`verify ${breed.breeder} breed is within the list`, async () => {
            let url = sUrls.API + '/api/breeds/list/all'
            let dog = breed.breeder
            const response = await api.GET(url)
             expect(response.status).toBe(200)
            let isBreedPresent = Object.keys(response.data.message).some(breed => breed.includes(dog));
            await expect(isBreedPresent).toBe(true)
        });
    });

    test(`produce a list of sub-breeds for “${breed.breeder}”`, async () => {
        let url = sUrls.API + `/api/breed/${breed.breeder}/list`
        const response = await api.GET(url)
        expect(response.status).toBe(200)
        expect(response.data.message).toEqual(breed.subBreeder);
    });

    test(`produce a random image / link for the sub-breed “${breed.breeder}”`, async () => {
        let url = sUrls.API + `/api/breed/${breed.breeder}/${breed.subBreeder[0]}/images/random`
        const response = await api.GET(url)
        expect(response.status).toBe(200)
        let expected = breed.breeder+ "-"+breed.subBreeder[0];
        await expect(response.data.message).toContain(`https://images.dog.ceo/breeds/${expected}`)
    });
}
