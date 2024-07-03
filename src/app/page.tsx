'use client'
import React from "react";
import { useState } from "react";
import LineChartComponent from "./components/chart"
import Prefectures from "./components/prefectures";
import axios from "axios";
import { PrefData } from "./components/chart";
export default function Home() {
    //都道府県のリスト
    const [prefectures, setPrefectures] = useState<PrefData[]>([]);
    //チェックボックスの処理
    const handleCheckboxChange = async (prefCode: number, prefName: string, isChecked: boolean) => {
        //チェックした時の処理
        if (isChecked) {
            const response = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
                { headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY || '', } });
            setPrefectures([...prefectures,
            {
                prefName: prefName,
                prefCode: prefCode,
                data: response.data.result.data[0].data.sort((a: any, b: any) => a.year - b.year)
            }
            ]);
        }
        //チェックを外した時の処理
    };
    return (
        <main>
            <Prefectures onChange={handleCheckboxChange}>
            </Prefectures>
            <LineChartComponent Datas={prefectures}>
            </LineChartComponent>
        </main>
    );
}
