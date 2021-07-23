import React from 'react';
import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { AuthService } from '../../services/authentication';
import NotificationService from '../../services/NotificationService';
import { AppButton } from '../large-movie-card';
import CustomModal from '../Modal';
import './index.css';

export default function LoginSignUP({ showSignUp, onHide }: any) {
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showFailureAlert, setshowFailureAlert] = useState(false);
  const [showModal, setshowModal] = useState(true);
  const [showRegister, setshowRegister] = useState(false);
  const register = async (payload: any) => {
    const authService = new AuthService();
    const result = await authService.register(payload);
    if (result && result.data) {
      NotificationService.show('Account created successfully', 'success');
    } else {
      NotificationService.show(result.data, 'error');
    }
  };
  const login = async (payload: any) => {
    const authService = new AuthService();
    const result = await authService.userLogin(payload);
    console.log('result ==>', result);
    if (result.kind === 'ok' && result.data && result.data.token) {
      localStorage.setItem('token', result.data.token);
    } else {
      setshowFailureAlert(false);
      NotificationService.show(result.data, 'error');
    }
  };
  const SignUpForm = () => {
    return (
      <>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();

            const formData = new FormData(e.target),
              formDataObj = Object.fromEntries(formData.entries());
            register(formDataObj);
          }}
          method="post"
        >
          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your full name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <p
            onClick={() => {
              setshowRegister(false);
            }}
            className="register"
          >
            Login
          </p>

          <AppButton type="submit">Submit</AppButton>
        </Form>
      </>
    );
  };
  const LoginForm = () => {
    return (
      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
          console.log(formDataObj);
          login(formDataObj);
        }}
        method="post"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <p
          onClick={() => {
            setshowRegister(true);
          }}
          className="register"
        >
          Register
        </p>
        <AppButton variant="primary" type="submit">
          Submit
        </AppButton>
      </Form>
    );
  };
  if (showRegister) {
    return (
      <CustomModal
        bodyText={<SignUpForm />}
        size="lg"
        centered
        showModal={showModal}
        headerText="Register"
      />
    );
  }
  return (
    <CustomModal
      bodyText={<LoginForm></LoginForm>}
      size="lg"
      centered
      showModal={showModal}
      headerText="Login"
      onHide={onHide}
    />
  );
}
