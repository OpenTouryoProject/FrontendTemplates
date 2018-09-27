import { connect } from 'react-redux';
import * as actions from '../actions/CrudSample';
import CrudSample from '../components/CrudSample';

const mapStateToProps = state => {
  return {
    isLoading: state.CrudSampleReducer.isLoading,
    forecasts: state.CrudSampleReducer.forecasts,
    startDateIndex: state.CrudSampleReducer.startDateIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GET_DATA_ASYNC: (startDateIndex) => dispatch(actions.GET_DATA_ASYNC(startDateIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrudSample)