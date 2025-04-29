import { test } from './fixture';
import { testData } from '../test_data/data';
const id: string = "test_" + Date.now() + "@gmail.com";
const email_id: string = testData?.existing_email_id || id;

test.describe.only('Kaleidoscope Applicant Application process', async () => {
    test('Applicant Submission Test Flow', async ({ loginPage, formPage, reviewPage }) => {
        await test.step('Login or Signup into the application', async () => {
            await loginPage.login(email_id);
        })

        await test.step('Fill get to know information form', async () => {
            await formPage.fill_lets_get_to_know_page();
        })

        await test.step('Fill extra curricular acctivity form', async () => {
            await formPage.add_extra_curricular_activities([testData.activity_1]);
            await formPage.validate_limit_activity_check();
            await formPage.add_extra_curricular_activities([testData.activity_2, testData.activity_3, testData.activity_4]);
        })

        await test.step('Fill high school information form', async () => {
            await formPage.fill_high_school_information();
        })

        await test.step('Fill essay types', async () => {
            await formPage.validate_essay_options(["Cars", "Animals", "School", "Other"]);
            await formPage.add_essay_options(testData.essay_options);
        })

        await test.step('Validate review & submit page', async () => {
            await reviewPage.validate_pages_answers(email_id);
            await reviewPage.validate_submit_application();
        })
    });
});
