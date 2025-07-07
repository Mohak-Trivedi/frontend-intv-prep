const products = [
  {id: 1, name: "Product A", price: 20, category: "Electronics"},
  {id: 2, name: "Product B", price: 30, category: "Clothing"},
  {id: 3, name: "Product C", price: 15, category: "Electronics"},
  {id: 4, name: "Product D", price: 25, category: "Clothing"},
  {id: 5, name: "Product E", price: 50, category: "Electronics"},
  {id: 6, name: "Product F", price: 40, category: "Electronics"},
];

const names = ["Alice", "Bob", "Alice", "Charlie", "Bob"];

function App () {
    return (
        <div>
            <h2>Rendering Lists and Conditional Operators</h2>
            <h5>
                Question 1: How does the map function work in React for rendering lists?
                Can you provide an example?
            </h5>
            {/* - Commonly used to iterate through an array and render components 
            dynamically.
            - It allows you to create a new array of React elements based on the 
            original array.
            - [ show e.g. ] */}
            <ul>
                {products.map((product) => {
                    return <li key={product.id}><strong>{product.name}</strong> - {product.price} - Category:{" "} {product.category}</li>
                })}
                {/* We can replace the out {} with (), and also remove return. 
                Because callback function in map() is an arrow function, and 
                arrow functions have implcit return.*/}
                {/* {products.map((product) => (
                    <li><strong>{product.name}</strong> - {product.price} - Category:{" "} {product.category}</li>
                ))} */}
            </ul>
            <h5>
                Question 2: How can you filter products with a specific product 
                category?
            </h5>
            <ul>
                {products.filter((product) => {
                    return product.category === "Electronics";
                }).map((product) => {
                    return <li key={product.id}><strong>{product.name}</strong> - {product.price} - Category:{" "} {product.category}</li>
                })}
            </ul>
            <h5>
                Question 3: How can you render a summary of total prices of products?
            </h5>
            <div>
                <p>Total Price Summary: {products.reduce((acc, product) => {
                    return acc + product.price;
                }, 0)}
                </p>
            </div>
            <h5>
                Question 4: Add discountedPrice key with 10% discount to all the 
                products with price more than 20 and render it.
            </h5>
            <ul>
                {products
                    .filter((product) => product.price > 20)
                    .map((product) => {
                        return {...product, discountedPrice: product.price - product.price*(10/100)};
                    })
                    .map((product) => {
                        return <li key={product.id}><strong>{product.name}</strong> - {product.discountedPrice} - Discounted from:{" "} {product.price}</li>
                    })
                }
            </ul>
            <h5>
                Question 5: How can you filter and render unique elements from an
                array using filter in React?
            </h5>
            <ul>
                {names.filter((name, idx) => {
                    return names.indexOf(name) === idx;
                }).map((name) => {
                    return <li>{name}</li>
                })}
            </ul>
            {/* Conditional Operators */}
            <h5>Question 6: Difference between && and ||</h5>
            {/* - && both operands must be true to evaluate as true, else evaluates as false
            - || both operands must be false to evaluate as false, else evaluates as true
            - [show e.g. of both] */}
            <LogicalAnd />
            <LogicalOr />
            <h5>Question 7: Difference between .? (optional chaining) and ?? (nullish coalescing)</h5>
            {/* - [show e.g.] */}
            <OptionalChaining />
            <NullishCoalescing />
        </div>
        
    );
}

const OptionalChaining = () => {
    let user = {
        name: "John",
        // address: {
        //     city: "New York"
        // },
    };

    // return <p>{user.address.city}</p> // No issues if address exists, but we get
    // Uncaught TypeError: Cannot read properties of undefined (reading 'city')
    // if it doesn't exist. Hence, use checks:
    // return user && user.address && <p>{user.address.city}</p>;
    // More compact by using optional chaining:
    return <p>{user?.address?.city}</p>
}

const NullishCoalescing = () => {
    let userInput = null;
    let defaultValue = "Hello, default value!";

    // if userInput is not falsy render it else render default value. Using  ternary operator:
    // return <p>{ userInput ? userInput : defaultValue }</p>
    // more compact, using Nullish Coalescing:
    return <p>{userInput ?? defaultValue}</p>
}

const LogicalAnd = () => {
    let x = 5;
    let y = 10;

    if (x > 0 && y > 0) {
        return <span>Both are greater than 0</span>
    } else {
        return <></>;
    }
} 

const LogicalOr = () => {
    let isRaining = false;
    let isSunny = true;

    if(isRaining  || isSunny) {
        return <span>It's either rainy or sunny or both!</span>
    } else {
        return <></>
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);