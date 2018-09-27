import { connect } from 'react-redux';
import * as actions from '../actions/CrudSample';
import CrudSample from '../components/CrudSample';

const mapStateToProps = state => {
  return {
    message : state.CrudSampleReducer.message,
    shipper : state.CrudSampleReducer.shipper,
    shippers : state.CrudSampleReducer.shippers
  }
}

const mapDispatchToProps = dispatch => {
  return {

    CHANGE_SHIPPER_SHIPPERID: (e) => dispatch(actions.CHANGE_SHIPPER_SHIPPERID(e)),
    CHANGE_SHIPPER_COMPANYNAME: (e) => dispatch(actions.CHANGE_SHIPPER_COMPANYNAME(e)),
    CHANGE_SHIPPER_PHONE: (e) => dispatch(actions.CHANGE_SHIPPER_PHONE(e)),

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

export default connect(mapStateToProps, mapDispatchToProps)(CrudSample)