import { default as React } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReactDOMServer from 'react-dom/server';
import * as ReduxToolkit from '@reduxjs/toolkit';
import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';
import * as PropTypes from 'prop-types';
import { default as ReduxPersistSessionStorage } from 'redux-persist/es/storage/session';
import { styled, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { Done } from '@mui/icons-material';
import { default as Clsx } from 'clsx';
import * as ReactIntl from 'react-intl';
import * as ReduxPersistReact from 'redux-persist/integration/react';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const ProjectNameVendors = {
	React,
	ReactDOM,
	ReactRedux,
	jsxRuntime,
	ReactDOMServer,
	ReduxToolkit,
	Redux,
	ReduxPersist,
	ReduxPersistSessionStorage,
	PropTypes,
	MaterialUIStyles: {
		createTheme,
		styled,
	},
	MaterialUI: {
		ThemeProvider,
	},
	MaterialUIIcons: {
		Done,
	},
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
