# Formatting the Date

- To format the date, we’ll use the date-fns library. First, install it:
```
npm install date-fns
```

- create a file called components/date.js
```
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
```

- "/posts/[id].ts"
```
// Add this import
import Date from '@components/date';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  );
}
```
