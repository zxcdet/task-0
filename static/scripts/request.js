document.getElementById('first-btn').addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json())
        .then(data => console.log(data));
})
document.getElementById('secons-btn').addEventListener("click", () => {
    fetch(`http://localhost:3000/api/data`).then(response => response.json())
        .then(data => console.log(data));
})
// class MyPromise {
//
//     constructor(callback) {
//         this.state = 'pending'
//         this.value = undefined
//         const resolve = (data) => {
//             this.state = 'fulfilled'
//             this.value = data
//         }
//         const reject = (err) => {
//             this.state = 'rejected'
//             this.value = err
//         }
//         callback(resolve, reject)
//     }
//     async then(onFullFiled, onRejected) {
//         return new MyPromise((resolve, reject) => {
//             switch (this.state) {
//                 case 'fulfilled':
//                     resolve(onFullFiled(this.value))
//                     break
//                 case 'rejected':
//                     reject(onRejected(this.value))
//                     break
//             }
//         })
//     }
// }
//
// async function useFakePr() {
//    try {
//        const result = await new MyPromise((resolve, reject) => {
//            setTimeout(() => {resolve('hello')}, 0)
//        })
//        console.log(result)
//    }
//    catch (error) {
//        console.log(error, 'err')
//    }
// }
//
// useFakePr()
// new Promise()