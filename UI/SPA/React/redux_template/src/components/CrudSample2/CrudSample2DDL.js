import * as React from 'react';

export default class CrudSample2DDL extends React.Component {
    // constructor
    constructor(props) {
        super(props);

        // データアクセス制御クラス
        this.ddlDap = [
            { label: "SQL Server / SQL Client", value: "SQL" }, 
            { label: "Multi-DB / OLEDB.NET", value: "OLE" },
            { label: "Multi-DB / ODBC.NET", value: "ODB" },
            { label: "Oracle / ODP.NET", value: "ODP" },
            { label: "DB2 / DB2.NET", value: "DB2" },
            { label: "HiRDB / HiRDB-DP", value: "HIR" },
            { label: "MySQL Cnn/NET", value: "MCN" },
            { label: "PostgreSQL / Npgsql", value: "NPS" }
        ];
        // Ｄａｏモード
        this.ddlMode1 = [
            { label: "個別Ｄａｏ", value: "individual" }, 
            { label: "共通Ｄａｏ", value: "common" },
            { label: "自動生成Ｄａｏ（更新のみ）", value: "generate" }
        ];
        // 静的、動的のクエリ モード
        this.ddlMode2 = [
            { label: "静的クエリ", value: "static" },
            { label: "動的クエリ", value: "dynamic" }
        ];
        // 分離レベル
        this.ddlIso = [
            { label: "ノットコネクト", value: "NC" },
            { label: "ノートランザクション", value: "NT" },
            { label: "ダーティリード", value: "RU" },
            { label: "リードコミット", value: "RC" },
            { label: "リピータブルリード", value: "RR" },
            { label: "シリアライザブル", value: "SZ" },
            { label: "スナップショット", value: "SS" },
            { label: "デフォルト", value: "DF" }
        ];
        // コミット、ロールバックを設定
        this.ddlExRollback = [
            { label: "正常時", value: "-" },
            { label: "業務例外", value: "Business" },
            { label: "システム例外", value: "System" },
            { label: "その他、一般的な例外", value: "Other" },
            { label: "業務例外への振替", value: "Other-Business" },
            { label: "システム例外への振替", value: "Other-System" } 
        ];
        // 並び替え対象列
        this.ddlOrder = [
            { label: "c1", value: "c1" },
            { label: "c2", value: "c2" },
            { label: "c3", value: "c3" }
        ];
        // 昇順・降順
        this.ddlOrderSequence = [
            { label: "ASC", value: "" },
            { label: "DESC", value: "D" }
        ];
    }

    componentWillMount() {
        // 初回実行
    }

    componentWillReceiveProps(nextProps) {
        // route paramsなど、param変更時
    }

    // render
    render() {
        const divStyle = { };

        const ddlStyle = {
            width:"100%"
        };

        let ddl = this.props.ddl;

        if(!ddl)
        {
            ddl = {
                ddlDap: "SQL",
                ddlMode1: "individual",
                ddlMode2: "static",
                ddlIso: "NT",
                ddlExRollback: "-",
                ddlOrder: "c1",
                ddlOrderSequence: "A"
              }
        }

        return <div style={divStyle}>
            <table className='table'>
                <tbody style={ddlStyle}>
                    <tr>
                        <td>データアクセス制御クラス:</td>
                        <td>
                            <select value={ddl.ddlDap}
                                defaultValue={ddl.ddlDap} onChange={this.props.CHANGE_DDL_DAP}>
                                { this.ddlDap.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Ｄａｏモード:</td>
                        <td>
                            <select value={ddl.ddlMode1}
                                defaultValue={ddl.ddlMode1} onChange={this.props.CHANGE_DDL_MODE1}>
                                { this.ddlMode1.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>静的、動的のクエリ モード:</td>
                        <td>
                            <select value={ddl.ddlMode2}
                                defaultValue={ddl.ddlMode2} onChange={this.props.CHANGE_DDL_MODE2}>
                                { this.ddlMode2.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>分離レベル:</td>
                        <td>
                            <select value={ddl.ddlIso}
                                defaultValue={ddl.ddlIso} onChange={this.props.CHANGE_DDL_ISO}>
                                { this.ddlIso.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>コミット、ロールバックを設定:</td>
                        <td>
                            <select value={ddl.ddlExRollback}
                                defaultValue={ddl.ddlExRollback} onChange={this.props.CHANGE_DDL_EXROLLBACK}>
                                { this.ddlExRollback.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>並び替え対象列:</td>
                        <td>
                            <select value={ddl.ddlOrder}
                                defaultValue={ddl.ddlOrder} onChange={this.props.CHANGE_DDL_ORDER}>
                                { this.ddlOrder.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>昇順・降順:</td>
                        <td>
                            <select value={ddl.ddlOrderSequence}
                                defaultValue={ddl.ddlOrderSequence} onChange={this.props.CHANGE_DDL_ORDERSEQUENCE}>
                                { this.ddlOrderSequence.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}