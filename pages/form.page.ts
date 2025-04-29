import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test_data/data';

export class FormPage {
    page: Page;
    add_button: Locator;
    high_school_information_heading: Locator;
    short_input: Locator;
    textarea_input: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.high_school_information_heading = this.page.getByText('High School Information');
        this.short_input = this.page.getByPlaceholder('Short Input');
        this.textarea_input = this.page.getByPlaceholder('Long Input');
    }

    async fill_lets_get_to_know_page(){
        await this.page.getByPlaceholder('Enter your street address').fill(testData.street);
        await this.page.getByPlaceholder('Enter your state').fill(testData.state);
        await this.page.getByRole('option', { name: testData.state }).click();
        await this.page.getByPlaceholder('Enter your city').fill(testData.city);
        await this.page.getByPlaceholder('Enter your zip code').fill(testData.zipcode);
        await this.page.getByPlaceholder('Enter your country').fill(testData.country);
        await this.page.getByRole('option', { name: testData.country }).click();
        await this.go_to_next_page();
        await this.page.getByRole('heading', { name: 'Extracurricular Activities' }).waitFor( { state: 'visible', timeout: 10000 });
        await expect(this.page.getByRole('heading', { name: 'Extracurricular Activities' })).toBeVisible();
    }

    async add_extra_curricular_activities(activity_names: string[]){
        for(let activity_name of activity_names) {
            const element: Locator = this.page.getByRole('button', { name: 'Delete entry' });
            const initial_count: number = await element.count();
            await this.page.getByRole('button', { name: 'Add Entry', exact: true }).click();
            await this.page.getByRole('heading', { level: 2, name: 'Add Entry' }).waitFor({ timeout: 30000 });
            await this.short_input.waitFor();
            await this.short_input.fill(activity_name);
            await this.page.getByPlaceholder('123').fill(testData.years);
            await this.textarea_input.first().fill(testData.roles);
            await this.textarea_input.last().fill(testData.description);
            await this.page.getByRole('button', { name: 'Add', exact: true }).click();
            await this.page.getByText(activity_name).waitFor();
            await expect(this.page.getByText(activity_name)).toBeVisible();
            expect(await element.count()).toEqual(initial_count + 1);
            expect(await element.count()).toBeGreaterThan(initial_count);
        }
        await this.go_to_next_page();
        await this.go_to_next_page();
    }

    async go_to_next_page(){
        await this.page.getByRole('button', { name: 'Next Page' }).click();
    }

    async validate_limit_activity_check(){
        await expect(this.page.getByText('Please add at least 2 entries')).toBeVisible();
    }

    async fill_high_school_information(){
        await this.high_school_information_heading.waitFor({ timeout: 60000 });
        await expect(this.high_school_information_heading).toBeVisible( { timeout: 30000 });
        await this.page.getByPlaceholder('Please enter the name of your current High School').fill(testData.high_school_name);
        await this.page.getByPlaceholder('Enter high school street address').fill(testData.street);
        await this.page.getByPlaceholder('Enter high school city').fill(testData.city);
        await this.page.getByPlaceholder('Enter high school state').fill(testData.state);
        await this.page.getByRole('option', { name: testData.state }).click();
        await this.page.getByPlaceholder('e.g. 55413').fill(testData.zipcode);
        await this.page.getByPlaceholder('Enter your current GPA').fill(testData.gpa);
        await this.page.getByPlaceholder('Enter a date').fill(testData.year_of_education);
        // await this.page.getByRole('button', { name: 'Upload File' }).setInputFiles('test_data/My School Transcript.pdf');
        await this.page.locator('input[type=file]').setInputFiles('test_data/My School Transcript.pdf');
        await expect(this.page.getByText('My School Transcript.pdf').first()).toBeVisible();
        await this.go_to_next_page();
        await this.go_to_next_page();
    }

    async validate_essay_options(options: string[]){
        for(let option of options) {
            await expect(this.page.getByText('Please select the essay types')).toBeVisible( { timeout: 60000 });
            await this.page.getByRole('checkbox', { name: option }).check();
            if(option === "Other") {
                await expect(this.page.getByText(`Provide an essay about any topic`)).toBeVisible();
            } else {
                await expect(this.page.getByText(`Essay about ${option}`)).toBeVisible();
            }
            await this.page.getByRole('checkbox', { name: option }).uncheck();
            await expect(this.page.getByText(`Essay about ${option}`)).not.toBeVisible();
        }
    }

    async add_essay_options(options: string[]){
        for(let option of options) {
            await this.page.getByRole('checkbox', { name: option }).check();
            await expect(this.page.getByText(`Essay about ${option}`)).toBeVisible();
            await this.page.getByRole('textbox', { name: `Essay about ${option}` }).fill(`This is the description of ${option}`);
            await this.page.getByRole('button', { name: 'Save' }).click();
            await expect(this.page.getByText('Application saved')).toBeVisible();
        }
        await this.go_to_next_page();
        await this.go_to_next_page();
    }
}
