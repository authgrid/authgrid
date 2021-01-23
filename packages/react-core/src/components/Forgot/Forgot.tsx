import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useLoginUser } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

export const Forgot = () => {
  const { register, handleSubmit, errors } = useForm();
  const { mutate } = useLoginUser();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Forgot Password" state="forgot">
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label title="Email">
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
    </Auth>
  );
};
