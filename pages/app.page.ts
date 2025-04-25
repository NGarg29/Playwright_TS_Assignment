import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test_data/data';
import { AppLocators } from '../locators/app.locators';
const id: string = "test_" + Date.now() + "@gmail.com";
const email_id: string = testData?.existing_email_id || id;

export class AppPages {
    page: Page;
    app_locators: AppLocators;

    constructor(page: Page){
		this.page = page;
        this.app_locators = new AppLocators(this.page);
	}

    async click_on_login_to_apply(){
        await this.app_locators.login_button.click();
    }

    async login(){
        if(testData.existing_email_id) {
            await this.app_locators.email_address.fill(email_id);
            await this.app_locators.next_button.click();
            await this.app_locators.enter_password.fill(testData.password);
            await this.app_locators.sign_in_button.click();
        } else {
            await this.register_new_user();
        }
        console.log(email_id);
    }

    async register_new_user(){
        await this.app_locators.email_address.fill(email_id);
        await this.app_locators.next_button.click();
        await expect(this.app_locators.create_account_heading).toBeVisible();
        await this.app_locators.first_name_input.fill(testData.first_name);
        await this.app_locators.last_name_input.fill(testData.last_name);
        await this.app_locators.phone_input.fill(testData.phone_no);
        await this.app_locators.password_input.fill(testData.password);
        await this.app_locators.i_confirm_13.check();
        await this.app_locators.submit_button.click();
        await expect(this.app_locators.get_to_know_heading).toBeVisible({ timeout: 30000 });
	}

    async fill_lets_get_to_know_page(){
        await this.app_locators.street_input.fill(testData.street);
        await this.app_locators.state_input.fill(testData.state);
        await this.page.locator(`//div[@value="${testData.state}"]`).click();
        await this.app_locators.city_input.fill(testData.city);
        await this.app_locators.zipcode_input.fill(testData.zipcode);
        await this.app_locators.country_input.fill(testData.country);
        await this.page.locator(`//div[@value="${testData.country}"]`).click();
        await this.go_to_next_page();
        await this.waitForLoading();
        await expect(this.app_locators.extra_curricular_activity_heading).toBeVisible();
    }

    async add_extra_curricular_activities(activity_names: string[]){
        for(let activity_name of activity_names) {
            const element: Locator = this.app_locators.extra_curricular_activities_element;
            const initial_count: number = await element.count();
            await this.app_locators.add_entry_button.click();
            await this.app_locators.add_entry_heading.waitFor( { timeout: 30000 });
            await this.app_locators.short_input.waitFor();
            await this.app_locators.short_input.fill(activity_name);
            await this.app_locators.number_input.fill(testData.years);
            await this.app_locators.textarea_input.first().fill(testData.roles);
            await this.app_locators.textarea_input.last().fill(testData.description);
            await this.app_locators.add_button.click();
            await this.page.getByText(activity_name).waitFor();
            await expect(this.page.getByText(activity_name)).toBeVisible();
            expect(await element.count()).toEqual(initial_count + 1);
            expect(await element.count()).toBeGreaterThan(initial_count);
        }
        await this.go_to_next_page();
    }

    async go_to_next_page(){
        await this.app_locators.next_page_button.click();
    }

    async validate_limit_activity_check(){
        await expect(this.app_locators.least_2_entry_check).toBeVisible();
    }

    async fill_high_school_information(){
        await this.app_locators.high_school_information_heading.waitFor({ timeout: 60000 });
        await expect(this.app_locators.high_school_information_heading).toBeVisible( { timeout: 30000 });
        await this.app_locators.high_school_name_input.fill(testData.high_school_name);
        await this.app_locators.high_school_street_input.fill(testData.street);
        await this.app_locators.high_school_city_input.fill(testData.city);
        await this.app_locators.high_school_state_input.fill(testData.state);
        await this.page.locator(`//div[@value="${testData.state}"]`).click();
        await this.app_locators.high_school_zipcode_input.fill(testData.zipcode);
        await this.app_locators.high_school_gpa_input.fill(testData.gpa);
        await this.app_locators.high_school_year_input.fill(testData.year_of_education);
        await this.page.locator('input[type=file]').setInputFiles('test_data/My School Transcript.pdf');
        await expect(this.page.getByText('My School Transcript.pdf').first()).toBeVisible();
        await this.go_to_next_page();
    }

