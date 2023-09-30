//************************************************************************************//
# Config-based Metadata options with generateMetadata and the static metadata object //
//************************************************************************************//	
===> https://nextjs.org/docs/app/api-reference/functions/generate-metadata

```
// only supported in Server Components.
// export "metadata object" or "generateMetadata function"

// layout.tsx / page.tsx

import { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: '...',
}
 
// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: '...',
  }
}
```

//***********************//
# The metadata object   //
//***********************//
```	
/*
 * app/layout.tsx
 */
import { Metadata } from 'next'
 
export const metadata: Metadata = { 
	title: { // Template object 
		template: '...', // used to add a prefix or a suffix to titles defined in child route segments.
		// a default is required when creating a template
		default: '...', // used to provide a fallback title to child route segments that don't define a title.
		absolute: '...', // used to provide a title that ignores "title.template" set in parent segments.
	},
	description: '...',
	keywords: ['Next.js', 'React', 'JavaScript'],
	authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
}

/*
 * app/about/page.tsx
 */
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About',
} 
export default function Page() {}
```


//*******************************//
# The generateMetadata function //
//*******************************//	
```
/*
 * app/products/[id]/page.tsx
 */ 
 
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
 
export default function Page({ params, searchParams }: Props) {} 
```
<hr/>