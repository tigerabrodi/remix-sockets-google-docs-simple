import { Browser } from '@playwright/test'

export const getPages = async (browser: Browser) => {
  const context = await browser.newContext()

  const pageOne = await context.newPage()
  const pageTwo = await context.newPage()

  return { pageOne, pageTwo, context }
}
