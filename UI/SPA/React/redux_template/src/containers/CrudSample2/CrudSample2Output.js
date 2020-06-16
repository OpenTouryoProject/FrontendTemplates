import { connect } from 'react-redux'
//import * as actions from '../../actions/CrudSample2';
import CrudSample2Output from '../../components/CrudSample2/CrudSample2Output'
 
const mapStateToProps = state => {
  return {
    message : state.CrudSample2Reducer.message,
    shippers : state.CrudSample2Reducer.shippers
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2Output)