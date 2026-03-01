class DatePickerPage {

    selectCommonDatePickerDateFromToday(daysFromToday) {
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click();
                this.selectDateFromCalendar(daysFromToday);
                cy.wrap(input).should('have.value', this.getFormattedDate(daysFromToday));
            });
    }

    selectDateRangeFromToday(startDay, endDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click();
            this.selectDateFromCalendar(startDay);
            this.selectDateFromCalendar(endDay);
            const expectedValue = `${this.getFormattedDate(startDay)} - ${this.getFormattedDate(endDay)}`;
            cy.log(`Expected date range: ${expectedValue}`);
            cy.wrap(input).should('have.value', expectedValue);
        });
    }

    selectDateFromCalendar(daysFromToday) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromToday);

        cy.contains('.day-cell', targetDate.getDate()).click();
    }

    getFormattedDate(daysFromToday) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

export const datePickerPage = new DatePickerPage();