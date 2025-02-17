# jiti-class-properties-issue

Reproduction for jiti issue with legacy class properties decorators

# The problem

Jiti fails to run code with TS legacy decorators on properties if they're not initialized in constructor.
Such code is valid and you may see it in server-side projects, such as those using [`Mikro ORM`](https://mikro-orm.io/).

Here's typical example for Mikro ORM entity:

```ts
import {Entity, PrimaryKey, Property} from "@mikro-orm/core"

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property()
  fullName!: string

  @Property()
  email!: string

  @Property()
  password!: string

  @Property({type: "text"})
  bio = ""
}
```

## Reproduction

1. Clone this repo
2. Install dependencies via `pnpm i`
3. Run `node --import jiti/register .`

Once you run step 3, You'll see this error:

```
node:internal/modules/run_main:104
    triggerUncaughtException(
    ^

[Error: TRANSFORM_ERROR: Definitely assigned fields cannot be initialized here, but only in the constructor
 jiti-class-properties-issue/issue.ts:0:0]

Node.js v23.7.0
```

To verify this code works in `tsc`, you can compile the module via `pnpm tsc`
command and see that it outputs `issue.js` file as expected.
You can run it via `node issue.js` to verify that everything works.

This project also includes [`tsimp`](https://npmjs.com/package/tsimp) (which is using tsc under the hood), [`@swc-node/register`](https://npmjs.com/package/@swc-node/register) and [`tsx`](https://npmjs.com/package/tsx).
Here's how you can verify that this code runs with each of these packages:

* tsimp: `node --import tsimp .`
* tsx: `node --import tsx .`
* swc-node: `node --import @swc-node/register/esm-register .`

When you run these commands, you'll see following output for each:

```js
{ target: {}, key: 'a' }
```
