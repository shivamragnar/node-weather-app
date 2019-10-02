console.log('Client side javascript loaded ')

let weatherForm = document.querySelector('form')
let search = document.querySelector('input')

let message1 = document.querySelector('#message-1')
let message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address='+ search.value)
    .then((res) => {
        res.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecastData
            }
        })
    })
})