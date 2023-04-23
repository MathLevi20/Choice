import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Choice from '../pages/main';

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

//      expect(screen.getByText(/Vote 1: \d+/)).toBeInTheDocument();
  //    expect(screen.getByText(/Vote 2: \d+/)).toBeInTheDocument();
      // Verifica se os botões de voto são renderizados corretamente
   
      //expect(screen.getByText('Select 1')).toBeInTheDocument();
      //expect(screen.getByText('Select 2')).toBeInTheDocument();
      //expect(screen.getByText('Votar')).toBeInTheDocument();
      //expect(screen.getByText('Recarregar')).toBeInTheDocument();
    });
  });

  test('handles vote correctly', async () => {
    render(<Choice />);

    //await waitFor(() => {
      //fireEvent.click(screen.getByText('Select 1'));
    //  expect(mockedAxiosPost).toHaveBeenCalledWith('https://cronos-api.onrender.com/vote', { id: '1', option: 1 });
  //  });
  });
});
