import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { useSignUpUser } from '../../actions/auth.actions';
import { Auth } from '../Auth/Auth';
import { Button } from '../UI/Button';

export const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const { mutate } = useSignUpUser();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title="Sign Up" state="signup">
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label title="Name" error={errors.name && 'The Name is required'}>
          <Input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            ref={register({ required: true })}
          />
        </Label>
        <Label title="Email" error={errors.name && 'The Email is required'}>
          <Input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            ref={register({ required: true })}
          />
        </Label>
        <Label
          title="Password"
          error={errors.name && 'The Password is required'}
        >
          <Input
            type="password"
            name="password"
            placeholder="Choose password"
            ref={register({ required: true })}
          />
        </Label>
        <Button type="submit">Sign Up</Button>
      </form>
    </Auth>
  );
};
