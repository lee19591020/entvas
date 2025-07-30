import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';
import { Login } from './login';

type LoginPayload = {
  username: string;
  password: string;
};

const renderWithForm = (
  ui: React.ReactElement,
  onSubmit: (data: LoginPayload) => void = () => {}
) => {
  const Wrapper = () => {
    const methods = useForm<LoginPayload>();

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {ui}
        </form>
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe('Login component', () => {
  it('renders login form', () => {
    renderWithForm(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with user input', async () => {
    const onSubmit = vi.fn();
    renderWithForm(<Login />, onSubmit);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'admin1');
    await user.type(screen.getByLabelText(/password/i), 'admin1');

    await user.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      username: 'admin1',
      password: 'admin1'
    },
    expect.anything());
  });

  it('shows error if loginStatus is not 200', () => {
    renderWithForm(<Login loginStatus={{ status: 401, message: 'Error' }} />);
    expect(screen.getByRole('Error')).toHaveTextContent('Username or password invalid!');
  });
});