    async validate_essay_options(options: string[]){
        for(let option of options) {
            await expect(this.page.locator('//*[text()="Essay"]')).toBeVisible( { timeout: 60000 });
            await this.app_locators.getEssayOptionInput(option).check();
            if(option === "Other") {
                await expect(this.page.getByText(`Provide an essay about any topic`)).toBeVisible();
            } else {
                await expect(this.app_locators.getEssayTextByOption(option)).toBeVisible();
            }
            await this.app_locators.getEssayOptionInput(option).uncheck();
            await expect(this.app_locators.getEssayTextByOption(option)).not.toBeVisible();
        }
    }

    async add_essay_options(options: string[]){
        for(let option of options) {
            await this.app_locators.getEssayOptionInput(option).check();
            await expect(this.app_locators.getEssayTextByOption(option)).toBeVisible();
            await this.app_locators.getEssayTextarea(option).fill(`This is the description of ${option}`);
            await this.app_locators.save_button.click();
            await expect(this.app_locators.application_saved_toast).toBeVisible();
        }
        await this.go_to_next_page();
    }

    async validate_pages_answers(){
        const pages: string[] = ['Lets get to know you!', 'Extracurricular Activities', 'High School Information', 'Essay'];
        for(let page of pages) {
            await expect(this.app_locators.getActivityByName(page).first()).toBeVisible();
            await this.app_locators.getAccordionControlByPage(page).click();
            await this.waitForLoading();
            switch(page) {
                case 'Lets get to know you!':
                    expect(await this.app_locators.getFieldValueLocator('First Name').textContent()).toEqual(testData.first_name);
                    expect(await this.app_locators.getFieldValueLocator('Last Name').textContent()).toEqual(testData.last_name);
                    expect(await this.app_locators.getFieldTextLocator('Email Address').textContent()).toEqual(email_id);
                    expect(await this.app_locators.getFieldValueLocator('Street Address').textContent()).toEqual(testData.street);
                    expect(await this.app_locators.getFieldTextLocator('State (Full)').textContent()).toEqual(testData.state);
                    expect(await this.app_locators.getFieldValueLocator('City').textContent()).toEqual(testData.city);
                    expect(await this.app_locators.getFieldValueLocator('Zip Code').textContent()).toEqual(testData.zipcode);
                    expect(await this.app_locators.getFieldTextLocator('Country').textContent()).toEqual(testData.country);
                    break;
 
                case 'Extracurricular Activities':
                    await this.validate_extracurricular_activies([testData.activity_1, testData.activity_2, testData.activity_3, testData.activity_4]);
                    break;
 
                case 'High School Information':
                    expect(await this.app_locators.getFieldValueLocator('High School Name').textContent()).toEqual(testData.high_school_name);
                    expect(await this.app_locators.getFieldValueLocator('High School Street Address').textContent()).toEqual(testData.street);
                    expect(await this.app_locators.getFieldValueLocator('High School City').textContent()).toEqual(testData.city);
                    expect(await this.app_locators.getFieldTextLocator('High School State (Full)').textContent()).toEqual(testData.state);
                    expect(await this.app_locators.getFieldTextLocator('High School Zip Code').textContent()).toEqual(testData.zipcode);
                    expect(await this.app_locators.getFieldTextLocator('GPA').textContent()).toEqual(testData.gpa);
                    expect(await this.app_locators.getFieldTextLocator('Year of High School Graduation').textContent()).toContain(testData.year_of_education);
                    await expect(this.app_locators.getActivityByName('My School Transcript.pdf').first()).toBeVisible();
                    break;
               
                case 'Essay':
                    await this.validate_essay_in_review_Page(testData.essay_options);
                    break;
            }
        }
    }

    async validate_extracurricular_activies(options: string[]){
        for (const [index, option] of options.entries()) {
            expect(await this.page.locator(`[title = "Entry ${index + 1 }"] span.mantine-Accordion-label span`).textContent()).toEqual(option);
        }
    }

    async validate_essay_in_review_Page(options: string[]){
        for(let option of options) {
            expect(await this.app_locators.essay_types_heading.textContent()).toContain(option);
            expect(await this.page.locator(`//p[contains(text(),"Essay about ${option}")]//following-sibling::p/span`).textContent()).toEqual(`This is the description of ${option}`);
        }
    }

    async waitForLoading(timeout = 30000) {
        const loadingIndicator = this.app_locators.loading_dots;
        try {
            await loadingIndicator.waitFor({ state: 'visible', timeout: 5000 });
            await loadingIndicator.waitFor({ state: 'hidden', timeout });
        } catch (error) {
            console.log('Loading indicator not visible or disappeared quickly');
        }
    }

    async validate_submit_application(){
        const url = this.page.url();
        console.log(url);
        await this.app_locators.submit_application_button.click();
        await this.page.goto(url);
        await expect(this.app_locators.edit_first_text).not.toBeVisible();
    }
}
