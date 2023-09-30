#Rendering


<hr/>
//***************************************************************************
//***************************************************************************			
## Static Site Generation (SSG) 

- If a page uses Static Generation, the page HTML is generated at build time. 
- In Next.js, you can statically generate pages with or without data.

## Static Generation without data ( The default behavior)
```
/*
 * By default, Next.js pre-renders pages using Static Generation without fetching data.
 */
 
function About() {
  return <div>About</div>
}
 
export default About
 
```


## Static Generation with data

### Scenario 1: Your "page content" depends on external data
```
/*
 * xxxxxxxxxxxxx
 */
 
export default function Blog({ posts }) {
  // Render posts...
}
 
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
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

### Scenario 2: Your "page paths" depend on external data
- create pages with <b>dynamic routes</b>.
- use <b>getStaticPaths</b> from your dynamic page.  
- This function gets called at build time and lets you specify which paths you want to pre-render.
- Also in your dynamic page, you need to export <b>getStaticProps</b> so that you can fetch the data and use it to pre-render the page.
```
/*
 * pages/posts/[id]/page.ts
 * 
 * 
 */
 
export default function Post({ post }) {
  // Render post...
}


/*
 * 
 */  
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


/*
 * 
 */ 
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  // Pass post data to the page via props
  return { props: { post } }
}
 
``` 

<hr/>
//***************************************************************************
//***************************************************************************		
# Incremental Static Regeneration (ISR)
- Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. 
- With ISR, you can retain the benefits of static while scaling to millions of pages.
 
## To use ISR, add the revalidate prop to getStaticProps.
```
/*
 * xxxxxxxxxxxxx
 */
 
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
 
export default Blog
 
``` 
 



## Using On-Demand Revalidation
```
/*
 * /api/revalidate.js
 * add the secret as an Environment Variable to your application. 
 */
 
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
 
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/path-to-revalidate')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
 
``` 


<hr/>
//***************************************************************************
//***************************************************************************
# Server-side Rendering (SSR)

- Also referred to as "SSR" or "Dynamic Rendering". 
- If a page uses Server-side Rendering, the page HTML is generated on each request.
- To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. 
- getServerSideProps will be called by the server on every request.
- getServerSideProps is similar to getStaticProps, but the difference is that getServerSideProps is run on every request instead of on build time.  


##
```
/*
 * To fetch from an external API.
 * Use getServerSideProps to fetch this data and pass it to Page like below:
 */
 
export default function Page({ data }) {
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
 
``` 
