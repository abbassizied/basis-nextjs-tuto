//****************//
#   useRouter    // 
//****************//
<hr>
- If you want to access the router object inside any function component in your app, you can use the useRouter hook.

```
import { useRouter } from 'next/router'
 
function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
 
export default ActiveLink
```


			
//***************************************************************************
## Navigating to pages/about.js, which is a predefined route:
//***************************************************************************
```
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}
```


//***************************************************************************
## Navigating pages/post/[pid].js, which is a dynamic route:
//***************************************************************************
```
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/post/abc')}>
      Click me
    </button>
  )
}
```


//***************************************************************************
## Resetting state after navigation
//***************************************************************************
```
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
 
export default function Page(props) {
  const router = useRouter()
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setCount(0)
  }, [router.query.slug])  
  
  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href="/one">one</Link> <Link href="/two">two</Link>
    </div>
  )
}
```


//***************************************************************************
## Navigate back in history.  			
//***************************************************************************
```
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  )
}
```


//*************************************************************************** 			
## Prefetch pages for faster client-side transitions. 
//*************************************************************************** 
- This is a production only feature. Next.js doesn't prefetch pages in development.
- Let's say you have a login page, and after a login, you redirect the user to the dashboard. For that case, we can prefetch the dashboard to make a faster transition, like in the following example:
```
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
 
export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
 
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])
 
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [router])
 
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```


//*************************************************************************** 			
## router.reload
//*************************************************************************** 
- Reload the current URL. Equivalent to clicking the browser’s refresh button. It executes window.location.reload().
``` 
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.reload()}>
      Click here to reload
    </button>
  )
}
```
<hr>	 		
