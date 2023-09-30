# useId

- useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.
- useId is a Hook, so you can only call it <b>at the top level of your component</b> or your own Hooks.
- useId <b>should not be used to generate keys in a list</b>.

```
import { useId } from 'react';

export default function Form() {
  const id = useId();
  return (
    <form>
      <label htmlFor={id + '-firstName'}>First Name:</label>
      <input id={id + '-firstName'} type="text" />
      <hr />
      <label htmlFor={id + '-lastName'}>Last Name:</label>
      <input id={id + '-lastName'} type="text" />
    </form>
  );
}
```


