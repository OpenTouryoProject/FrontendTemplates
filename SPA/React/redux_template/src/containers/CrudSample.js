import { connect } from 'react-redux';
import * as actions from '../actions/CrudSample';
import CrudSample from '../components/CrudSample';

const mapStateToProps = state => {
  return {
    message : state.CrudSampleReducer.message,
    shipper : state.CrudSampleReducer.shipper,
    shippers : state.CrudSampleReducer.shippers,
    loading: state.CrudSampleReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SELECT_COUNT_ASYNC: (startDateIndex) => dispatch(actions.SELECT_COUNT_ASYNC(startDateIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudSample)