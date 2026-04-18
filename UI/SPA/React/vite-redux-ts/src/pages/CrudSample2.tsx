import * as React from 'react';
import constants from '../const';
import common from '../common.ts';
import oauth_oidc from '../touryo/oauth_oidc';
import Inputs from '../components/CrudSample2/Inputs';
import DropDownLists from '../components/CrudSample2/DropDownLists';
import Buttons from '../components/CrudSample2/Buttons';
import Outputs from '../components/CrudSample2/Outputs';

// Redux 関連のインポート
import { connect } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setMessage, clearMessage } from '../store/crudSampleSlice';

// ===== 型定義 =====

// Propsの型定義
interface StateProps {
  message: string;
}
interface DispatchProps {
  onSetMessage: (msg: string) => void;
  onClearMessage: () => void;
}

// コンポーネント自身のProps（connect後に外から渡すものは空）
type CrudSampleProps = StateProps & DispatchProps;

// Stateの型定義
interface DdlState {
  ddlDap: string;
  ddlMode1: string;
  ddlMode2: string;
  ddlIso: string;
  ddlExRollback: string;
  ddlOrder: string;
  ddlOrderSequence: string;
}

interface ShipperState {
  shipperID: string;
  companyName: string;
  phone: string;
}

interface CrudSample2State {
  //message: string; は Redux管理のため削除
  ddl: DdlState;
  shipper: ShipperState;
  shippers: ShipperState[];
  loading: boolean;
}

// ===== コンポーネント =====

export class CrudSample2 extends React.Component<CrudSampleProps, CrudSample2State> //<Record<string, never>, CrudSample2State>
{
  constructor(props: CrudSampleProps) {//Record<string, never>) {
    super(props);

    this.state = {
      // message: '', は Redux管理のため削除
      ddl: {
        ddlDap: 'SQL',
        ddlMode1: 'individual',
        ddlMode2: 'static',
        ddlIso: 'NT',
        ddlExRollback: '-',
        ddlOrder: 'c1',
        ddlOrderSequence: 'A',
      },
      shipper: {
        shipperID: '',
        companyName: '',
        phone: '',
      },
      shippers: [
        {
          shipperID: '',
          companyName: '',
          phone: '',
        },
      ],
      loading: true,
    };
  }

  // ===== render =====

  render() {
    const containerStyle: React.CSSProperties = { textAlign: 'left' };
    const div0Style: React.CSSProperties = {};
    const div1Style: React.CSSProperties = { display: 'inline-block' };
    const div2Style: React.CSSProperties = { display: 'inline-block' };

    return (
      <div style={containerStyle}>
        <h1>CRUD sample</h1>
        <p>This component demonstrates CRUD.</p>
        <div style={div0Style}>
          <DropDownLists onChangeDdl={(e) => this.receiveDDLChanged(e)} />
        </div>
        <div style={div1Style}>
          <Inputs
            shipper={this.state.shipper}
            onChangeInput={(e) => this.receiveInputChanged(e)}
          />
        </div>
        <div style={div2Style}>
          <Outputs
            loading={this.state.loading}
            shippers={this.state.shippers}
            message={this.props.message} //message={this.state.message}            
          />
        </div>
        <div>
          <Buttons
            onClickButton={(e) => this.receiveButtonClick(e)}
          />
        </div>
      </div>
    );
  }

  // ─── 子コンポーネントからのイベント受信 ────────────────────

  receiveDDLChanged(ddl: Partial<CrudSample2State>): void {
    this.setState(ddl as CrudSample2State);
  }

  receiveInputChanged(shipper: Partial<CrudSample2State>): void {
    this.setState(shipper as CrudSample2State);
  }

  receiveButtonClick(actionType: string): void {
    switch (actionType) {
      case 'SelectCount':    this.selectCount();    return;
      case 'SelectAll_DT':   this.selectAll_DT();   return;
      case 'SelectAll_DS':   this.selectAll_DS();   return;
      case 'SelectAll_DR':   this.selectAll_DR();   return;
      case 'SelectAll_DSQL': this.selectAll_DSQL(); return;
      case 'Select':         this.select();         return;
      case 'Insert':         this.insert();         return;
      case 'Update':         this.update();         return;
      case 'Delete':         this.delete();         return;
      default:               return;
    }
  }

  // ===== WebAPI イベントハンドラ =====
  // this.setState({ message: ... }) → this.props.onSetMessage(...) に変更
  // this.setState({ message: '' })  → this.props.onClearMessage()  に変更

