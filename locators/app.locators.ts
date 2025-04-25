import { Locator, Page } from '@playwright/test';

export class AppLocators {
    page: Page;
    login_button: Locator
    email_address: Locator;
    next_button: Locator;
    create_account_heading: Locator;
    first_name_input: Locator;
    last_name_input: Locator;
    phone_input: Locator;
    password_input: Locator;
    submit_button: Locator;
    street_input: Locator;
    state_input: Locator;
    city_input: Locator;
    zipcode_input: Locator;
    country_input: Locator;
    next_page_button: Locator;
    add_entry: Locator;
    add_button: Locator;
    enter_password: Locator;
    sign_in_button: Locator;
    i_confirm_13: Locator;
    get_to_know_heading: Locator;
    extra_curricular_activity_heading: Locator;
    least_2_entry_check: Locator;
    high_school_information_heading: Locator;
    high_school_name_input: Locator;
    high_school_street_input: Locator;
    high_school_city_input: Locator;
    high_school_state_input: Locator;
    high_school_zipcode_input: Locator;
    high_school_gpa_input: Locator;
    high_school_year_input: Locator;
    add_entry_button: Locator;
    add_entry_heading: Locator;
    short_input: Locator;
    number_input: Locator;
    textarea_input: Locator;
    save_button: Locator;
    application_saved_toast : Locator;
    submit_application_button: Locator;
    loading_dots: Locator;
    essay_types_heading: Locator;
    extra_curricular_activities_element: Locator;
    file_upload_input: Locator;
    edit_first_text: Locator;
    activity_entry_accordion: Locator;

    constructor(page: Page){
        this.page = page;
        this.login_button = this.page.getByText('Log In to Apply');
        this.email_address = this.page.getByPlaceholder('Email Address');
        this.next_button = this.page.getByLabel('Next');
        this.create_account_heading = this.page.getByText("Let's create your account.");
        this.first_name_input = this.page.getByLabel('First Name');
        this.last_name_input = this.page.getByLabel('Last Name');
        this.phone_input = this.page.locator('//*[@type="tel"]');
        this.password_input = this.page.getByLabel('Create a Password');
        this.submit_button = this.page.getByText('Submit');
        this.street_input = this.page.getByPlaceholder('Enter your street address');
        this.state_input = this.page.getByPlaceholder('Enter your state');
        this.city_input = this.page.getByPlaceholder('Enter your city');
        this.zipcode_input = this.page.getByPlaceholder('Enter your zip code');
        this.country_input = this.page.getByPlaceholder('Enter your country');
        this.next_page_button = this.page.locator('button[type = "submit"]');
        this.add_entry = this.page.getByText('Add Entry');
        this.enter_password = this.page.getByLabel('Enter Your Password')
        this.sign_in_button = this.page.locator('//span[text()="Sign In"]')
        this.i_confirm_13 = this.page.getByLabel('I confirm that I am at least 13 years old')
        this.get_to_know_heading = this.page.getByText('Lets get to know you!')
        this.extra_curricular_activity_heading = this.page.getByRole('heading', { name: 'Extracurricular Activities' })
        this.least_2_entry_check = this.page.getByText('Please add at least 2 entries')
        this.high_school_information_heading = this.page.getByText('High School Information')
        this.high_school_name_input = this.page.getByPlaceholder('Please enter the name of your current High School')
        this.high_school_street_input = this.page.getByPlaceholder('Enter high school street address')
        this.high_school_city_input = this.page.getByPlaceholder('Enter high school city')
        this.high_school_state_input = this.page.getByPlaceholder('Enter high school state')
        this.high_school_zipcode_input = this.page.getByPlaceholder('e.g. 55413')
        this.high_school_gpa_input = this.page.getByPlaceholder('Enter your current GPA')
        this.high_school_year_input = this.page.getByPlaceholder('Enter a date')
        this.add_entry_button = this.page.getByRole('button', { name: 'Add Entry', exact: true })
        this.add_entry_heading = this.page.locator('//h2[text()="Add Entry"]')
        this.short_input = this.page.getByPlaceholder('Short Input')
        this.number_input = this.page.locator('.mantine-NumberInput-input')
        this.textarea_input = this.page.locator('.mantine-Textarea-input')
        this.add_button = this.page.getByRole('button', { name: 'Add', exact: true })
        this.save_button = this.page.getByRole('button', { name: 'Save' })
        this.application_saved_toast = this.page.getByText('Application saved')
        this.submit_application_button = this.page.getByRole('button', { name: 'Submit' })
        this.loading_dots = this.page.locator("//div[@class='dots']")
        this.essay_types_heading = this.page.locator('//p[contains(text(),"essay types")]//following-sibling::p')
        this.extra_curricular_activities_element = this.page.locator('#form-renderer .mantine-Stack-root .mantine-Stack-root .mantine-Text-root')
        this.file_upload_input = this.page.locator('input[type=file]')
        this.edit_first_text = this.page.getByText('Edit').first()
        this.activity_entry_accordion = this.page.locator('[title = "Entry $index"] span.mantine-Accordion-label span')
    }
   
    getStateOption(state: string): Locator {
        return this.page.locator(`//div[@value="${state}"]`);
    }
   
    getCountryOption(country: string): Locator {
        return this.page.locator(`//div[@value="${country}"]`);
    }
   
    getActivityByName(activityName: string): Locator {
        return this.page.getByText(activityName);
    }
   
    getEssayOptionInput(option: string): Locator {
        return this.page.locator(`input[value="${option}"]`);
    }
   
    getEssayTextByOption(option: string): Locator {
        return this.page.getByText(`Essay about ${option}`);
    }
   
    getEssayTextarea(option: string): Locator {
        return this.page.locator(`//label[text()="Essay about ${option}"]//following-sibling::div/textarea`);
    }
   
    getAccordionControlByPage(page: string): Locator {
        return this.page.locator(`//button[contains(@class, "mantine-Accordion-control") and contains(., "${page}")]/span[@class="m_3f35ae96 mantine-Accordion-chevron"]`);
    }
   
    getFieldValueLocator(fieldName: string): Locator {
        return this.page.locator(`//p[text()="${fieldName}"]//following-sibling::p/span`);
    }
   
    getFieldTextLocator(fieldName: string): Locator {
        return this.page.locator(`//p[text()="${fieldName}"]//following-sibling::p`);
    }
   
    getActivityEntryTitle(index: number): Locator {
        return this.page.locator(`[title = "Entry ${index}"] span.mantine-Accordion-label span`);
    }
   
    getEssayDescriptionByType(option: string): Locator {
        return this.page.locator(`//p[contains(text(),"Essay about ${option}")]//following-sibling::p/span`);
    }
}