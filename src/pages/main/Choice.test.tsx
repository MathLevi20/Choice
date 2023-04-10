import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Choice from '.';

jest.mock('axios');

const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

mockedAxiosGet.mockResolvedValue({
  data: [
    {
      id: '1',
      option1: 'Option 1',
      option2: 'Option 2',
      vote1: 0,
      vote2: 0
    }
  ]
});

mockedAxiosPost.mockResolvedValue({});

describe('Choice Component', () => {
  test('renders options, votes and vote buttons correctly', async () => {
    render(<Choice />);

    await waitFor(() => {
     expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();


      // Verifica se os botões de voto são renderizados corretamente
      expect(screen.getByText('Vote 1')).toBeInTheDocument();
      expect(screen.getByText('Vote 2')).toBeInTheDocument();
    });
  });

  test('handles vote correctly', async () => {
    render(<Choice />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Vote 1'));
      expect(mockedAxiosPost).toHaveBeenCalledWith('https://cronos-api.onrender.com/vote', { id: '1', option: 1 });
    });
  });
});
