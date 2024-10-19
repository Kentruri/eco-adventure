import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Dashboard from '@/components/Dashboard';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/auth';
import '@testing-library/jest-dom';  

test("should display the user's displayName when available", () => {
  const mockStoreWithDisplayName = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        currentUser: { displayName: 'John Doe', email: 'john.doe@example.com' },
      },
    },
  });

  render(
    <Provider store={mockStoreWithDisplayName}>
      <Dashboard />
    </Provider>
  );

  const greeting = screen.getByText(/Hi, John Doe !/i); 
  expect(greeting).toBeInTheDocument();  
});

test("should display part of the user's email when displayName is not available", () => {
  const mockStoreWithEmailOnly = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        currentUser: { displayName: null, email: 'kevin.doe@example.com' },
      },
    },
  });

  render(
    <Provider store={mockStoreWithEmailOnly}>
      <Dashboard />
    </Provider>
  );

  const greeting = screen.getByText(/Hi, kevin !/i); 
  expect(greeting).toBeInTheDocument();  
});