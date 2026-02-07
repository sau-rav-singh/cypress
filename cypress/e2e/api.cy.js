describe('API Mocking Test Suite', () =>
{
    it('Verify Book Retrieval with Mocked Response', () =>
    {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"
                    }
                ]
            }
        ).as('bookRetrievals');

        cy.get("button[class='btn btn-primary']").click();

        cy.wait('@bookRetrievals').then(({ request, response }) =>
        {
            // This shows up in the Browser Inspector (F12) Console
            console.log('Intercepted Request:', request);

            // This shows up in the Cypress UI Runner
            cy.log(`Fetched ${response.body.length} books`);

            cy.get('tr').should('have.length', response.body.length + 1);
        });

        cy.get('p').should('have.text', 'Oops only 1 Book available');
    });

    it("Get Book Details", () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?ID=bcd2926',
        }).then((response) =>
        {
            // 1. Validate Status Code
            expect(response.status).to.eq(200);

            // 2. Validate the body is an array and has length 1
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(1);
            cy.log("Response Body is " + JSON.stringify(response.body));
            // 3. Deep validation of the first object in the array
            const book = response.body[0];
            expect(book).to.have.property('book_name', 'Learn Appium Automation with Java');
            expect(book).to.have.property('isbn', 'bcd');
            // To handle that sneaky trailing space in the API response:
            expect(book.aisle.trim()).to.eq('2926');
            expect(book).to.have.property('author', 'John foer');

            // 4. Validate headers (optional but recommended)
            expect(response.headers).to.have.property('content-type', 'application/json;charset=UTF-8');
        });
    });
});