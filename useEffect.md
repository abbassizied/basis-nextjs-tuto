# useEffect

#### example 1
```
useEffect(() => {
    console.log("useEffect")
    const interval = setInterval(function () {
          fetchData()
    // make sure to catch any error
    .catch(console.error);
    }, 1000);
    // return optional function for cleanup
    // in this case, this cleanup fn is called every time count changes
    return () => {
        console.log("cleanup");
        clearInterval(interval);
    }
}, []);	
```


#### example 2
```
// the useEffect is only there to call `fetchData` at the right time
useEffect(() => {
  fetchData()
    // make sure to catch any error
    .catch(console.error);
}, [fetchData])	
```


#### example 3
```
useEffect(() => {
    const interval = setInterval(function () {
      setCount((prev) => prev + 1);
    }, 1000);
    // return optional function for cleanup
    // in this case acts like componentWillUnmount
    return () => clearInterval(interval);
}, []);	
```




