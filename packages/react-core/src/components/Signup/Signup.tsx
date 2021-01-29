import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useSignUpUser } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(10).required(),
});

export const Signup = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });
  const { mutate, isSuccess, error, isError } = useSignUpUser();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Sign Up">
      {isSuccess ? (
        <div className="mt-5">
          Awesome! Check your inbox shortly for your confirmation email
        </div>
      ) : (
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            title="Name"
            error={errors.name && formState.isSubmitted && 'Name is required'}
          >
            <Input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              ref={register}
            />
          </Label>
          <Label
            title="Email"
            error={
              errors.name && formState.isSubmitted && 'Invalid email address'
            }
          >
            <Input
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
              ref={register}
            />
          </Label>
          <Label
            title="Password"
            error={
              errors.name &&
              formState.isSubmitted &&
              'Passwords must be at least ten characters long'
            }
          >
            <Input
              type="password"
              name="password"
              placeholder="Choose password"
              ref={register}
            />
          </Label>
          {isError && error && <span>{error.message}</span>}
          <Button type="submit" disabled={!formState.isValid}>
            Sign Up
          </Button>
        </form>
      )}
      <div className="mt-5 text-gray-500 text-sm">
        Go back to{' '}
        <Link to="/" className="text-black underline">
          Login page
        </Link>
        .
      </div>
    </Auth>
  );
};
