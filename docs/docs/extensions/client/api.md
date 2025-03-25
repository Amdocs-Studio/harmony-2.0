# Api calls


API Requests is one of the features coming from Harmony 2.0.<br/>
It is using the RTK Query's `createApi` functionality.<br/><br/>
It allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data. It generates an "API slice" structure that contains Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you.

### call
API creation 

##### Creation

``` typescript
import { createApi } from '@reduxjs/toolkit/query/react';

export const rbaApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'v1/rba',
	}),
	tagTypes: ['Rba'],
	endpoints: (build) => ({
		policies: build.query<RbaStateType['permissions'], void>({
			query() {
				return {
					url: '/policies',
					method: 'GET',
				};
			},
		}),
	})
});

```

##### Call the API

````typescript
const [ policies ] = rbaApi.useLazyPoliciesQuery();
policies().then(res => console.log(res));
````

## API Call Options

In api call you can send in options some props to define some handling. This will be done under extraOptions. Currently, ignoreSpinner is supported. For example:
```typescript
    export const rbaApi = createApi({
	reducerPath: config.apiSliceName,
	baseQuery: baseQueryImpl({
		baseUrl: 'v1/rba',
	}),
	tagTypes: ['Rba'],
	endpoints: (build) => ({
	    extraOptions: {
            ignoreSpinner: true,
        },
		policies: build.query<RbaStateType['permissions'], void>({
			query() {
				return {
					url: '/policies',
					method: 'GET',
				};
			},
		}),
	})
});
```


For more info, checkout the full documentation:
https://redux-toolkit.js.org/rtk-query/api/createApi 
