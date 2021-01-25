import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useForgotPassword } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

export const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const { mutate, isSuccess } = useForgotPassword();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Forgot Password">
      {isSuccess ? (
        <div>We sent you an email</div>
      ) : (
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
          <Button type="submit">Remind Me</Button>
        </form>
      )}
    </Auth>
  );
};
