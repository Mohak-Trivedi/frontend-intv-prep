// React rendering Process can be divided into 2 parts:
// - Rendering Phase (during initial render or re-render)
// -- JSX -> React Element -> Virtual DOM update
// - Committing Phase 
// -- Virtual DOM -> Actual DOM

// Reconciliation is the process that happens between 2 phases of rendering, and
// it uses the Diffing Algorithm to identify which node of the VDOM has to be
// updated by comparing state.

// Why use VDOM w/ Diffing Algo instead of directly updating the Actual DOM?
// Cost of generating VDOM (the react element object) < Cost of repainting the
// entire page by updating the entire actual DOM.
// Thus, React uses the VDOM to reduce the excess cost that is incurred from
// repainting the entire page. Creating and comparing two trees of React elements
// is simple and enables to identify the subset of elements/nodes to be updated
// and updates only those in the actual DOM rather than updating the entire 
// actual DOM and repainting the whole page.

// But, suppose we have 100s of elements in our tree, then we will require rougly
// 10 millions of comparisons as multiple trees would be generated as per different
// changes i.e. O(N ^ 3) time complexity. So, how does React's Diffing Algo work 
// to ensure that all the required comparisons are made and the speed is good as
// well?
// The Diffing Algo makes an assumption: If a particular element has changed in the
// tree, all of elements inside of it have also changed.


function Counter () {
    const [count, setCount] = React.useState(0);

    // let count1 = 0;
    // Use a state instead of a variable for a value changing across renders, else
    // the value gets updated but isn't reflected in the UI as changing of
    // a variable doesn't cause an automatic re-render of the component.

    const increment = () => {
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        // Async nature of state updates:
        // The value of count is updated by +1 not +5 even after going through
        // above 5 updates as each of the update receive count as current value
        // only as no update of count happens instantaneously rather after
        // going through the entire code.

        // Use the below approach if you want the updated value to be received 
        // by each of the setCount().
        // Since we pass a function, we are sure that function will get completely
        // executed by setCount() and thus before we reach the next setCount, we
        // alredy have the updated value of the count instead of the current
        // count.
        setCount((prevValue) => prevValue + 1);
        setCount((prevValue) => prevValue + 1);
        setCount((prevValue) => prevValue + 1);
        setCount((prevValue) => prevValue + 1);
        setCount((prevValue) => prevValue + 1);
    };
    // console.log('Count Rendered', counter);

    // const counter = React.createElement(
    //     "div", 
    //     null, 
    //     React.createElement("p", null, `Count: ${count}`),
    //     React.createElement("button", {onClick: increment}, `Increment`)
    // );

    // return counter;

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

const CounterParent = () => {
    const [showMessage, setShowMessage] = React.useState(false);
    const [showMessage2, setShowMessage2] = React.useState(false);
    const [toggleCount, settoggleCount] = React.useState(false);

    console.log('Parent Rendered');

    const toggleMessages = () => {
        setShowMessage(!showMessage);
        setShowMessage2(!showMessage2); 
    }

    return <div>
        {toggleCount ? (<div>
            <h1>Counter</h1>
            <Counter />
        </div>) : (
            <span>
                <p>Counter off</p>
            </span>
        )}
        <button onClick={() => settoggleCount(!toggleCount)}>Toggle Counter</button>
        <br />
        {showMessage && <b>Now you see me</b>}
        {showMessage2 && <b>Now you see me again</b>}
        <button onClick={() => toggleMessages()}>Show Message</button>
        <br />
        <Frameworks />
    </div>
}

const Frameworks = () => {
    const [frameworks, setFrameworks] = React.useState([
        {id: 166, name: "React"}, 
        {id: 321, name: "Angular"}
    ]);

    return (
        <div>
            <h3>Popular Frameworks</h3>
            <div>
                {frameworks.map((item, index) => (
                    <p key={item.id}>{item.name}</p>
                ))}
            </div>
            <button onClick={() => setFrameworks([{id: 888, name: "Vue"}, ...frameworks])}>
                Add New
            </button>
        </div>
    );
}

// Why use keys when rendering lists as done above?
// If we don't have keys, and initial list:
// React
// Angular
// And then we choose to add Vue as last list element, then only Vue will be
// added to Actual DOM.
// But, if we chose to add it as the first list element, then entire list will
// be re-added to Actual DOM:
// Vue
// React
// Angular
// even though React and Angular were the same list items.
// This is because, Diffing Algo will see Vue does not match with React, so it 
// is a new list and chooses to re-render entire list.
// If we assign a unique non-changing key to each list item, then this can be 
// prevented and only Vue will be added to the actual DOM.

// Why not use array index as keys?
// They are unique, but are changeable.
// Initially:
// React 0
// Angular 1
// Now, if we want to add Vue at start, then:
// Vue 0
// React 1
// Angular 2
// As we can see the key values for all the list items get changed when we
// try to add a new item at the start of the list and this leads to 
// re-rendering the entire list, which is something we were trying to avoid
// through the keys.
// Instead, use unique constant ids:
// React 166
// Angular 321
// Now, add Vue 450 to start:
// Vue 450
// React 166
// Angular 321
// Now, through keys React identifies that only Vue is new and just adds that
// to the actual DOM.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(CounterParent));