import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
      window.gapi.load('client:auth2', () => {
         window.gapi.client.init({
           clientId: '1058997453449-6m1kfr0lj5eek90mdtb55b9rors6nul9.apps.googleusercontent.com',
           scope: 'email'
         }).then(() => {
           this.auth = window.gapi.auth2.getAuthInstance();

           this.onAuthChange(this.auth.isSignedIn.get());

           this.auth.isSignedIn.listen(this.onAuthChange);
         });;
      });
  }

  onAuthChange = f => {
    if (f) this.props.signIn(
      this.auth.currentUser.get().getId()
    ) ;
    else this.props.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    const {isSignedIn} = this.props;

    if (isSignedIn === null) {
      return <div>.</div>
    } else if (isSignedIn) {
      return <button className="ui red google button" onClick={this.onSignOutClick}>
        <i className="google icon"></i>
        Sign Out
      </button>
    } else {
      return <button className="ui red google button" onClick={this.onSignInClick}>
        <i className="google icon"></i>
        Sign Google
      </button>
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
