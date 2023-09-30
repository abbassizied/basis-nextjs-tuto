 
- A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName].
- Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.
- Dynamic Segments can be catched-all subsequent segments by adding an ellipsis inside the brackets [...folderName].
```
==> Route : app/shop/[...folderName]/page.js	
==> Example : /shop/a/b/c
==> URL	params : { folderName: ['a', 'b', 'c'] }
```
- Catch-all Segments can be made optional : [[...folderName]]
```
==> Route : app/shop/[[...folderName]]/page.js	
==> Example : /shop/a/b/c
==> URL	params : { folderName: ['a', 'b', 'c'] }
```
- The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched (/shop in the example above).
 
```
/*
 *
==> Route : app/blog/[slug]/page.js 	
==> params Type Definition : { slug: string }
 *
 *

==> Route : app/shop/[...slug]/page.js	
==> params Type Definition : { slug: string[] }  
 *
 *

==> Route : app/[categoryId]/[itemId]/page.js	
==> params Type Definition : { categoryId: string, itemId: string }  
 *
 */ 
 
/*
 * route : app/blog/[folderName]/page.tsx
 * the Dynamic Segment for blog posts : [folderName]
 */

export default function Page({ params }: { params: { folderName: string } }) {
  return <div>My Post: {params.folderName}</div>
}
```

<hr>	
===> https://nextjs.org/docs/app/api-reference/functions/generate-static-params
	
- To statically generate routes at build time instead of on-demand at request time, use "generateStaticParams" function in combination with dynamic route segments.
```
/*
 * route : app/blog/[slug]/page.js 
 */
// 

// Return a list of `params` to populate the [slug] dynamic segment : return { slug: string }[]
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```
- During next dev, generateStaticParams will be called when you navigate to a route.
- During next build, generateStaticParams runs before the corresponding Layouts or Pages are generated.
- During revalidation (ISR), generateStaticParams will not be called again.
- generateStaticParams should return an array of objects where each object represents the populated dynamic segments of a single route. 
<hr>		