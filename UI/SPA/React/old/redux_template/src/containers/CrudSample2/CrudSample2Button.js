import { connect } from 'react-redux'
import * as actions from '../../actions/CrudSample2';
import CrudSample2Button from '../../components/CrudSample2/CrudSample2Button'
 
const mapStateToProps = state => {
  return {
    ddl : state.CrudSample2Reducer.ddl,
    shipper : state.CrudSample2Reducer.shipper
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SELECT_COUNT_ASYNC: (ddl) => dispatch(actions.SELECT_COUNT_ASYNC(ddl)),
    SELECT_ALL_DT_ASYNC: (ddl) => dispatch(actions.SELECT_ALL_DT_ASYNC(ddl)),
    SELECT_ALL_DS_ASYNC: (ddl) => dispatch(actions.SELECT_ALL_DS_ASYNC(ddl)),
    SELECT_ALL_DR_ASYNC: (ddl) => dispatch(actions.SELECT_ALL_DR_ASYNC(ddl)),
    SELECT_ALL_DSQL_ASYNC: (ddl) => dispatch(actions.SELECT_ALL_DSQL_ASYNC(ddl)),
    
    SELECT_ASYNC: (ddl, shipper) => dispatch(actions.SELECT_ASYNC(ddl, shipper)),
    INSERT_ASYNC: (ddl, shipper) => dispatch(actions.INSERT_ASYNC(ddl, shipper)),
    UPDATE_ASYNC: (ddl, shipper) => dispatch(actions.UPDATE_ASYNC(ddl, shipper)),
    DELETE_ASYNC: (ddl, shipper) => dispatch(actions.DELETE_ASYNC(ddl, shipper))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2Button)