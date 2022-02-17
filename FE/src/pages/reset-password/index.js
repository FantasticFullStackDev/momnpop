import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";

import axios from "axios";
import queryString from "query-string";

export default function ResetPassword() {
  const { register, handleSubmit, errors, watch } = useForm();
  const [resetToken, setResetCode] = useState(null);
  const [isCallingApi, setCallingApi] = useState(false);
  const [callError, setCallError] = useState(false)
  const location = useLocation();
  const history = useHistory();

  const handleSubmitForm = (payload) => {
    setCallingApi(true);
    axios
      .post(
        process.env.REACT_APP_BASEURL + "/users/passwordreset/" + resetToken,
        {
          password: payload.newPass,
        }
      )
      .then((res) => {
        setCallingApi(false);
        if (res.status === 200) {
          history.push('/login')
        }
      })
      .catch((err) => {
        setCallingApi(false);
        setCallError(true)
      });
  };

  useEffect(() => {
    let query = queryString.parse(location.search);
    if (query.token) {
      setResetCode(query.token);
    }
  }, [location]);

  return (
    <div className="col-sm-4 mx-auto form-group">
      <h1 className="general-title text-center">Reset Password</h1>
      <Form onSubmit={handleSubmit(handleSubmitForm)} className="login-form">
        {isCallingApi && (
          <div className="text-center" style={{ padding: "2%" }}>
            <p>Resetting your password</p>
            <Loader color="#FF992E" />
          </div>
        )}
        {
          !isCallingApi && callError && (
            <div className="text-center" style={{ padding: "2%", color: 'red' }}>
              <p>Error while resetting your password</p>
          </div>
          )
        }
        <FormGroup>
          <FormControl
            name="newPass"
            ref={register({
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            })}
            className={`input ${
              errors.newPass ? "is-invalid" : ""
            } shadow-none`}
            type="password"
            placeholder="New password"
          />
          {errors.newPass && errors.newPass.type === "required" && (
            <p style={{ color: "red" }}>New password is required</p>
          )}
          {errors.newPass && errors.newPass.type === "pattern" && (
            <>
              <p style={{ color: "red" }}>
                Strong password is required! Password must include
              </p>
              <ul style={{ color: "red" }}>
                <li>lowercase</li>
                <li> uppercase, </li>
                <li>numeric character and </li>
                <li>must be 8 or longer charcters</li>
              </ul>
            </>
          )}
        </FormGroup>
        <FormGroup>
          <FormControl
            name="confirmNewPass"
            ref={register({
              required: true,
              validate: (value) => value === watch("newPass"),
            })}
            className={`input ${
              errors.confirmNewPass ? "is-invalid" : ""
            } shadow-none`}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmNewPass &&
            errors.confirmNewPass.type === "required" && (
              <p style={{ color: "red" }}>Confirm password is required</p>
            )}
          {errors.confirmNewPass &&
            errors.confirmNewPass.type === "validate" && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}
        </FormGroup>
        <FormGroup className="text-center">
          <Button
            variant="submit"
            className="red-btn"
            type="submit"
            disabled={!resetToken}
          >
            Reset Password
          </Button>
        </FormGroup>
        {/*<br/>
                <br/>
                <Link to="/free-business-invitation">Signup</Link> or <Link to="/login">Login</Link>*/}
      </Form>
    </div>
  );
}
