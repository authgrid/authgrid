import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IActivationToken } from '@authgrid/common/interfaces/activationToken.interfaces';

const ActivationTokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      default: uuidv4(),
    },
    userId: String,
  },
  {
    timestamps: true,
  }
);

export const ActivationToken = mongoose.model<IActivationToken>(
  'ActivationToken',
  ActivationTokenSchema,
  'activation_tokens'
);
