import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input';
import { Label } from '../Label';
import { useLoginUser } from '../../actions/auth.actions';
import { Request } from '../../utils/request';

export const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const { mutate } = useLoginUser();

  const onSubmit = (data) => mutate(data);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form
            className="mt-10 flex flex-col gap-2"
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
            <Label title="Password">
              <Input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                ref={register({ required: true })}
              />
            </Label>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="htmlForgot-password" className="flex-2 underline">
                htmlForgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <a href="register" className="flex-2 underline">
                Create an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
