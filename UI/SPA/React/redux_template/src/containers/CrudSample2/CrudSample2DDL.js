import { connect } from 'react-redux'
import * as actions from '../../actions/CrudSample2';
import CrudSample2DDL from '../../components/CrudSample2/CrudSample2DDL'

const mapStateToProps = state => {
  return {
    ddl : state.CrudSample2Reducer.ddl
  }
}
const mapDispatchToProps = dispatch => {
  return {
    CHANGE_DDL_DAP: (ddl) => dispatch(actions.CHANGE_DDL_DAP(ddl)),
    CHANGE_DDL_MODE1: (ddl) => dispatch(actions.CHANGE_DDL_MODE1(ddl)),
    CHANGE_DDL_MODE2: (ddl) => dispatch(actions.CHANGE_DDL_MODE2(ddl)),
    CHANGE_DDL_ISO: (ddl) => dispatch(actions.CHANGE_DDL_ISO(ddl)),
    CHANGE_DDL_EXROLLBACK: (ddl) => dispatch(actions.CHANGE_DDL_EXROLLBACK(ddl)),
    CHANGE_DDL_ORDER: (ddl) => dispatch(actions.CHANGE_DDL_ORDER(ddl)),
    CHANGE_DDL_ORDERSEQUENCE: (ddl) => dispatch(actions.CHANGE_DDL_ORDERSEQUENCE(ddl))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2DDL)