# SDET Automation Challenge

Create a Playwright project that tests the Kaleidoscope Applicant Application process.

Scholarship Landing Page: <https://apply.mykaleidoscope.com/program/sdet-test-scholarship>

Steps:

- Register a new User
- Begin a new Application for the provided Program: <https://apply.mykaleidoscope.com/program/sdet-test-scholarship>
- Step through each page filling out questions
  - Page 1
    - Fill out all Required Fields
  - Page 2
    - Validate that at least 2 Extracurricular Activities are required, when not providing enough.
    - Finish page by providing 4 Activities
  - Page 3
    - Fill out the form
    - Upload the provided School Transcript
      - The File is provided in the ZIP Package
  - Page 4
    - Validate that each option under "Please select the essay types you want to write about” shows an essay box.
      - Cars → Essay about Cars
      - Animals → Essay about Animals
      - School → Essay about School
      - Other → Provide an essay about any topic
    - Select Only Animals and School
    - Provide Answers to the Two selected Essay Questions
- On Review Page
  - Validate Pages and Answers shown as answered
- Submit Application
  - Capture the Page URL so it can be redirected back to after Submitting the Application.
  - Validate Editing is not allowed after Application has been submitted.

## Run Tests:

- First, clone the project repository from GitHub:

  ```bash
  git clone https://github.com/NGarg29/Playwright_TS_Assignment.git

  ```

- Install Dependencies

  Once you’ve cloned the repository, install all required dependencies via npm:

  ```bash
  npm install

  ```

- Run Tests

  Good to go to run the test cases:

  ```bash
    npx playwright test

    ```
## Basic Configuration Guidelines

  - Maintain all the test data in data.ts file & secret variables including url in .env file
  - Only if using existing email_id, set the email_id in .env file.
  - Also, I have pushed positive test-results folder for both usecases(with or without existing email id)
