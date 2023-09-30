# Image Optimization

- The Next.js Image component extends the HTML <img> element with features for automatic image optimization.
- To safely allow optimizing images, define a list of supported URL patterns in <b>next.config.ts</b>.
```
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**', <----- will only allow images from a specific AWS S3 bucket
      },
    ],
  },
}
``` 

## Usage : Local Images
- To use a local image, import your .jpg, .png, or .webp image files.
- Warning: Dynamic await import() or require() are not supported. The import must be static so it can be analyzed at build time.
```
/*
 * app/page.js
 */

import Image from 'next/image'
import profilePic from './me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```


## Usage : Remote Images
- To use a remote image, the src property should be a URL string.
- Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually.
- 
```
/*
 * app/page.js
 */
 
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
} 
```