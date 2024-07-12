// components/Prefectures.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import '@/app/styles/pref.css'; // スタイルシートのインポート
import React from 'react';
//都道府県のコードと名前
interface Prefecture {
  prefCode: number;
  prefName: string;
}
//チェックをした時の処理のインターフェース
interface PrefecturesProps {
  onChange: (prefCode: number, prefName: string, isChecked: boolean) => void;
}

const Prefectures: React.FC<PrefecturesProps> = ({ onChange }) => {
  const [prefs, setPrefs] = useState<Prefecture[]>([]);

  //都道府県一覧の取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
          {
            headers: {
              'X-API-KEY': process.env.RESAS_API_KEY,
            },
          }
        );
        setPrefs(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //チェックされた時の処理
  const handleCheckboxChange = (prefCode: number, prefName: string, checked: boolean) => {
    onChange(prefCode, prefName, checked);
  };

  return (
    <div className="prefs">
      {prefs.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={prefecture.prefName}
            data-testid={prefecture.prefName}
            value={prefecture.prefCode}
            onChange={(e) =>
              handleCheckboxChange(Number(e.target.value), (String)(e.target.id), e.target.checked)
            }
          />
          <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  );
};

export default Prefectures;
