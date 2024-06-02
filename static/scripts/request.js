document.getElementById('first-btn').addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json())
        .then(data => console.log(data));
})
document.getElementById('second-btn').addEventListener("click", () => {
    fetch(`http://127.0.0.1:3000/api/data`).then(response => response.json())
        .then(data => console.log(data));
})
