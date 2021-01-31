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
import { useTranslation } from 'react-i18next';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(10).required(),
});

export const Signup = () => {
  const { t } = useTranslation(['auth', 'common']);
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const { mutate, isSuccess, error, isError } = useSignUpUser();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title={t('title.signUp')}>
      {isSuccess ? (
        <div className="mt-5">{t('message.signUpSucceed')}</div>
      ) : (
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            title={t('label.name')}
            error={errors.name && 'Name is required'}
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
            title={t('label.email')}
            error={errors.name && t('error.invalidEmail')}
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
            title={t('label.password')}
            error={errors.name && t('error.invalidPassword')}
          >
            <Input
              type="password"
              name="password"
              placeholder="Choose password"
              ref={register}
            />
          </Label>
          {isError && error && <span>{error.message}</span>}
          <Button type="submit">{t('button.signUp')}</Button>
        </form>
      )}
      <div className="mt-5 text-gray-500 text-sm">
        {t('navigation.goBackTo')}{' '}
        <Link to="/" className="text-black underline">
          {t('navigation.login')}
        </Link>
        .
      </div>
    </Auth>
  );
};
