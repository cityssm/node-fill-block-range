# Fill Block Range


[![NPM Version](https://img.shields.io/npm/v/%40cityssm%2Ffill-block-range)](https://www.npmjs.com/package/@cityssm/fill-block-range)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-fill-block-range.svg/?label=active+issues&show_trend=true&token=Rs2LYe8H3u8yXkNAZfQ9MkT7)](https://app.deepsource.com/gh/cityssm/node-fill-block-range/)
[![codecov](https://codecov.io/gh/cityssm/node-fill-block-range/graph/badge.svg?token=ZJMRSBF945)](https://codecov.io/gh/cityssm/node-fill-block-range)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=cityssm_node-fill-block-range&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=cityssm_node-fill-block-range)

**Fills in a range of letters, numbers, or "Battleship-like" letter-number combinations.**

## Installation

```sh
npm install @cityssm/fill-block-range
```

## Usage

```javascript
import fillBlockRange from '@cityssm/fill-block-range'

console.log(fillBlockRange('01', '10'))
// => ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

console.log(fillBlockRange('A1', 'C3'))
// => ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']

console.log(fillBlockRange('5A', '5D'))
// => ['5A', '5B', '5C', '5D']
```

## Thanks

This package is made possible using two amazing packages.

- [fill-range](https://www.npmjs.com/package/fill-range)
- [just-cartesian-product](https://www.npmjs.com/package/just-cartesian-product)

## Related Projects from the City of Sault Ste. Marie

[**Sunrise Cemetery Management System (CMS)**](https://cityssm.github.io/sunrise-cms/)

- A web-based application to assist cemetery managers with managing their cemetery records.
- Uses `@cityssm/fill-block-range` to quickly generate blocks of burial sites.
