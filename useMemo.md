# useMemo

- useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
```
useMemo(calculateValue, dependencies)
```

- It will run on every render, but with cached values. It will only use new values when certain dependencies change. It's used for optimization when you have expensive computation. 
```
function ExampleChild({ value }) {
   const [childValue, setChildValue] = React.useState(0);

   React.useEffect(() => {
     setChildValue(childValue + 1);
   }, [value])

   return <p>Child value: {childValue}</p>;
}

function ExampleParent() {
  const [value, setValue] = React.useState(0);
  const heavyProcessing = () => {
    // Do some heavy processing with the parameter
    console.log(`Cached memo: ${value}`);
    return value;
  };

  const memoizedResult = React.useMemo(heavyProcessing, [value]);
  
  return (
    <div>
      <ExampleChild value={memoizedResult} />
      <button onClick={() => setValue(value + 1)}>
        Change memo
      </button>
    </div>
  )
}
```

