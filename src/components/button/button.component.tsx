import './button.styles.scss';
import { FC, ButtonHTMLAttributes } from 'react';

export enum BUTTON_TYPE_CLASSES {
  google = 'google-sign-in',
  inverted = 'inverted',
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  const buttonClassName = buttonType
    ? BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES]
    : '';

  return (
    <button
      disabled={isLoading}
      className={`button-container ${buttonClassName}`}
      {...otherProps}
    >
      {isLoading ? <div className="rotate-spinner"></div> : children}
    </button>
  );
};

export default Button;
