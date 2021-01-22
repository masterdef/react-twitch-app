import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ touched, error }) {
      if (touched && error) return <div className="ui error message">{error}</div>
      return <div/>;
  }

  renderInput = ({ input, label, meta }) => {
    return <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
      return <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Title" />
        <Field name="description" component={this.renderInput}  label="Description"  />

        <button className="ui button primary">Submit</button>
      </form>
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) { errors.title = 'Title required'; }
  if (!formValues.description) { errors.description = 'Description required'; }

  return errors;
}

const formWrapped =  reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
