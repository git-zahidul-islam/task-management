"use client";  // This marks this component as a Client Component

import store from '@/features/store';
import { Provider } from 'react-redux';


export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
