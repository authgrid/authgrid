import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useForgotPassword } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export const ForgotPassword = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });
  const { mutate, isSuccess } = useForgotPassword();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Forgot Password">
      {isSuccess ? (
        <div className="mt-5 text-green-800">
          We&apos;ve sent you an email which you can use to change your
          password. Check your spam folder if you haven&apos;t received it after
          a few minutes.
        </div>
      ) : (
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            title="Email"
            error={
              errors.email && formState.isSubmitted && 'The Email is required'
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
          <Button type="submit" disabled={!formState.isValid}>
            Remind Me
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
