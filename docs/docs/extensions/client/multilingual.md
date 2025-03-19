# Multi-language support

i18n give you easy way to support with languages and Encapsulate all you titles and static strings in your application to one place and easily to rename or change it.

If you are not familiar with `i18n` and you are not sure what is it please read : 
<a style="font-weight: bold" href="https://en.wikipedia.org/wiki/Internationalization_and_localization" target="_blank">i18n</a>.<br/>


In Our boilerplate you can easily add and use i18n.<br/>
We will do it by using `react-intl` library.
If you are not familiar with `react-intl` please read: 
<a style="font-weight: bold" href="https://formatjs.github.io/docs/react-intl/" target="_blank">react-intl</a>.<br/>
To use i18n you need to crate a new Locale ts file, and it map it under `messages`

Once you have done with the mapping, the translator utility will be injected to the app, and you will be able to use it by passing the id of your message.

### Usage Example

#### Add translation index.ts file <span style="font-size: smaller;">( in the example we will use **en.ts** as the main language)</span>

```TS
import Devices from './DevicesMessages';

export default {
	Devices,
	AdditionsByFlags,
	Screens,
	Header,
	Common,
} as const;

```
#### Add translation files <span style="font-size: smaller;">( in the example DevicesMessages.ts)</span>
```TS
export default {
  deviceGallery: {
    pageTitle: 'gallery',
    addToCartButton: 'add to cart',
    removeFromCartButton: 'remove',
    priceTitle: 'price',
    clearCartButton: 'clear',
    checkoutButton: 'done',
    deviceCard: {
        // you can pass a parameter to the message
        deviceName: 'device name {name}',
        devicePrice: 'device price',
        deviceDescription: 'device description'
    } 
  },
  checkout: {
    pageTitle: 'done',
    totalPriceTitle: 'final price'
  }
}
```
#### If you have more than one language <span style="font-size: smaller;">( in the example **sp.ts**)</span>.
Notice, Once you declare it as satisfies MessagesStructure, if any message is missing, it will throw an error. 

```TS
import Devices from './DevicesMessages';

export default {
	Devices,
	AdditionsByFlags,
	Screens,
	Header,
	Common,
} as const satisfies MessagesStructure;
```

#### Add to array the language key <span style="font-size: smaller;">( 'en', 'sp' in this example)</span>
```TS
import enMessages from './en';
import spMessages from './sp';

// This will use enMessages as the "base" messages.
// Any other language can be declared as type MessagesStructure, to validate that all messages are present.
// For example, if you add a new language, in it's index.ts you can declare as:
// const messages: MessagesStructure = {
// ...  
export type MessagesStructure = MatchStructure<typeof enMessages, typeof enMessages>;

export type Locales = 'sp' | 'en';
export const messages: { [key in Locales]: MessagesStructure } = {
	sp: spMessages,
	en: enMessages
};

type MatchStructure<T, U> = {
	[K in keyof T]: K extends keyof U ? MatchStructure<T[K], U[K]> : never;
};
```


#### usage inside component

The following code show you how to use the messages inside your container.

```TS
import { useAppIntl } from '@msgs';
...
const Devices: React.FC = () => {
    const { formatMessage } = useAppIntl();
    ...
    <Container>
        <Row>
            <h1 id="page-header">{formatMessage({ id: 'deviceGallery.pageTitle'})}</h1>
        </Row>
        <br />
        <Form className="row">
            <Form.Group>
                <Form.Control
                <div>
                    {/* The json structere is flatten so you can use as below */}
                    {/* you can pass a parameter to the message if it has one */}
                    {formatMessage({ id: 'deviceGallery.deviceCard.deviceName'}, { name: 'iPhone 12'})}
                </div>
                ...
                ...
```
