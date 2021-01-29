import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useResetPassword } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';
import { useQueryParams } from '../../hooks/useQueryParams';

export const ResetPassword = () => {
  const query = useQueryParams();
  const { register, handleSubmit, errors, watch } = useForm();
  const { mutate, isSuccess } = useResetPassword({ token: query.get('token') });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Set Your Password">
      {isSuccess ? (
        <div>You can login now with your new password</div>
      ) : (
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            title="Password"
            error={errors.password && 'The Password is required'}
          >
            <Input
              type="password"
              name="password"
              placeholder="Your new password"
              ref={register({ required: true })}
            />
          </Label>
          <Label
            title="Repeat Password"
            error={errors.password_repeat && 'The passwords do not match'}
          >
            <Input
              type="password"
              name="password_repeat"
              placeholder="Confirm your new password"
              ref={register({
                validate: (value) => value === password.current,
              })}
            />
          </Label>
          <Button type="submit">Save Password</Button>
        </form>
      )}
    </Auth>
  );
};
