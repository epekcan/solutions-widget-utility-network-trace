import { newE2EPage } from '@stencil/core/testing';

describe('execute-handler', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<execute-handler></execute-handler>');

    const element = await page.find('execute-handler');
    expect(element).toHaveClass('hydrated');
  });
});
