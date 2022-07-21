# newman-assert-json-template

## Getting Started

This package is used to compare two jsons in postman. 

## How to use

Add pre-request script to your postman collection:

```js
window = {};

pm.sendRequest(`https://unpkg.com/newman-assert-json-template@1.0.6/assertJsonTemplate.js`, (err, res) => {
    var text = res.text();
    window.assertJsonTemplate = eval(text);
});
```

**Remember!** `pm.sendRequest()` must contain the latest version of the image.

### Positive case

For example `pm.response.json()`:
```json
{
    "key0": "0",
    "key1": "1",
    "key2": "2",
    "key3": "3"
}
```

Test case for the request to compare two jsons:
```js
const data = {
    "key0": "0",
    "key2": "2"
}

pm.test("Example test", () => {
    window.assertJsonTemplate(pm.response.json(), data);
})
```

The test results will look like this:
```
PASS Example test
```

### Negative case

For example `pm.response.json()`:
```json
{
    "key0": "0",
    "key1": "1",
    "key2": "2",
    "key3": "3"
}
```

Test case for the request to compare two jsons:
```js
const data = {
    "key0": "0",
    "key2": "6"
}

pm.test("Example test", () => {
    window.assertJsonTemplate(pm.response.json(), data);
})
```

The test results will look like this:
```
FAIL Example test | AssertionError: expected '2' to deeply equal '6'
```
