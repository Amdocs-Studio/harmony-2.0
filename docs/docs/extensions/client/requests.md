# Requests - TO ALIGN TO NEW ARCHITECTURE

<b>Location</b>: `TBD!!` 

API Requests is one of the features coming from Harmony.<br/>
Requests class include the following methods:

### call
Call to API

<b>Parameters:</b>

config - axios config json.

<b>Usage</b>

import from `src/base/base-api/index.ts`
``` JS
request.call({
    method: 'post',
    baseURL: baseURL,
    url: 'users/login',
    data: data
});
```

### broadcastAction

Invoke action via websocket to every online client.

<b>Parameters:</b>

action - Action that you want to execute.

<b>Usage</b>

import from `client/base/api/requests.js`
``` JS
import {UserTypes} from '../redux/user';
requests.broadcastAction({type: UserTypes.FETCH_POSTS, payload: null});
```

## Requests Definitions File

<b>Location</b>: `client/requests/index.js`

In requests file we define all the requests calls and use it in sagas.
Harmony prefer to use one file to export requests definitions for Best Practice.

### Example Code

``` JS
createUser: (data) => {
    return request.call({
        method: 'post',
        baseURL: baseURL,
        url: '/users',
        data: data
    });
}
```

## API Call Options

In api call you can send in options some props to define error handler manually:
```typescript
    export interface CallOptions {
        unauthorized?: boolean; // true - will not send autorization token in the header for that API
        ignoreErrorHandler?: boolean; // ignore erorr handler for that API
        generalErrorInfo?: { errorCode: string; status: number }; // for this API, for ANY failed, return this error code and status
    }
```

<br />

Usage Example:

```typescript
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
	}, { unauthorized: true, generalErrorInfo: { errorCode: 'getDevicesFiledForSomeReason', status: 500 } })
```
