const Counter2 = () => {
    const [count, setCount] = React.useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>increment</button>
        </div>
    );
};

// export default Counter2;
// export { Counter2 };