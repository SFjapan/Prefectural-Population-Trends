import React from 'react';
import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react';
import LineChartComponent, { PrefData } from '../components/chart';

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
      ...OriginalModule,
      ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <OriginalModule.ResponsiveContainer width={800} height={800}>
          {children}
        </OriginalModule.ResponsiveContainer>
      ),
    };
  }
);

const mockData:PrefData[] =[
    {
        prefName:"北海道",
        prefCode:1,
        data:[
            {
                year:2001,
                value:1000000,
            },
            {
                year:2005,
                value:1012000,
            },
            {
                year:20010,
                value:1100000,
            }
        ],
        
    },{
        prefName:"青森",
        prefCode:2,
        data:[
            {
                year:2001,
                value:1200000,
            },
            {
                year:2005,
                value:1240000,
            },
            {
                year:2001,
                value:1250000,
            }
        ],  
    },
    
] ;

describe('LineChart', () => {
    it('クラッシュしているか', () => {
        const { container } = render(<LineChartComponent Datas={mockData} />);
        expect(container).toBeInTheDocument();
    });

    it('データがちゃんと表示されているか', () => {
        const { container } = render(<LineChartComponent Datas={mockData} />);
        const lines = container.querySelectorAll('.recharts-line');
        expect(lines.length).toBe(mockData.length);
    });

    it('都道府県名が出ているか', () => {
        const { getByText } = render(<LineChartComponent Datas={mockData} />);
        mockData.forEach((pref) => {
            expect(getByText(pref.prefName)).toBeInTheDocument();
        });
    });

    it('人口がきちんとフォーマットされているか', () => {
        const { getByText } = render(<LineChartComponent Datas={mockData} />);
        // 正規表現を使用してカンマ区切りの数値を検索
        const formattedNumbers = screen.getAllByText(/^\d{1,3}(,\d{3})*(\.\d+)?$/);
        expect(formattedNumbers.length).toBeGreaterThan(0);
    });
  });