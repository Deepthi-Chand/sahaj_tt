import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { PageHeader, Form } from "react-bootstrap";
import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from 'moment';


export class Register extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().add("1","days"),
      endDate: moment().add("7", "days"),
      selectedDate:moment().add("1","days"),
    };
    this.handleChange = this.handleChange.bind(this);

    // bind <this> to the event method
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(date) {
    console.log(date);
    var updates={selectedDate: moment(date,"x")}
    this.setState({...this.state,...updates});
  }

  // render
  render() {
    const {user, handleSubmit, error, invalid, submitting} = this.props;
    return (
      <div className="page-register">
        <PageHeader>{'Registration for match'}</PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
        <DateTimeField inputFormat="DD/MM/YY" minDate={this.state.startDate} maxDate={this.state.endDate} onChange={this.handleChange} mode="date" name="registration_date"/>

          <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="registring..."
            buttonSave="Save Registration"/>
        </Form>
      </div>
    );
  }

  // submit the form
  formSubmit(values) {
    console.log(values);
    const {dispatch} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'USERS_ADD_EDIT',
        user: {
          id: values.id || 0,
          username: values.username,
          job: values.job,
        },
        callbackError: (error) => {
          reject(new SubmissionError({_error: error}));
        },
        callbackSuccess: () => {
          dispatch(push('/'));
          resolve();
        }
      });
    });
  }
}

// decorate the form component
const RegistrationForm = reduxForm({
  form: 'registration',
  validate: function (values) {
    const errors = {};

    if (!values.username) {
      errors.username = 'Registration date is required';
    }
    return errors;
  },
})(Register);

// export the connected class
function mapStateToProps(state, own_props) {
  const user = state.users.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    user: user,
    initialValues: user,
  };
}
export default connect(mapStateToProps)(RegistrationForm);
