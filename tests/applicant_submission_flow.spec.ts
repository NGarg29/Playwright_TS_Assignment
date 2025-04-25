import { test, Page } from '@playwright/test';
import { testData } from '../test_data/data';
import { AppPages } from '../pages/app.page';

test.describe('Kaleidoscope Applicant Application process', async () => {
    let page: Page;
    let app_page: AppPages;

    test.beforeEach( async ( { browser } ) => {
        page = await browser.newPage();
        app_page = new AppPages(page);
        await page.goto(testData.base_url);
    })

    test.afterEach( async () => {
        await page.close();
    });

    test.only('Applicant Submission Test Flow', async () => {
        await app_page.click_on_login_to_apply();
        await app_page.login();
        await app_page.fill_lets_get_to_know_page();
        await app_page.add_extra_curricular_activities([testData.activity_1]);
        await app_page.validate_limit_activity_check();
        await app_page.add_extra_curricular_activities([testData.activity_2, testData.activity_3, testData.activity_4]);
        await app_page.go_to_next_page();
        await app_page.fill_high_school_information();
        await app_page.go_to_next_page();
        await app_page.validate_essay_options(["Cars", "Animals", "School", "Other"]);
        await app_page.add_essay_options(testData.essay_options);
        await app_page.go_to_next_page();
        await app_page.validate_pages_answers();
        await app_page.validate_submit_application();
    });
});
