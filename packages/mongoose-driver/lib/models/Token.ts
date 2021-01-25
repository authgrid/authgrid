import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IToken } from '@authgrid/common/interfaces/tokens.interfaces';

const TokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      default: uuidv4(),
    },
    userId: String,
    type: {
      type: String,
      enum: ['activation', 'reset-password'],
    },
  },
  {
    timestamps: true,
  }
);

export const Token = mongoose.model<IToken>('Token', TokenSchema);
