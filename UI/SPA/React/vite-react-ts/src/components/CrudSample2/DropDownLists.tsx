import * as React from 'react';

// ドロップダウンの選択肢の型
interface DdlOption {
  label: string;
  value: string;
}

// state の型
interface DdlState {
  ddlDap: string;
  ddlMode1: string;
  ddlMode2: string;
  ddlIso: string;
  ddlExRollback: string;
  ddlOrder: string;
  ddlOrderSequence: string;
}

// props の型
interface DropDownListsProps {
  onChangeDdl: (ddl: { ddl: DdlState }) => void;
}

// 選択肢データ（コンポーネント外に定数として定義）
const DDL_DAP: DdlOption[] = [
  { label: "SQL Server / SQL Client",  value: "SQL" },
  { label: "Multi-DB / OLEDB.NET",     value: "OLE" },
  { label: "Multi-DB / ODBC.NET",      value: "ODB" },
  { label: "Oracle / ODP.NET",         value: "ODP" },
  { label: "DB2 / DB2.NET",            value: "DB2" },
  { label: "HiRDB / HiRDB-DP",         value: "HIR" },
  { label: "MySQL Cnn/NET",            value: "MCN" },
  { label: "PostgreSQL / Npgsql",      value: "NPS" },
];

const DDL_MODE1: DdlOption[] = [
  { label: "個別Dao",                 value: "individual" },
  { label: "共通Dao",                 value: "common"     },
  { label: "自動生成Dao（更新のみ）",  value: "generate"   },
];

const DDL_MODE2: DdlOption[] = [
  { label: "静的クエリ", value: "static"  },
  { label: "動的クエリ", value: "dynamic" },
];

const DDL_ISO: DdlOption[] = [
  { label: "ノットコネクト",     value: "NC" },
  { label: "ノートランザクション", value: "NT" },
  { label: "ダーティリード",     value: "RU" },
  { label: "リードコミット",     value: "RC" },
  { label: "リピータブルリード", value: "RR" },
  { label: "シリアライザブル",   value: "SZ" },
  { label: "スナップショット",   value: "SS" },
  { label: "デフォルト",        value: "DF" },
];

const DDL_EX_ROLLBACK: DdlOption[] = [
  { label: "正常時",               value: "-"              },
  { label: "業務例外",             value: "Business"       },
  { label: "システム例外",          value: "System"         },
  { label: "その他、一般的な例外",   value: "Other"          },
  { label: "業務例外への振替",       value: "Other-Business" },
  { label: "システム例外への振替",   value: "Other-System"   },
];

const DDL_ORDER: DdlOption[] = [
  { label: "c1", value: "c1" },
  { label: "c2", value: "c2" },
  { label: "c3", value: "c3" },
];

const DDL_ORDER_SEQUENCE: DdlOption[] = [
  { label: "ASC",  value: ""  },
  { label: "DESC", value: "D" },
];

// 初期 state
const INITIAL_DDL_STATE: DdlState = {
  ddlDap:           "SQL",
  ddlMode1:         "individual",
  ddlMode2:         "static",
  ddlIso:           "NT",
  ddlExRollback:    "-",
  ddlOrder:         "c1",
  ddlOrderSequence: "A",
};

// ---- コンポーネント ----
export const DropDownLists: React.FC<DropDownListsProps> = ({ onChangeDdl }) => {
  const [ddl, setDdl] = React.useState<DdlState>(INITIAL_DDL_STATE);

  // 汎用ハンドラ：変更されたキーだけを更新して親へ通知
  const handleChange = (key: keyof DdlState) =>
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const next: DdlState = { ...ddl, [key]: e.target.value };
      setDdl(next);
      onChangeDdl({ ddl: next });
    };

  // 選択肢を <option> に変換するヘルパー
  const toOptions = (options: DdlOption[]): React.ReactElement[] =>
    options.map((d) => (
      <option key={d.value} value={d.value}>
        {d.label}
      </option>
    ));

  const ddlStyle: React.CSSProperties = { width: '100%' };

  return (
    <table className="table">
      <tbody style={ddlStyle}>
        <tr>
          <td>データアクセス制御クラス:</td>
          <td>
            <select value={ddl.ddlDap} onChange={handleChange('ddlDap')}>
              {toOptions(DDL_DAP)}
            </select>
          </td>
        </tr>
        <tr>
          <td>Daoモード:</td>
          <td>
            <select value={ddl.ddlMode1} onChange={handleChange('ddlMode1')}>
              {toOptions(DDL_MODE1)}
            </select>
          </td>
        </tr>
        <tr>
          <td>静的、動的のクエリ モード:</td>
          <td>
            <select value={ddl.ddlMode2} onChange={handleChange('ddlMode2')}>
              {toOptions(DDL_MODE2)}
            </select>
          </td>
        </tr>
        <tr>
          <td>分離レベル:</td>
          <td>
            <select value={ddl.ddlIso} onChange={handleChange('ddlIso')}>
              {toOptions(DDL_ISO)}
            </select>
          </td>
        </tr>
        <tr>
          <td>コミット、ロールバックを設定:</td>
          <td>
            <select value={ddl.ddlExRollback} onChange={handleChange('ddlExRollback')}>
              {toOptions(DDL_EX_ROLLBACK)}
            </select>
          </td>
        </tr>
        <tr>
          <td>並び替え対象列:</td>
          <td>
            <select value={ddl.ddlOrder} onChange={handleChange('ddlOrder')}>
              {toOptions(DDL_ORDER)}
            </select>
          </td>
        </tr>
        <tr>
          <td>昇順・降順:</td>
          <td>
            <select value={ddl.ddlOrderSequence} onChange={handleChange('ddlOrderSequence')}>
              {toOptions(DDL_ORDER_SEQUENCE)}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DropDownLists;