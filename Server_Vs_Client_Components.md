#  Server Vs Client Components

<hr/>
# Server Components
- Instead of React rendering your whole application client-side (such as in the case of Single-Page Applications), React now gives you the flexibility to choose where to render your components based on their purpose.
- Server Components make writing a React application feel similar to PHP or Ruby on Rails, but with the power and flexibility of React and the components model for templating UI.
- All components inside the App Router are Server Components by default.
- You can also optionally opt-in to Client Components using the 'use client' directive.

```
// XXX is a Client Component
import XXX from './XXX'
// YYY is a Server Component
import YYY from './YYY'

 
// ZZZ is a Server Component by default
export default function ZZZ({ children }: { children: React.ReactNode }) {
  return (
	<>
		<YYY />
		<XXX />
		{children}
	</>
  )
}
 
``` 
 
### Nesting Server Components inside Client Components

#### Unsupported Pattern: Importing Server Components into Client Components
```
'use client'
 
// This pattern will **not** work!
// You cannot import a Server Component into a Client Component.
import ExampleServerComponent from './example-server-component'
 
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      <ExampleServerComponent />
    </>
  )
}
```

#### Recommended Pattern: Passing Server Components to Client Components as Props
- When designing Client Components you can use React props to mark "slots" for Server Components ==> <b>A common pattern is to use the React children prop to create the "slot".</b>
- The Server Component will be rendered on the server, and when the Client Component is rendered on the client, the "slot" will be filled in with the rendered result of the Server Component.
```
/*
 * app/example-client-component.tsx
 * We can refactor <ExampleClientComponent> to accept a generic children prop and move the import and explicit nesting of <ExampleClientComponent> up to a parent component.
 */
 
'use client'
 
import { useState } from 'react'
 
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      {children}
    </>
  )
}
 
``` 

```
/*
 * app/page.tsx
 * <ExampleClientComponent> has no knowledge of what children is.
 * The only responsibility ExampleClientComponent has is to decide where whatever children will eventually be placed.
 * In a parent Server Component, you can import both the <ExampleClientComponent> and <ExampleServerComponent> and pass <ExampleServerComponent> as a child of <ExampleClientComponent>
 *
 *
 */
 
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ExampleClientComponent from './example-client-component'
import ExampleServerComponent from './example-server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ExampleClientComponent>
      <ExampleServerComponent />
    </ExampleClientComponent>
  )
}
 
``` 
 
#### Passing props from Server to Client Components (Serialization)
- Props passed from the Server to Client Components need to be serializable. This means that values such as functions, Dates, etc, cannot be passed directly to Client Components.

#### Keeping Server-Only Code out of Client Components (Poisoning)
- The "server only" package: use this package to mark modules that contain server-only code and to receive a build-time error explaining that this module can only be used on the server. 
``` 
npm install server-only // To prevent unintended client usage of server code 

// Then
import 'server-only'
``` 
- The "client only" package: use this package to mark modules that contain client-only code and to receive a build-time error explaining that this module can only be used on the client.
``` 
npm install client-only // To prevent unintended server usage of client code 

// Then
import 'client-only'
``` 

#### Data Fetching
- Although it's possible to fetch data in Client Components, we recommend fetching data in Server Components unless you have a specific reason for fetching data on the client.

 
 
<hr/> 
# Client Components
- Client Components are <b>pre-rendered</b> on the server and <b>hydrated</b> on the client. 
- Once "use client" is defined in a file, all other modules imported into it, including child components, are considered part of the client bundle.
- The "use client" directive must be defined at the top of a file before any imports.
- "use client" does not need to be defined in every file. The Client module boundary only needs to be defined once, at the "entry point", for all modules imported into it to be considered a Client Component.
- <b>Moving Client Components to the Leaves</b>

```
'use client'
```  