import { Selector } from 'testcafe';
import { login, getPageUrl } from '../../../tests/helpers/e2e';

fixture('/documents').page('http://localhost:3000/login');

test('should allow users to create a new document', async (browser) => {
  await login({
    email: 'user+1@test.com',
    password: 'password',
    browser,
  });

  await browser.click('[data-test="newDocumentButton"]');
  await browser.expect(getPageUrl()).contains('/edit');
  await browser
    .expect(Selector('[data-test="documentTitle"]').value)
    .contains('Untitled Document #');
});

test('should allow users to view a new document', async (browser) => {
  await login({
    email: 'user+1@test.com',
    password: 'password',
    browser,
  });

  await browser.click('[data-test="newDocumentButton"]');
  await browser.click('[data-test="documentSettingsButton"]');
  await browser.click('[data-test="viewDocumentButton"]');
  await browser
    .expect(Selector('[data-test="documentTitle"]').innerText)
    .contains('Untitled Document #');
});
