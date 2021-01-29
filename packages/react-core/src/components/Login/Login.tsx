import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useLoginUser } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';
import { ContextHolder } from '../../context/ContextOptions';
import { Error } from '../UI/Error';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export const Login = () => {
  const context = ContextHolder.getContext();

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });
  const { data, isSuccess, mutate, isError } = useLoginUser();

  const onSubmit = (data) => mutate(data);

  useEffect(() => {
    if (isSuccess) {
      location.replace('/');
    }
  }, [data, isSuccess]);

  return (
    <Auth title="Login">
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label
          title="Email"
          error={
            errors.email && formState.isSubmitted && 'Invalid email address'
          }
        >
          <Input
            type="email"
            name="email"
            placeholder="e-mail address"
            autoComplete="email"
            ref={register}
          />
        </Label>
        <Label
          title="Password"
          error={
            errors.password &&
            formState.isSubmitted &&
            'The Password is required'
          }
        >
          <Input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            ref={register}
          />
        </Label>
        {isError && <Error>Invalid email and password combination</Error>}
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
        <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
          <Link
            to={context?.routes.forgotPassword}
            className="flex-2 underline"
          >
            Forgot password?
          </Link>

          <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
            or
          </p>

          <Link to={context?.routes.signup} className="flex-2 underline">
            Create an Account
          </Link>
        </div>
      </form>
    </Auth>
  );
};
