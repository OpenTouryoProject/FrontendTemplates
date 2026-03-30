import { connect } from 'react-redux'
import * as actions from '../../actions/CrudSample2';
import CrudSample2Input from '../../components/CrudSample2/CrudSample2Input'
 
const mapStateToProps = state => {
  return {
    shipper : state.CrudSample2Reducer.shipper
  }
}

const mapDispatchToProps = dispatch => {
  return {
    CHANGE_SHIPPER_SHIPPERID: (e) => dispatch(actions.CHANGE_SHIPPER_SHIPPERID(e)),
    CHANGE_SHIPPER_COMPANYNAME: (e) => dispatch(actions.CHANGE_SHIPPER_COMPANYNAME(e)),
    CHANGE_SHIPPER_PHONE: (e) => dispatch(actions.CHANGE_SHIPPER_PHONE(e))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CrudSample2Input)