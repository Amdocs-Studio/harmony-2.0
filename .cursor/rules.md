# Harmony 2.0 - SPA-Light Template Cursor Rules

This is a lightweight Single Page Application (SPA) built with React, Redux Toolkit, RTK Query, Vite, and TypeScript. This template provides a minimal setup for quick project bootstrapping.

## Project Structure Overview

```
src/
├── base-modules/           # Core application modules
│   ├── app-intl/          # Internationalization setup
│   ├── base-styles/       # Global styles
│   ├── common-components/ # Shared UI components
│   ├── feedback-handler/  # Toast/Modal/Spinner system
│   ├── mocks/             # MSW mock handlers
│   └── sdk/               # State management (Redux Toolkit + RTK Query)
├── bootstrap/             # App initialization (router, layout, pages)
├── ui-modules/            # Feature UI modules
└── main.tsx               # Entry point
```

## SDK Module Guidelines (API/State Management)

SDK modules are located in `src/base-modules/sdk/modules/`. Each module manages a specific domain of application state.

### Module File Structure

```
src/base-modules/sdk/modules/{module-name}/
├── index.ts              # Module exports
├── {ModuleName}Api.ts    # RTK Query API (network requests)
├── {ModuleName}Reducer.ts # Redux slice (local state)
├── {ModuleName}Config.ts  # Module configuration
├── {ModuleName}Types.ts   # TypeScript types
└── use{ModuleName}.ts     # Custom hook for actions
```

### Creating an RTK Query API (`{ModuleName}Api.ts`)

```typescript
import { baseQueryImpl } from '../../services';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './{ModuleName}Config';
import { EntityType, ENTITY_TAG } from './{ModuleName}Types';

export const {moduleName}Api = createApi({
  reducerPath: config.apiSliceName,
  baseQuery: baseQueryImpl({
    baseUrl: 'v1/{endpoint-path}'
  }),
  tagTypes: [ENTITY_TAG],
  endpoints: (build) => ({
    getEntities: build.query<EntityType[], void>({
      query: () => '',
      providesTags: [ENTITY_TAG]
    }),
    getEntity: build.query<EntityType, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: ENTITY_TAG, id }]
    }),
    createEntity: build.mutation<EntityType, Partial<EntityType>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: [ENTITY_TAG]
    })
  })
});

export const {moduleName}ApiReducer = {moduleName}Api.reducer;
```

### Creating a Redux Slice (`{ModuleName}Reducer.ts`)

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './{ModuleName}Config';
import { {ModuleName}StateType } from '@sdk';

const initialState: {ModuleName}StateType = {
  someState: ''
};

export const {moduleName}Slice = createSlice({
  name: config.sliceName,
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<{ value: string }>) {
      state.someState = action.payload.value;
    }
  }
});

export default {moduleName}Slice.reducer;
```

### Module Configuration (`{ModuleName}Config.ts`)

```typescript
import { ModuleConfigType } from '@sdk';
import { {ModuleName}StateType } from './{ModuleName}Types';
import { Slice } from '@reduxjs/toolkit';

export const config: ModuleConfigType<Slice<{ModuleName}StateType>> = {
  sliceName: '{moduleName}',
  apiSliceName: '{moduleName}Api',
  withApi: true,
  withReducer: true,
};

export default config;
```

### Custom Hook for Actions (`use{ModuleName}.ts`)

```typescript
import { {moduleName}Slice } from './{ModuleName}Reducer';
import { useSliceActions } from '../../utils';

export const use{ModuleName} = () => {
  const dispatchActions = useSliceActions({moduleName}Slice.actions);
  return { ...dispatchActions };
};
```

### Module Index Exports (`index.ts`)

```typescript
import {moduleName}Reducer from './{ModuleName}Reducer';
import { {moduleName}ApiReducer } from './{ModuleName}Api';

export { default as {moduleName}Reducer } from './{ModuleName}Reducer';
export { default as {moduleName}Config } from './{ModuleName}Config';
export * from './{ModuleName}Api';
export type * from './{ModuleName}Types';
export { use{ModuleName} } from './use{ModuleName}';

export const {moduleName}Reducers = {
  {moduleName}Api: {moduleName}ApiReducer,
  {moduleName}: {moduleName}Reducer
};
```

## UI Module Guidelines

UI modules are located in `src/ui-modules/`. Each module is a self-contained feature component.

### Module File Structure

```
src/ui-modules/{module-name}/
├── index.ts                    # Module exports
├── {ModuleName}.tsx            # Entry point component
├── {ModuleName}.provider.tsx   # Context provider with business logic
├── {ModuleName}.types.ts       # TypeScript types
├── {ModuleName}.i18n.ts        # Internationalization strings
├── {ModuleName}.stories.tsx    # Storybook stories
├── components/                 # Sub-components
│   └── {ModuleName}.main.tsx   # Main presentation component
└── styles/
    └── index.css               # Module styles
