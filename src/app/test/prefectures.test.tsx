import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Prefectures from '../components/prefectures';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Prefectures', () => {
  const mockOnChange = jest.fn();

  const mockData = {
    data: {
      result: [
        { prefCode: 1, prefName: 'Hokkaido' },
        { prefCode: 2, prefName: 'Aomori' },
        // 他の都道府県データを追加
      ],
    },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockData);
    jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをモック
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('クラッシュしないか', async () => {
    render(<Prefectures onChange={mockOnChange} />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      mockData.data.result.forEach((prefecture) => {
        expect(screen.getByLabelText(prefecture.prefName)).toBeInTheDocument();
      });
    });
  });

  it('チェックした時の処理', async () => {
    render(<Prefectures onChange={mockOnChange} />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    const checkbox = screen.getByTestId('Hokkaido');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(1, 'Hokkaido', true);
  });

  it('チェックしたり外したりしたときの処理', async () => {
    render(<Prefectures onChange={mockOnChange} />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    const checkbox = screen.getByTestId('Hokkaido');
    fireEvent.click(checkbox); // チェック
    fireEvent.click(checkbox); // アンチェック

    expect(mockOnChange).toHaveBeenCalledWith(1, 'Hokkaido', true); // チェック時
    expect(mockOnChange).toHaveBeenCalledWith(1, 'Hokkaido', false); // アンチェック時
  });

  it('APIの読み込み', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Prefectures onChange={mockOnChange} />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
  });
});
