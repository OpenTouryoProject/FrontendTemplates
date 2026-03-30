import * as React from 'react';
import 'isomorphic-fetch';
import {CrudSampleRootUrl} from '../const.js';

import oauth_oidc from '../touryo/oauth_oidc';

export class CrudSample extends React.Component {
    // constructor
    constructor() {
        super();

        this.state = {
            message : "",
            ddl : {
                ddlDap: "SQL",
                ddlMode1: "individual",
                ddlMode2: "static",
                ddlIso: "NT",
                ddlExRollback: "-",
                ddlOrder: "c1",
                ddlOrderSequence: "A"
            },
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
        
        // input type text
        this.onChangeShipperID = this.onChangeShipperID.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
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
        if(this.state.loading)
        {
            contents = <p><em>...Table...</em></p>;
        }
        else
        {
            contents = this.renderTable(this.state.shippers); 
        }

        return <div>
            <h1>CRUD sample</h1>
            <p>This component demonstrates CRUD.</p>
            <div style={div0Style}>
                { this.renderDDL() }
            </div>
            <div style={div1Style}>
                { this.renderInput() }
            </div>
            <div style={div2Style}>
                { contents }
                <p>処理結果：{this.state.message}</p>
            </div>
            <div>
                <button className='btn' onClick={ () => { this.selectCount() } }>SelectCount</button>&nbsp;
                <button className='btn' onClick={ () => { this.selectAll_DT() } }>SelectAll_DT</button>&nbsp;
                <button className='btn' onClick={ () => { this.selectAll_DS() } }>SelectAll_DS</button>&nbsp;
                <button className='btn' onClick={ () => { this.selectAll_DR() } }>SelectAll_DR</button>&nbsp;
                <button className='btn' onClick={ () => { this.selectAll_DSQL() } }>SelectAll_DSQL</button>&nbsp;
                <button className='btn' onClick={ () => { this.select() } }>Select</button>&nbsp;
                <button className='btn' onClick={ () => { this.insert() } }>Insert</button>&nbsp;
                <button className='btn' onClick={ () => { this.update() } }>Update</button>&nbsp;
                <button className='btn' onClick={ () => { this.delete() } }>Delete</button>
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
    renderInput()
    {
        const inputStyle = {
            width:"100%"
        };

        return <table className='table'>
            <tbody style={inputStyle}>
                <tr>
                    <td>ShipperID：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtShipperID" value={this.state.shipper.shipperID} onChange={this.onChangeShipperID}/>
                            </label>
                        </p>            
                    </td>
                </tr>
                <tr>
                    <td>CompanyName：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtCompanyName" value={this.state.shipper.companyName} onChange={this.onChangeCompanyName}/>
                            </label>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Phone：</td>
                    <td>
                        <p>
                            <label>
                                <input type="text" id="txtPhone" value={this.state.shipper.phone} onChange={this.onChangePhone}/>
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

    // input type text
    onChangeShipperID(e){
        this.setState({shipper: { ...this.state.shipper, shipperID: e.target.value }});
    }
    onChangeCompanyName(e){
        this.setState({shipper: { ...this.state.shipper, companyName: e.target.value }});
    }
    onChangePhone(e){
        this.setState({shipper: { ...this.state.shipper, phone: e.target.value }});
    }

    // event handler (WebAPI)
    selectCount() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectCount', {method, headers, body})
        .then(fetchStatusHandler) 
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                this.setState({ message : data.message });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    selectAll_DT() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DT', {method, headers, body})
        .then(fetchStatusHandler)     
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                this.setState({
                    message : "",
                    shippers : data.result,
                    loading: false
                });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    selectAll_DS() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DS', {method, headers, body})
        .then(fetchStatusHandler) 
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                this.setState({
                    message : "",
                    shippers : data.result,
                    loading: false
                });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    selectAll_DR() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DR', {method, headers, body})
        .then(fetchStatusHandler) 
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                this.setState({
                    message : "",
                    shippers : data.result,
                    loading: false
                });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    selectAll_DSQL() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(false);
        const body = 
            "ddlDap=" + this.state.ddl.ddlDap
            + "&ddlMode1=" + this.state.ddl.ddlMode1
            + "&ddlMode2=" + this.state.ddl.ddlMode2
            + "&ddlExRollback=" + this.state.ddl.ddlExRollback
            + "&orderColumn=" + this.state.ddl.ddlOrder
            + "&orderSequence=" + this.state.ddl.ddlOrderSequence;

        // fetchする。
        fetch(CrudSampleRootUrl + 'SelectAll_DSQL', {method, headers, body})
        .then(fetchStatusHandler) 
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                this.setState({
                    message : "",
                    shippers : data.result,
                    loading: false
                });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    select() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: "",
                phone: ""
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Select', {method, headers, body})
        .then(fetchStatusHandler) 
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                this.setState({
                    shipper:{
                        shipperID: data.result.shipperID,
                        companyName: data.result.companyName,
                        phone: data.result.phone
                        }
                });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    insert() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: '0',
                companyName: this.state.shipper.companyName,
                phone: this.state.shipper.phone
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Insert', {method, headers, body})
        .then(fetchStatusHandler)   
        .then(response => response.json())
        .then(data =>  {
            if(data.message) {
                this.setState({ message : data.message });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    update() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: this.state.shipper.companyName,
                phone: this.state.shipper.phone
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Update', {method, headers, body})
        .then(fetchStatusHandler)
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                this.setState({ message : data.message });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
    delete() {
        // エラーメッセージをクリアする
        this.setState({
            message : ""
        });

        // リクエストの生成
        const method = "POST";
        const headers = createHttpRequestHeader(true);
        const body = JSON.stringify({
            ddlDap: this.state.ddl.ddlDap,
            ddlMode1: this.state.ddl.ddlMode1,
            ddlMode2: this.state.ddl.ddlMode2,
            ddlExRollback: this.state.ddl.ddlExRollback,
            shipper: {
                shipperID: this.state.shipper.shipperID,
                companyName: "",
                phone: ""
            }
        });

        // fetchする。
        fetch(CrudSampleRootUrl + 'Delete', {method, headers, body})
        .then(fetchStatusHandler)
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                this.setState({ message : data.message });
            }
            else if(data.errorMSG) {
                this.setState({ message : JSON.stringify(data.errorMSG) });
            }
            else if(data.exceptionMSG) {
                this.setState({ message : JSON.stringify(data.exceptionMSG) });
            }
        })
        .catch(
            // 異常系
            error => {
                this.setState({ message : JSON.stringify(error.stack) });
            }
        );
    }
}

function createHttpRequestHeader(isJsonRpc) {
  let headers = { };

  if(isJsonRpc) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }
  else {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  let access_token = oauth_oidc.getAccessToken();
  if(access_token) {
    headers.Authorization = "Bearer " + access_token;
  }
  
  return headers;
}

// https://github.com/github/fetch/issues/155#issuecomment-108353192
function fetchStatusHandler(response) {
  if (response.status === 200) {
      return response;
  }
  else {
      throw new Error(response.statusText);
  }
}