  selectCount() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'SelectCount',
      oauth_oidc.createHttpRequestHeader(false),
      'ddlDap=' + this.state.ddl.ddlDap
        + '&ddlMode1=' + this.state.ddl.ddlMode1
        + '&ddlMode2=' + this.state.ddl.ddlMode2
        + '&ddlExRollback=' + this.state.ddl.ddlExRollback,
      (data) => {
        if (data.message) {
          //this.setState({ message: JSON.stringify(data.message) });
          this.props.onSetMessage(JSON.stringify(data.message));
        }
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );
  }

  selectAll_DT() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'SelectAll_DT',
      oauth_oidc.createHttpRequestHeader(false),
      'ddlDap=' + this.state.ddl.ddlDap
        + '&ddlMode1=' + this.state.ddl.ddlMode1
        + '&ddlMode2=' + this.state.ddl.ddlMode2
        + '&ddlExRollback=' + this.state.ddl.ddlExRollback,
      (data) => {
        if (data.result) {
          this.setState({ shippers: data.result as ShipperState[], loading: false });
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );    
  }

  selectAll_DS() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'selectAll_DS',
      oauth_oidc.createHttpRequestHeader(false),
      'ddlDap=' + this.state.ddl.ddlDap
        + '&ddlMode1=' + this.state.ddl.ddlMode1
        + '&ddlMode2=' + this.state.ddl.ddlMode2
        + '&ddlExRollback=' + this.state.ddl.ddlExRollback,
      (data) => {
        if (data.result) {
          this.setState({ shippers: data.result as ShipperState[], loading: false });
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );  
  }

  selectAll_DR() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'selectAll_DR',
      oauth_oidc.createHttpRequestHeader(false),
      'ddlDap=' + this.state.ddl.ddlDap
        + '&ddlMode1=' + this.state.ddl.ddlMode1
        + '&ddlMode2=' + this.state.ddl.ddlMode2
        + '&ddlExRollback=' + this.state.ddl.ddlExRollback,
      (data) => {
        if (data.result) {
          this.setState({ shippers: data.result as ShipperState[], loading: false });
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),

    );  
  }

  selectAll_DSQL() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'selectAll_DSQL',
      oauth_oidc.createHttpRequestHeader(false),
      'ddlDap=' + this.state.ddl.ddlDap
        + '&ddlMode1=' + this.state.ddl.ddlMode1
        + '&ddlMode2=' + this.state.ddl.ddlMode2
        + '&ddlExRollback=' + this.state.ddl.ddlExRollback
        + '&orderColumn=' + this.state.ddl.ddlOrder
        + '&orderSequence=' + this.state.ddl.ddlOrderSequence,
      (data) => {
        if (data.result) {
          this.setState({ shippers: data.result as ShipperState[], loading: false });
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );  
  }

  select() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'select',
      oauth_oidc.createHttpRequestHeader(true),
      JSON.stringify({
        ddlDap: this.state.ddl.ddlDap,
        ddlMode1: this.state.ddl.ddlMode1,
        ddlMode2: this.state.ddl.ddlMode2,
        ddlExRollback: this.state.ddl.ddlExRollback,
        shipper: {
          shipperID: this.state.shipper.shipperID,
          companyName: '',
          phone: '',
        },
      }),
      (data) => {
        if (data.result) {
          const result = data.result as ShipperState;
          this.setState({
            shipper: {
              shipperID: result.shipperID,
              companyName: result.companyName,
              phone: result.phone,
            },
          });
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    ); 
  }

  insert() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'insert',
      oauth_oidc.createHttpRequestHeader(true),
      JSON.stringify({
        ddlDap: this.state.ddl.ddlDap,
        ddlMode1: this.state.ddl.ddlMode1,
        ddlMode2: this.state.ddl.ddlMode2,
        ddlExRollback: this.state.ddl.ddlExRollback,
        shipper: {
          shipperID: '0',
          companyName: this.state.shipper.companyName,
          phone: this.state.shipper.phone,
        },
      }),
      (data) => {
        if (data.message) {
          //this.setState({ message: JSON.stringify(data.message) });
          this.props.onSetMessage(JSON.stringify(data.message));
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );
  }

  update() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'update',
      oauth_oidc.createHttpRequestHeader(true),
      JSON.stringify({
        ddlDap: this.state.ddl.ddlDap,
        ddlMode1: this.state.ddl.ddlMode1,
        ddlMode2: this.state.ddl.ddlMode2,
        ddlExRollback: this.state.ddl.ddlExRollback,
        shipper: {
          shipperID: this.state.shipper.shipperID,
          companyName: this.state.shipper.companyName,
          phone: this.state.shipper.phone,
        },
      }),
      (data) => {
        if (data.message) {
          //this.setState({ message: JSON.stringify(data.message) });
          this.props.onSetMessage(JSON.stringify(data.message));
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );
  }

  delete() {
    //this.setState({ message: '' });
    this.props.onClearMessage();
    common.postFetch(
      constants.CrudSampleRootUrl + 'delete',
      oauth_oidc.createHttpRequestHeader(true),
      JSON.stringify({
        ddlDap: this.state.ddl.ddlDap,
        ddlMode1: this.state.ddl.ddlMode1,
        ddlMode2: this.state.ddl.ddlMode2,
        ddlExRollback: this.state.ddl.ddlExRollback,
        shipper: {
          shipperID: this.state.shipper.shipperID,
          companyName: '',
          phone: '',
        },
      }),
      (data) => {
        if (data.message) {
          //this.setState({ message: JSON.stringify(data.message) });
          this.props.onSetMessage(JSON.stringify(data.message));
        }        
      },
      //(msg) => this.setState({ message: JSON.stringify(msg) }),
      (msg) => this.props.onSetMessage(JSON.stringify(msg)),
    );
  }
}

// ===== Redux connect =====

const mapStateToProps = (state: RootState): StateProps => ({
  message: state.crudSample.message,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onSetMessage: (msg: string) => dispatch(setMessage(msg)),
  onClearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2);
