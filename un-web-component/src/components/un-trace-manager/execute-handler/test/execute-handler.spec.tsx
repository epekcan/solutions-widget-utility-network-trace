import { newSpecPage } from '@stencil/core/testing';
import { ExecuteHandler } from '../execute-handler';

describe('execute-handler', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ExecuteHandler],
      html: `<execute-handler></execute-handler>`,
    });
    expect(page.root).toEqualHtml(`
      <execute-handler>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </execute-handler>
    `);
  });
});
