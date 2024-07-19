import './form-input.styles.scss';
import { InputHTMLAttributes, FC } from 'react';

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  const inputLabelClassName =
    otherProps.value &&
    typeof otherProps.value === 'string' &&
    otherProps.value.length
      ? 'shrink form-input-label'
      : 'form-input-label';

  return (
    <div className="group">
      <input className="form-input" {...otherProps} autoComplete="off" />
      {label && (
        <label className={inputLabelClassName} htmlFor="displayName">
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
