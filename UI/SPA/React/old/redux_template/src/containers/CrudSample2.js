import * as React from 'react';
import * as actions from '../actions/CrudSample2';
import CrudSample2DDLContainer from './CrudSample2/CrudSample2DDL'
import CrudSample2InputContainer from './CrudSample2/CrudSample2Input'
import CrudSample2OutputContainer from './CrudSample2/CrudSample2Output'
import CrudSample2ButtonContainer from './CrudSample2/CrudSample2Button'

// export default connectをコメントアウトしたので、
// こちらを「export default class」に変更した。
export default class CrudSample2Container extends React.Component {
  
  render() {
    //return (<div>aaaa</div>)
    
    return (
      <div>
        <h1>CRUD sample</h1>
        <p>This component demonstrates CRUD.</p>
        <CrudSample2DDLContainer />
        <CrudSample2InputContainer />
        <CrudSample2OutputContainer />
        <CrudSample2ButtonContainer />
      </div>
    )
    
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

// ComponentとConnectすると、ComponentのRenderが呼ばれる。
// export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2)