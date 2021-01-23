import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useLoginUser } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';
import { ContextHolder } from '../../ContextOptions';

export const Login = () => {
  const context = ContextHolder.getContext();

  const { register, handleSubmit, errors } = useForm();
  const { data, isSuccess, mutate } = useLoginUser();

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
        <Label title="Email" error={errors.email && 'The Email is required'}>
          <Input
            type="email"
            name="email"
            placeholder="e-mail address"
            autoComplete="email"
            ref={register({ required: true })}
          />
        </Label>
        <Label
          title="Password"
          error={errors.password && 'The Password is required'}
        >
          <Input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            ref={register({ required: true })}
          />
        </Label>
        <Button type="submit">Login</Button>
        <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
          <Link to={context?.routes.forgot} className="flex-2 underline">
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
