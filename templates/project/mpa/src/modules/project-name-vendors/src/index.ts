import { default as React } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';
import * as ReduxPersistReact from 'redux-persist/integration/react';
import * as ReactRedux from 'react-redux';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReduxToolkit from '@reduxjs/toolkit';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

import { default as Clsx } from 'clsx';

import * as ReactIntl from 'react-intl';

import ReduxPersistSessionStorage from 'redux-persist/lib/storage';

const ProjectNameVendors = {
	React,
	ReactRedux,
	jsxRuntime,
	ReduxToolkit,
	Redux,
	ReduxPersist,
	ReduxPersistReact,
	ReactDOMClient,
	ReduxPersistSessionStorage,
	ReduxToolkitQueryReact: {
		fetchBaseQuery,
		createApi,
	},
	Clsx,
	ReactIntl,
};

declare global {
	interface Window {
		ProjectNameVendors: any;
	}
}
window.ProjectNameVendors = ProjectNameVendors;
