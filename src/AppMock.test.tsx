import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  const renderComponent = () => (render(<App />));

  test('renders learn react link', async () => {

    const { getByText, getAllByRole } = renderComponent();

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    fireEvent.click(getByText('Get users'));

    await waitFor(() => {
      const userList = getAllByRole('listitem');
      expect(userList).toHaveLength(2);
      expect(userList[0]).toHaveTextContent('Joe Doe');
      expect(userList[1]).toHaveTextContent('Jane Doe');
    });
  });
})

