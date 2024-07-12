import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//必要なデータのインターフェース
export interface PrefData {
    prefName: string,
    prefCode: number,
    data: { year: number, value: number }[]
}



const LineChartComponent = ({ Datas }: { Datas: PrefData[] }) => {
    const colors = ["#ff0000", "#00ff00", "#ff00ff", "#0000ff", "#0f0f0f"];
    //人口の数字に,をつけて見やすくする
    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" domain={['dataMin', 'dataMax']} type="number" />
                    <YAxis tickFormatter={formatNumber} />
                    <Tooltip formatter={(value: number) => formatNumber(value)} />
                    <Legend />

                    {Datas?.map(({ prefCode, prefName, data }: PrefData, index: number) => (
                        <Line key={prefCode} type="monotone" dataKey="value" data={data} name={prefName} stroke={colors[index]} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;
