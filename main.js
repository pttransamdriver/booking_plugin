document.addEventListener("DOMContentLoaded", function() {
    const root = document.getElementById("plugin-root");
    const element = document.createElement("div");
    element.textContent = "Hello, this is your plugin!";
    root.appendChild(element);
});

const { useState } = React;

document.addEventListener("DOMContentLoaded", function() {
    const root = document.getElementById("plugin-root");
    ReactDOM.render(<App />, root);
});

function App() {
    const [message, setMessage] = useState("Hello, this is your React plugin!");

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => setMessage("You've clicked the button!")}>Click me</button>
        </div>
    );
}


