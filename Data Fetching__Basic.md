//*************************************************************************** 			
# getStaticProps (Static Site Generation) 
//*************************************************************************** 
- getStaticProps always runs on the server and never on the client.
- getStaticProps always runs during next build
- you can write the server-side code ( like writing direct database queries) directly in getStaticProps.
- getStaticProps can only be exported from a page file.
- you must use export getStaticProps as a "standalone function".

## Using getStaticProps to fetch data from a CMS
```
/*
 * pages/blog.tsx
 */
// posts will be populated at build time by getStaticProps()
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
} 
 
```

## Using getStaticProps to write server-side code directly
```
/*
 * lib/load-posts.js
 */
// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadPosts() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts/')
  const data = await res.json()
 
  return data
}


/*
 * pages/blog.js
 */
// pages/blog.js
import { loadPosts } from '../lib/load-posts'
 
// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadPosts()
 
  // Props returned will be passed to the page component
  return { props: { posts } }
} 

```

//***************************************************************************
# getServerSideProps
//*************************************************************************** 

- getServerSideProps only runs on server-side and never runs on the browser.
- getServerSideProps returns JSON which will be used to render the page. 
- you must export getServerSideProps as a standalone function.

## Using getServerSideProps to fetch data at request time
```
/*
 * How to fetch data at request time and pre-render the result.
 */ 
 
function Page({ data }) {
  // Render data...
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
 
export default Page
 
``` 
 
//*************************************************************************** 			
# Client-side Fetching
//*************************************************************************** 
- Unlike the server-side rendering APIs, you can use client-side data fetching at the component level.

## Client-side data fetching with useEffect
```
import { useState, useEffect } from 'react'
 
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
 
``` 
 
//*************************************************************************** 			
# Building Forms
//*************************************************************************** 

## Form Submission without JavaScript
```
/*
 * API endpoint: "http://localhost:3000/api/form"
 * The for attribute is changed to htmlFor. (Since for is a keyword associated with the "for" loop in JavaScript, React elements use htmlFor instead.)
 * You'll be redirected to the "/api/form" endpoint since that's how form action works.
 *
 * To improve the experience here, as a response you can redirect the user to a page and thank them for submitting the form.
 */
export default function PageWithoutJSbasedForm() {
  return (
    <form action="/api/form" method="post">
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />
 
      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />
 
      <button type="submit">Submit</button>
    </form>
  )
}


/*
 * Go to "app/src/api/form/route.ts"
 * This form handler function will receive the request req from the client (i.e. submitted form data).
 * In return, it'll send a response res as JSON that will have both the first and the last name. 
 */
export async function POST(req: Request, res: Response) {
  // Get data submitted in request's body.
  const body = req.body
 
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)
 
  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'First or last name not found' })
  }
 
  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.first} ${body.last}` })
} 
 
``` 
 
 
 
 
## Form Submission with JavaScript Enabled
```
/*
 * we use JSON.stringify(data) to convert the data to JSON.
 * Server sends back a response with the name submitted. 
 */
 
export default function PageWithJSbasedForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
 
    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    }
 
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
 
    // API endpoint where we send form data.
    const endpoint = '/api/form'
 
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
 
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
 
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />
 
      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />
 
      <button type="submit">Submit</button>
    </form>
  )
}
 
``` 



//***************************************************************************
//***************************************************************************
//***************************************************************************
