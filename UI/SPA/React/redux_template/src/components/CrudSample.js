import * as React from 'react';

export default class CrudSample extends React.Component {
    // constructor
    constructor(props) {
        super(props);

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
        ]
        */

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
    }

    componentWillMount() {
        // 初回実行
    }

    componentWillReceiveProps(nextProps) {
        // route paramsなど、param変更時
    }

    // render
    render() {
        const div0Style = { };

        const div1Style = {
            display : 'inline-block'
        };

        const div2Style = {
            display : 'inline-block'
        };

        let contents = null;

        if(!this.props.shippers)
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
            <div style={div0Style}>
                { this.renderDDL() }
            </div>
            <div style={div1Style}>
                { this.renderInput(this.props.shipper) }
            </div>
            <div style={div2Style}>
                { contents }
                <p>処理結果：{this.props.message}</p>
            </div>
            <div>
                <button className='btn' onClick={ () => { this.props.SELECT_COUNT_ASYNC(this.state.ddl) } }>SelectCount</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.SELECT_ALL_DT_ASYNC(this.state.ddl) } }>SelectAll_DT</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.SELECT_ALL_DS_ASYNC(this.state.ddl) } }>SelectAll_DS</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.SELECT_ALL_DR_ASYNC(this.state.ddl) } }>SelectAll_DR</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.SELECT_ALL_DSQL_ASYNC(this.state.ddl) } }>SelectAll_DSQL</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.SELECT_ASYNC(this.state.ddl, this.props.shipper) } }>Select</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.INSERT_ASYNC(this.state.ddl, this.props.shipper) } }>Insert</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.UPDATE_ASYNC(this.state.ddl, this.props.shipper) } }>Update</button>&nbsp;
                <button className='btn' onClick={ () => { this.props.DELETE_ASYNC(this.state.ddl, this.props.shipper) } }>Delete</button>
            </div>
        </div>;
    }
    renderDDL()
    {
        const ddlStyle = {
            width:"100%"
        };

        return <table className='table'>
            <tbody style={ddlStyle}>
                <tr>
                    <td>データアクセス制御クラス:</td>
                    <td>
                        <select value={this.state.ddl.ddlDap}
                            defaultValue={this.state.ddl.ddlDap} onChange={this.onChangeDdlDap}>
                            { this.ddlDap.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Ｄａｏモード:</td>
                    <td>
                        <select value={this.state.ddl.ddlMode1}
                            defaultValue={this.state.ddl.ddlMode1} onChange={this.onChangeDdlMode1}>
                            { this.ddlMode1.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select><br/>
                    </td>
                </tr>
                <tr>
                    <td>静的、動的のクエリ モード:</td>
                    <td>
                        <select value={this.state.ddl.ddlMode2}
                            defaultValue={this.state.ddl.ddlMode2} onChange={this.onChangeDdlMode2}>
                            { this.ddlMode2.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>分離レベル:</td>
                    <td>
                        <select value={this.state.ddl.ddlIso}
                            defaultValue={this.state.ddl.ddlIso} onChange={this.onChangeDdlIso}>
                            { this.ddlIso.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>コミット、ロールバックを設定:</td>
                    <td>
                        <select value={this.state.ddl.ddlExRollback}
                            defaultValue={this.state.ddl.ddlExRollback} onChange={this.onChangeDdlExRollback}>
                            { this.ddlExRollback.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>並び替え対象列:</td>
                    <td>
                        <select value={this.state.ddl.ddlOrder}
                            defaultValue={this.state.ddl.ddlOrder} onChange={this.onChangeDdlOrder}>
                            { this.ddlOrder.map( d => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>昇順・降順:</td>
                    <td>
                        <select value={this.state.ddl.ddlOrderSequence}
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
        const inputStyle = {
            width:"100%"
        };

        if(!shipper)
        {
            shipper = {
                shipperID: "",
                companyName: "",
                phone: ""
            }
        }
        return <table className='table'>
            <tbody style={inputStyle}>
                <tr>
                    <td>ShipperID：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtShipperID" value={shipper.shipperID}
                                    defaultValue={shipper.shipperID} onChange={this.props.CHANGE_SHIPPER_SHIPPERID}/>
                            </label>
                        </p>            
                    </td>
                </tr>
                <tr>
                    <td>CompanyName：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtCompanyName" value={shipper.companyName}
                                    defaultValue={shipper.companyName} onChange={this.props.CHANGE_SHIPPER_COMPANYNAME}/>
                            </label>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Phone：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtPhone" value={shipper.phone}
                                    defaultValue={shipper.phone} onChange={this.props.CHANGE_SHIPPER_PHONE}/>
                            </label>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>;
    }
    renderTable(shippers) {
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
                <tr key={ shipper.shipperID }>
                    <td>{ shipper.shipperID }</td>
                    <td>{ shipper.companyName }</td>
                    <td>{ shipper.phone }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    // event handler (JavaScript)

    // drop down list
    onChangeDdlDap(e){
        this.setState({ddl: { ...this.state.ddl, ddlDap: e.target.value }});
    }
    onChangeDdlMode1(e){
        this.setState({ddl: { ...this.state.ddl, ddlMode1: e.target.value }});
    }
    onChangeDdlMode2(e){
        this.setState({ddl: { ...this.state.ddl, ddlMode2: e.target.value }});
    }
    onChangeDdlIso(e){
        this.setState({ddl: { ...this.state.ddl, ddlIso: e.target.value }});
    }
    onChangeDdlExRollback(e){
        this.setState({ddl: { ...this.state.ddl, ddlExRollback: e.target.value }});
    }
    onChangeDdlOrder(e){
        this.setState({ddl: { ...this.state.ddl, ddlOrder: e.target.value }});
    }
    onChangeDdlOrderSequence(e){
        this.setState({ddl: { ...this.state.ddl, ddlOrderSequence: e.target.value }});
    }
}