```

### Entry Point Component (`{ModuleName}.tsx`)

```typescript
import { {ModuleName}Props } from './{ModuleName}.types';
import { {ModuleName}Provider } from './{ModuleName}.provider';
import './styles/index.css';

export default function {ModuleName}(props: {ModuleName}Props) {
  return <{ModuleName}Provider {...props} />;
}
```

### Context Provider (`{ModuleName}.provider.tsx`)

```typescript
import { createContext, useContext, useMemo } from 'react';
import {ModuleName}Main from './components/{ModuleName}.main';
import { {ModuleName}ContextType, {ModuleName}Props } from './{ModuleName}.types';
import { useAppNavigate } from '@sdk';

const {ModuleName}Context = createContext<{ModuleName}ContextType | undefined>(undefined);

export function {ModuleName}Provider(props: {ModuleName}Props) {
  const navigate = useAppNavigate();

  const value = useMemo(() => ({
    ...props,
    navigate,
  }), [navigate, props]);

  return (
    <{ModuleName}Context.Provider value={value}>
      <{ModuleName}Main />
    </{ModuleName}Context.Provider>
  );
}

export const use{ModuleName}Context = () => useContext({ModuleName}Context) as {ModuleName}ContextType;
```

### Type Definitions (`{ModuleName}.types.ts`)

```typescript
import { NavigateFunction } from '@sdk';

export type {ModuleName}ContextType = {
  navigate: NavigateFunction;
}

export type {ModuleName}Props = object;
```

### Internationalization (`{ModuleName}.i18n.ts`)

```typescript
export const {moduleName}Descriptor = {
  en: {
    'title': 'Module Title',
  }
} as const;
```

### Storybook Stories (`{ModuleName}.stories.tsx`)

```typescript
import { StoryFn as Story, Meta } from '@storybook/react';
import {ModuleName} from './{ModuleName}';
import { {ModuleName}Props } from './{ModuleName}.types';

export default {
  title: 'Widgets/{ModuleName}',
  component: {ModuleName},
} as Meta;

export const Default: Story<{ModuleName}Props> = () => {
  return <{ModuleName} />;
};
```

### Main Component (`components/{ModuleName}.main.tsx`)

```typescript
import { Button } from '@common-components';
import { use{ModuleName}Context } from '../{ModuleName}.provider';

export default function {ModuleName}Main() {
  const { navigate } = use{ModuleName}Context();

  return (
    <div className="{module-name}-container">
      <Button onClick={() => navigate('/')} label="Go Home" />
    </div>
  );
}
```

## File Naming Conventions

| File Type | Pattern | Example |
|-----------|---------|---------|
| Entry point | `{ModuleName}.tsx` | `HomeHero.tsx` |
| Provider | `{ModuleName}.provider.tsx` | `HomeHero.provider.tsx` |
| Types | `{ModuleName}.types.ts` | `HomeHero.types.ts` |
| i18n | `{ModuleName}.i18n.ts` | `HomeHero.i18n.ts` |
| Stories | `{ModuleName}.stories.tsx` | `HomeHero.stories.tsx` |
| Main component | `{ModuleName}.main.tsx` | `HomeHero.main.tsx` |

## Adding New Modules

### Using CLI (Recommended)

```bash
npx harmony2 add
```

This will prompt you to select module type (UI or API) and enter a name.

### Store Integration

After creating a new SDK module, update `src/base-modules/sdk/store.ts`:

1. Import the module reducers and config
2. Add reducers to the `reducers` object
3. Add middleware if `config.withApi` is true

## Best Practices

### SDK Modules
- Keep API endpoints focused on a single domain
- Use `providesTags` and `invalidatesTags` for cache management
- Define all types in the `Types.ts` file

### UI Modules
- Keep the provider focused on connecting SDK to UI
- Put presentation logic in the main component
- Use context for data shared across sub-components

### General
- Use `@sdk` alias for importing from SDK
- Use `@common-components` for shared UI components
- Use `@msgs` for internationalization utilities

## Key Imports

```typescript
// SDK imports
import { useAppSelector, useAppDispatch, RootState } from '@sdk';
import { someApi, useSomeModule } from '@sdk';

// Common components
import { Button, Input, Modal } from '@common-components';

// Internationalization
import { FormattedAppMessage, useAppIntl } from '@msgs';

// Navigation
import { useAppNavigate } from '@sdk';
```

## Mock Service Worker (MSW)

API mocks are configured in `src/base-modules/mocks/handlers/`. Add new handlers for development/testing.
