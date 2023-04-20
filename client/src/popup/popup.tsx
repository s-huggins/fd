import { ApolloProvider } from '@apollo/client';
import { cva } from 'class-variance-authority';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { ProgressBar } from '../components/common/progress-bar';
import { AppContext, AppContextProvider } from '../context/app-context';
import client from '../graphql/apollo';
import { ExtensionHeader } from './components/extension-header';
import { ExtensionToggle } from './components/extension-toggle';
import { Library } from './components/library/library';
import './popup.css';

const popupClasses = cva(
  [
    // defaults
    'flex',
    'flex-col',
    'w-[600px]',
    'h-[600px]',
    'font-montserrat',
    'p-4',
    'overflow-y-auto',
    'text-base',
    'leading-7',
    'shadow-dark-inner'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-text'],

        light: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ]
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export const App: React.FC<{}> = () => {
  const { theme, hydrated, actionInFlight } = useContext(AppContext);

  return (
    <div className={popupClasses({ theme })}>
      <ProgressBar loading={actionInFlight} />
      <ExtensionHeader className="mb-2" />
      {hydrated && (
        <div className="grow flex flex-col">
          <ExtensionToggle className="mb-3" />
          <Library />
        </div>
      )}
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <AppContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContextProvider>
);
