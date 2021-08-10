import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />, { wrapper: MemoryRouter });

    expect(baseElement).toBeTruthy();
  });
});
