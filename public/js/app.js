
console.log('Javascript from public directory');

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

async function getForecast(location)
{
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const response = await fetch(`http://localhost:3000/weather?address=${location}`);
    const data = await response.json();
    if(data.error)
    messageOne.textContent = (`Error: ${data.error}`);
    else
    {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.response;
    }
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    getForecast(search.value);
})