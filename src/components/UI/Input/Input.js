import React from 'react'
import classes from './Input.module.css'

const InputComponent = (props) => {
  return (
    <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.label}>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            value={props.inputState.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
  )
}

export default InputComponent
