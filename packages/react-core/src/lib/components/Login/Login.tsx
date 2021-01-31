import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['auth', 'common']);
  const context = ContextHolder.getContext();

  const { register, handleSubmit, errors } = useForm({
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
    <Auth title={t('title.login')}>
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label
          title={t('label.email')}
          error={errors.email && t('error.invalidEmail')}
        >
          <Input
            type="email"
            name="email"
            placeholder={t('placeholder.email')}
            autoComplete="email"
            ref={register}
          />
        </Label>
        <Label
          title={t('label.password')}
          error={errors.password && t('error.required', { field: 'Password' })}
        >
          <Input
            type="password"
            name="password"
            placeholder={t('placeholder.password')}
            autoComplete="current-password"
            ref={register}
          />
        </Label>
        {isError && <Error>{t('error.invalidLogin')}</Error>}
        <Button type="submit">{t('button.login')}</Button>
        <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
          <Link
            to={context?.routes.forgotPassword}
            className="flex-2 underline"
          >
            {t('navigation.forgotPassword')}
          </Link>

          <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
            {t('common::verbs.or')}
          </p>

          <Link to={context?.routes.signup} className="flex-2 underline">
            {t('navigation.signUp')}
          </Link>
        </div>
      </form>
    </Auth>
  );
};
