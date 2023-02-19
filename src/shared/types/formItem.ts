import { InputHTMLAttributes } from 'react';

export interface IFormItem extends InputHTMLAttributes<HTMLInputElement> {
  validateInfo?: string;
}
