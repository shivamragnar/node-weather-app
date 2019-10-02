console.log('Client side javascript loaded ')

let weatherForm = document.querySelector('form')
let search = document.querySelector('input')

let message1 = document.querySelector('#message-1')
let message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    console.log('testing', search.value)
    fetch('http://localhost:3000/weather?address='+ search.value)
    .then((res) => {
        res.json().then((data) => {
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }
            else{
                console.log(data.location)
                console.log(data.forecastData)
                message1.textContent = data.location
                message2.textContent = data.forecastData
            }
        })
    })
})