import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'User Input') {
    return {
      value: action.val,
      isValid: action.val.includes('@') }
  }
  if(action.type === 'Input Blur') {
    return {
      value: state.value,
      isValid: state.value.includes('@') }
  }
  return {
    value: '',
    isValid: false }
};

const passReducer = (state, action) => {
  if(action.type === 'User Input') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6 }
  }
  if(action.type === 'Input Blur') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6 }
  }
  return {
    value: '',
    isValid: false }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  const [enteredCol, setEnteredCol] = useState('');
  const [collIsValid, setColIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

  const [passState, dispatchpass] = useReducer(passReducer, {
    value: '',
    isValid: false,
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('checking Form Validity!.')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return (()=> {
  //     console.log('Cleanup');
  //     clearTimeout(identifier);
  //   })
  // }, [enteredEmail, enteredPassword, enteredCol])


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'User Input', val: event.target.value});
    
    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const colChangeHandler = (event) => {
    setEnteredCol(event.target.value);

    setFormIsValid(
      enteredCol.trim().length > 5
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchpass({type: 'User Input', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'Input Blur'});
  };

  const validatecolHandler = () => {
    setColIsValid(enteredCol.trim().length > 5);
  };

  const validatePasswordHandler = () => {
    dispatchpass({type: 'Input Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            collIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCol}
            onChange={colChangeHandler}
            onBlur={validatecolHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
