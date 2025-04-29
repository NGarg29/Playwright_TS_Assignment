import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { FormPage } from '../pages/form.page';
import { ReviewPage } from '../pages/review.page';

type MyFixtures = {
  loginPage: LoginPage;
  formPage: FormPage;
  reviewPage: ReviewPage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },

  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  }
  
});

export { expect } from '@playwright/test';
