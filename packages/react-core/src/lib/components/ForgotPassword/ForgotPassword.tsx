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
import { useTranslation } from 'react-i18next';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export const ForgotPassword = () => {
  const { t } = useTranslation(['auth', 'common']);

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const { mutate, isSuccess } = useForgotPassword();

  const onSubmit = (data) => mutate(data);

  return (
    <Auth title={t('title.forgotPassword')}>
      {isSuccess ? (
        <div className="mt-5 text-green-800 whitespace-pre-line">
          {t('message.forgotPasswordSucceed')}
        </div>
      ) : (
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            title={t('label.email')}
            error={errors.email && t('error.required', { field: 'Email' })}
          >
            <Input
              type="email"
              name="email"
              placeholder={t('placeholder.email')}
              autoComplete="email"
              ref={register}
            />
          </Label>
          <Button type="submit">{t('button.remindMe')}</Button>
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
