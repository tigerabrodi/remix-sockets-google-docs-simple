import { test, expect } from '@playwright/test'
import { getPages } from './utils'

const randomText = 'some random text'
const baseUrl = 'http://localhost:3000/'

test('Two clients typing on the landing page.', async ({ browser }) => {
  const { pageOne, pageTwo, context } = await getPages(browser)

  await pageOne.goto(baseUrl)
  await pageTwo.goto(baseUrl)

  // Type in page one
  await pageOne.fill('textarea', randomText)

  // Assert text page two
  const $twoTextarea = pageTwo.locator('textarea')
  await expect($twoTextarea).toHaveText(randomText)

  await context.close()
})

test('Two clients typing in a room', async ({ browser }) => {
  const { pageOne, pageTwo, context } = await getPages(browser)

  const room = 1
  await pageOne.goto(`${baseUrl}${room}`)
  await pageTwo.goto(`${baseUrl}${room}`)

  // Type in page one
  await pageOne.fill('textarea', randomText)

  // Assert text page two
  const $twoTextarea = pageTwo.locator('textarea')
  await expect($twoTextarea).toHaveText(randomText)

  await context.close()
})
