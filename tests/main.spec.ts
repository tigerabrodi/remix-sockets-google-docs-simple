import { test, expect } from "@playwright/test";

const randomText = "some random text";

test("Type in two browsers, landing page.", async ({ browser }) => {
  const context = await browser.newContext();

  const pageOne = await context.newPage();
  const pageTwo = await context.newPage();

  await pageOne.goto("http://localhost:3000/");
  await pageTwo.goto("http://localhost:3000/");

  // Type in page one
  await pageOne.fill("textarea", randomText);

  // Assert text page two
  const $twoTextarea = pageTwo.locator("textarea");
  await expect($twoTextarea).toHaveText(randomText);

  await context.close();
});
