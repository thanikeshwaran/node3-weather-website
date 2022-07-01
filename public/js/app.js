// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//      console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//           if(data.error) {
//             console.log(data.error);
//           } else {
//             console.log(data.location);
//             console.log(data.forecast);
//             console.log(data.address);
//           }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1'); // id selector
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // to prevent the default behaviour of the form. otherwise,
    // form will submit and refresh the page
    const location = search.value;
    // const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
    const url = '/weather?address=' + encodeURIComponent(location);
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    fetch(url).then((response) => {
    response.json().then((data) => {
          if(data.error) {
            messageOne.textContent = data.error
            // console.log(data.error);
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            // console.log(data.location);
            // console.log(data.forecast);
            // console.log(data.address);
          }
    })
})
} ) 
// First argument (event listener) - The name of the event we are trying to listen for. 
// Dozens of different events that are supported
// Second argument - callback function that runs every single time that event occurs
