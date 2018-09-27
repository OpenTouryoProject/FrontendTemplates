import * as React from 'react';

export default class CrudSample extends React.Component {
    // constructor
    constructor() {
        super();
        this.state = {
            ddl : {
                ddlDap: "SQL",
                ddlMode1: "individual",
                ddlMode2: "static",
                ddlIso: "NT",
                ddlExRollback: "-",
                ddlOrder: "c1",
                ddlOrderSequence: "A"
            }
        };

        // 以下はRedux（prop）化
        /*
        message : ""
        shipper : {
            shipperID: "",
            companyName: "",
            phone: ""
        },
        shippers : 
        [
            {
                shipperID: "",
                companyName: "",
                phone: ""
            }
        ],
        loading: true
        */

        this.rootUrl = 'http://localhost:8888/api/json/';

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

        // method を bind
        // drop down list
        this.onChangeDdlDap = this.onChangeDdlDap.bind(this);
        this.onChangeDdlMode1 = this.onChangeDdlMode1.bind(this);
        this.onChangeDdlMode2 = this.onChangeDdlMode2.bind(this);
        this.onChangeDdlIso = this.onChangeDdlIso.bind(this);
        this.onChangeDdlExRollback = this.onChangeDdlExRollback.bind(this);
        this.onChangeDdlOrder = this.onChangeDdlOrder.bind(this);
        this.onChangeDdlOrderSequence = this.onChangeDdlOrderSequence.bind(this);
        
        // input type text
        this.onChangeShipperID = this.onChangeShipperID.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
    }

    componentWillMount() {
        // 初回実行
    }

    componentWillReceiveProps(nextProps) {
        // route paramsなど、param変更時
    }

    // render
    render() {
        const div1Style = {
            width:"30%",
            display : 'inline-block'
        };
        const div2Style = {
            width:"70%",
            display : 'inline-block'
        };

        let contents = null;
        if(this.props.loading)
        {
            contents = <p><em>...Table...</em></p>;
        }
        else
        {
            contents = this.renderTable(this.props.shippers); 
        }

        return <div>
            <h1>CRUD sample</h1>
            <p>This component demonstrates CRUD.</p>
            <div style={div1Style}>
                { this.renderDDL() }
                { this.renderInput(this.props.shipper) }
            </div>
            <div style={div2Style}>
                { contents }
                <p>処理結果：{this.props.message}</p>
            </div>
            <div>
                <button className='btn' onClick={ () => { this.props.SELECT_COUNT_ASYNC(this.state.ddl) } }>SelectCount</button>&nbsp;                
            </div>
        </div>;
    }
    renderDDL()
    {
        const ddlStyle = {
            width:"100%"
        };

        return <table className='table'>
            <tbody>
                <tr>
                    <td>データアクセス制御クラス:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlDap}
                            defaultValue={this.state.ddl.ddlDap} onChange={this.onChangeDdlDap}>
                            { this.ddlDap.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Ｄａｏモード:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlMode1}
                            defaultValue={this.state.ddl.ddlMode1} onChange={this.onChangeDdlMode1}>
                            { this.ddlMode1.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select><br/>
                    </td>
                </tr>
                <tr>
                    <td>静的、動的のクエリ モード:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlMode2}
                            defaultValue={this.state.ddl.ddlMode2} onChange={this.onChangeDdlMode2}>
                            { this.ddlMode2.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>分離レベル:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlIso}
                            defaultValue={this.state.ddl.ddlIso} onChange={this.onChangeDdlIso}>
                            { this.ddlIso.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>コミット、ロールバックを設定:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlExRollback}
                            defaultValue={this.state.ddl.ddlExRollback} onChange={this.onChangeDdlExRollback}>
                            { this.ddlExRollback.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>並び替え対象列:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlOrder}
                            defaultValue={this.state.ddl.ddlOrder} onChange={this.onChangeDdlOrder}>
                            { this.ddlOrder.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>昇順・降順:</td>
                    <td>
                        <select style={ddlStyle} value={this.state.ddl.ddlOrderSequence}
                            defaultValue={this.state.ddl.ddlOrderSequence} onChange={this.onChangeDdlOrderSequence}>
                            { this.ddlOrderSequence.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>;
    }
    renderInput(shipper)
    {
        if(!shipper)
        {
            shipper = {
                shipperID: "",
                companyName: "",
                phone: ""
            }
        }
        return <table className='table'>
            <tbody>
                <tr>
                    <td>ShipperID：</td>
                    <td>
                        <p><label><input type="text" id="txtShipperID" value={shipper.shipperID} onChange={this.onChangeShipperID}/></label></p>            
                    </td>
                </tr>
                <tr>
                    <td>CompanyName：</td>
                    <td>
                        <p><label><input type="text" id="txtCompanyName" value={shipper.companyName} onChange={this.onChangeCompanyName}/></label></p>
                    </td>
                </tr>
                <tr>
                    <td>Phone：</td>
                    <td>
                        <p><label><input type="text" id="txtPhone" value={shipper.phone} onChange={this.onChangePhone}/></label></p>
                    </td>
                </tr>
            </tbody>
        </table>;
    }
    renderTable(shippers) {
        if(!shippers)
        {
            shippers = [
                {
                    shipperID: "a",
                    companyName: "a",
                    phone: "a"
                }
            ]
        }

        return <table className='table'>
            <thead>
                <tr>
                    <th>ShipperID</th>
                    <th>CompanyName</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
            {shippers.map(shipper =>
                <tr key={ shipper.ShipperID }>
                    <td>{ shipper.ShipperID }</td>
                    <td>{ shipper.CompanyName }</td>
                    <td>{ shipper.Phone }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    // event handler (JavaScript)

    // drop down list
    onChangeDdlDap(e){
        this.state.ddl.ddlDap = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlMode1(e){
        this.state.ddl.ddlMode1 = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlMode2(e){
        this.state.ddl.ddlMode2 = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlIso(e){
        this.state.ddl.ddlIso = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlExRollback(e){
        this.state.ddl.ddlExRollback = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlOrder(e){
        this.state.ddl.ddlOrder = e.target.value;
        this.setState({ddl: this.state.ddl});
    }
    onChangeDdlOrderSequence(e){
        this.state.ddl.ddlOrderSequence = e.target.value;
        this.setState({ddl: this.state.ddl});
    }

    // input type text
    onChangeShipperID(e){
        this.state.shipper.shipperID = e.target.value;
        this.setState({shipper: this.state.shipper});
    }
    onChangeCompanyName(e){
        this.state.shipper.companyName = e.target.value;
        this.setState({shipper: this.state.shipper});
    }
    onChangePhone(e){
        this.state.shipper.phone = e.target.value;
        this.setState({shipper: this.state.shipper});
    }
}