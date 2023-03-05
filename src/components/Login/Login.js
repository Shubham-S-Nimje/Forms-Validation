import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import InputComponent from '../UI/Input/Input';

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
    isValid: null,
  });

  const [passState, dispatchpass] = useReducer(passReducer, {
    value: '',
    isValid: null,
  });

  // const authCtx = useContext(AuthContext)

  // useEffect(() => {
  //   console.log("Effect Running");

  //   return() => {
  //     console.log("Effect Cleanup")
  //   }
  // }, [])

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passState;

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
    // setEmailIsValid(enteredEmail.isValid);
    dispatchEmail({type: 'Input Blur'});
  };

  const validatecolHandler = () => {
    setColIsValid(enteredCol.trim().length > 5);
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(emailState.value.trim().length > 6);
    dispatchpass({type: 'Input Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputComponent 
        id='email'
        label='E-mail'
        type='email'
        inputState={emailState}
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>

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

        <InputComponent 
        id='password'
        label='Password'
        type='password'
        inputState={passState}
        isValid={passwordIsValid}
        value={passState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>

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
