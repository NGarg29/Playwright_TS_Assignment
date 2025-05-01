import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test_data/data';

export class ReviewPage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async validate_pages_answers(email_id: string){
        const pages: string[] = ['Lets get to know you!', 'Extracurricular Activities', 'High School Information', 'Essay'];
        for(let page of pages) {
            await expect(this.page.getByText(page).first()).toBeVisible();
            await this.page.getByRole('button', { name: page }).click();
            switch(page) {
                case 'Lets get to know you!':
                    expect(await this.getFieldValueLocator('First Name').textContent()).toEqual(testData.first_name);
                    expect(await this.getFieldValueLocator('Last Name').textContent()).toEqual(testData.last_name);
                    expect(await this.getFieldTextLocator('Email Address').textContent()).toEqual(email_id);
                    expect(await this.getFieldValueLocator('Street Address').textContent()).toEqual(testData.street);
                    expect(await this.getFieldTextLocator('State (Full)').textContent()).toEqual(testData.state);
                    expect(await this.getFieldValueLocator('City').textContent()).toEqual(testData.city);
                    expect(await this.getFieldValueLocator('Zip Code').textContent()).toEqual(testData.zipcode);
                    expect(await this.getFieldTextLocator('Country').textContent()).toEqual(testData.country);
                    break;
 
                case 'Extracurricular Activities':
                    await this.validate_extracurricular_activies([testData.activity_1, testData.activity_2, testData.activity_3, testData.activity_4]);
                    break;
 
                case 'High School Information':
                    expect(await this.getFieldValueLocator('High School Name').textContent()).toEqual(testData.high_school_name);
                    expect(await this.getFieldValueLocator('High School Street Address').textContent()).toEqual(testData.street);
                    expect(await this.getFieldValueLocator('High School City').textContent()).toEqual(testData.city);
                    expect(await this.getFieldTextLocator('High School State (Full)').textContent()).toEqual(testData.state);
                    expect(await this.getFieldTextLocator('High School Zip Code').textContent()).toEqual(testData.zipcode);
                    expect(await this.getFieldTextLocator('GPA').textContent()).toEqual(testData.gpa);
                    expect(await this.getFieldTextLocator('Year of High School Graduation').textContent()).toContain(testData.year_of_education);
                    await expect(this.page.getByText('My School Transcript.pdf').first()).toBeVisible();
                    break;
               
                case 'Essay':
                    await this.validate_essay_in_review_Page(testData.essay_options);
                    break;
            }
        }
        console.log('Review page is validated successfully');
    }

    async validate_extracurricular_activies(options: string[]){
        for (const [index, option] of options.entries()) {
            expect(await this.page.locator(`[title = "Entry ${index + 1 }"] span.mantine-Accordion-label span`).textContent()).toEqual(option);
        }
    }

    async validate_essay_in_review_Page(options: string[]){
        for(let option of options) {
            expect(await this.page.locator('//p[contains(text(),"essay types")]//following-sibling::p').textContent()).toContain(option);
            expect(await this.page.locator(`//p[contains(text(),"Essay about ${option}")]//following-sibling::p/span`).textContent()).toEqual(`This is the description of ${option}`);
        }
    }

    async validate_submit_application(){
        const url = this.page.url();
        console.log(url);
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.getByText('Submitting Application...').waitFor({ state: 'hidden'});
        console.log('Application form got submitted');
        await this.page.goto(url);
        await expect(this.page.getByText('Edit').first()).not.toBeVisible();
    }
   
    getFieldValueLocator(fieldName: string): Locator {
        return this.page.locator(`//p[text()="${fieldName}"]//following-sibling::p/span`);
    }
   
    getFieldTextLocator(fieldName: string): Locator {
        return this.page.locator(`//p[text()="${fieldName}"]//following-sibling::p`);
    }
}
