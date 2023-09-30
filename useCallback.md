# useCallback

- useCallback is a React Hook that lets you cache a function definition between re-renders.
```
const cachedFn = useCallback(fn, dependencies)

// fn: The function value that you want to cache. It can take any arguments and return any values. React will not call your function. The function is returned to you so you can decide when and whether to call it.
// dependencies: The list of all reactive values referenced inside of the fn code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the Object.is comparison algorithm.

/*
 * Returns :
 * On the initial render, useCallback returns the fn function you have passed.
 * During subsequent renders, it will either return an already stored fn  function from the last render (if the dependencies haven’t changed), or return the fn function you have passed during this render.
 */

```
- useCallback() should be used <b>when passing callbacks from the parent component to the child</b> and make sure always to add a list of dependencies, when the function should be recreated. If none of the passed dependencies changes, the hook returns memoized, or a cached version of the callback. If at least one of the dependencies changes, it returns a newly created callback. 

``` 
function Parent() {
  const memoizedCallback = React.useCallback(() => {}, []);

  return(
    <MemoizedChild callback={memoizedCallback} />
  );
}
// In this example, we have a memoized child component. That means, that component checks current and new props, and if they differ, the component re-renders.
const MemoizedChild = React.memo(({ callback }) => { ... });
```

- As a rule of thumb you should always specify dependencies, that are used in the callback, for example:
```
React.useCallback(() => {
  setPrice(amount, quantity)
}, [amount, quantity]);
```

- useCallback() will return a memoized callback. Normally, if you have a child component that receives a function prop, at each re-render of the parent component, this function will be re-executed; by using useCallback() you ensure that this function is only re-executed when any value on it's dependency array changes.
```
function ExampleChild({ callbackFunction }) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(value + 1)
  }, [callbackFunction]);

  return (<p>Child: {value}</p>);
}

function ExampleParent() {
  const [count, setCount] = React.useState(0);
  const [another, setAnother] = React.useState(0);
  
  const countCallback = React.useCallback(() => {
    return count;
  }, [count]);
  
  return (
    <div>
      <ExampleChild callbackFunction={countCallback} />
      <button onClick={() => setCount(count + 1)}>
        Change callback
      </button>
      
      <button onClick={() => setAnother(another + 1)}>
        Do not change callback
      </button>
    </div>
  )
}
```
