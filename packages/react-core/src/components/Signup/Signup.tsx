import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useLoginUser } from '../../actions/auth.actions';
import { Request } from '../../utils/request';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

export const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const { mutate } = useLoginUser();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Sign Up" state="signup">
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label title="Name">
          <Input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            ref={register({ required: true })}
          />
        </Label>
        <Label title="Email">
          <Input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            ref={register({ required: true })}
          />
        </Label>
        <Button type="submit">Sign Up</Button>
      </form>
    </Auth>
  );
};
