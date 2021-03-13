<p align="center">     <h1>This is the simplest methods for parse and stringify query with filter undefined values and convert types</h1> </p>

```javascript
npm install --save w-queryfy
```

```javascript
import { queryStringify, queryParse } from 'w-queryfy';

// foo=bar&bar=foo
const queryfyObj = queryStringify({ 
  foo: 'bar', 
  bar: 'foo', 
  anyName: undefined,
});

// { foo: bar, bar: foo, name: false }
const parsedQuery = queryParse('foo=bar&bar=foo&name=false&none=undefined');
```
