import { default as React } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReactDOMServer from 'react-dom/server';
import * as ReduxToolkit from '@reduxjs/toolkit';
import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';
import { default as ReduxPersistSessionStorage } from 'redux-persist/es/storage/session';
import { default as Clsx } from 'clsx';
import * as ReactIntl from 'react-intl';
import * as ReduxPersistReact from 'redux-persist/integration/react';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { createRoot } from 'react-dom/client';

const ProjectNameVendors = {
	React,
	ReactDOM,
	ReactRedux,
	ReactDOMClient: {
		createRoot,
	},
	jsxRuntime,
	ReactDOMServer,
	ReduxToolkit,
	Redux,
	ReduxPersist,
	ReduxPersistSessionStorage,
	ReduxToolkitQueryReact: {
		fetchBaseQuery,
		createApi,
	},
	Clsx,
	ReactIntl,
	ReduxPersistReact,
};
declare global {
	interface Window {
		ProjectNameVendors: any;
	}
}
window.ProjectNameVendors = ProjectNameVendors;
