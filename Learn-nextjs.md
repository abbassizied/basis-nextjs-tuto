# Next.JS

## Object property with dot notation 
```
function Header(props) {
  return <h1>{props.title}</h1>;
}
```
## A template literal 
```
function Header({ title }) {
  return <h1>{`Cool ${title}`}</h1>;
}
```
## Returned value of a function 
```
function createTitle(title) {
  if (title) {
    return title;
  } else {
    return 'Default title';
  }
}

function Header({ title }) {
  return <h1>{createTitle(title)}</h1>;
}
```
## Ternary operators 
```
function Header({ title }) {
  return <h1>{title ? title : 'Default Title'}</h1>;
}
```

## Iterating through lists 
```
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Vocabs
- <b>Compiling</b> refers to the process of taking code in one language and outputting it in another language or another version of that language.
- <b></b>Minification is the process of removing unnecessary code formatting and comments without changing the code’s functionality. The goal is to improve the application’s performance by decreasing file sizes.
- <b>Bundling</b> is the process of resolving the web of dependencies and merging (or ‘packaging’) the files (or modules) into optimized bundles for the browser, with the goal of reducing the number of requests for files when a user visits a web page.
- <b>Code-splitting</b> is the process of splitting the application’s bundle into smaller chunks required by each entry point. The goal is to improve the application's initial load time by only loading the code required to run that page.
- <b>Build time (or build step)</b> is the name given to a series of steps that prepare your application code for production.
- <b>Runtime (or request time)</b> refers to the period of time when your application runs in response to a user’s request, after your application has been built and deployed.


## SSG/ getStaticProps() 
```
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
	<>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>	
	</>
  )
}

```

## Implement getStaticProps
```
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```


## SSR/ getServerSideProps() 
```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}

```

## Fetch External API or Query Database
```
//  In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external API endpoint

export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

// In development (npm run dev or yarn dev), getStaticPaths runs on every request.
// In production, getStaticPaths runs at build time.
// 
```

