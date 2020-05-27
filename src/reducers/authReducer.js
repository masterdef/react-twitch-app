const INITIAL_STATE = {
  isSignedIn: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {...state, isSignedIn: true};
      break;

    case 'SIGN_OUT':
      return {...state, isSignedIn: false};
      break;
      
    default:
      return state;
  }
}
