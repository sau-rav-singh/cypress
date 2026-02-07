describe('API Mocking and Interaction Test Suite', () =>
{

    it('Should display single book when API returns one book', () =>
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

        cy.wait('@bookRetrievals').then(({ response }) =>
        {
            cy.get('tr').should('have.length', response.body.length + 1);
        });

        cy.get('p').should('have.text', 'Oops only 1 Book available');
    });

    it('Should intercept and modify request URL', () =>
    {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) =>
            {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
                req.continue((res) =>
                {
                    // Optional: Add assertions on the response if needed
                })
            }
        ).as("modifiedRequest")

        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@modifiedRequest')
    })

    it("Should retrieve book details via GET API", () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?ID=bcd2926',
        }).then((response) =>
        {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').and.have.length(1);

            const book = response.body[0];
            expect(book).to.have.property('book_name', 'Learn Appium Automation with Java');
            expect(book).to.have.property('isbn', 'bcd');
            expect(book.aisle.trim()).to.eq('2926');
            expect(book).to.have.property('author', 'John foer');

            expect(response.headers).to.have.property('content-type', 'application/json;charset=UTF-8');
        });
    });

    it('Should create a new book via POST API', () =>
    {
        const randomIsbn = Math.random().toString(36).substring(2, 5);
        const randomAisle = Math.floor(1000 + Math.random() * 9000).toString();
        const expectedID = randomIsbn + randomAisle;

        cy.request({
            method: 'POST',
            url: 'https://rahulshettyacademy.com/Library/Addbook.php',
            body: {
                "name": "Learn Appium Automation with Java",
                "isbn": randomIsbn,
                "aisle": randomAisle,
                "author": "John foer"
            }
        }).then((response) =>
        {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Msg', 'successfully added');
            expect(response.body.ID).to.eq(expectedID);

            cy.log(`Created Book with ID: ${response.body.ID}`);
        });
    });
});