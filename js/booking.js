let stays = document.getElementsByClassName("stays")[0]
let flights = document.getElementsByClassName("flights")[0]
let cars = document.getElementsByClassName("cars")[0]
let packages = document.getElementsByClassName("packages")[0]
let things = document.getElementsByClassName("things")[0]
let staysIcon = document.getElementsByClassName("stays-icon")[0]
let flightsIcon = document.getElementsByClassName("flights-icon")[0]
let carsIcon = document.getElementsByClassName("cars-icon")[0]
let packagesIcon = document.getElementsByClassName("packages-icon")[0]
let thingsIcon = document.getElementsByClassName("things-icon")[0]
function showStays(){
    stays.style.display = 'block'
    flights.style.display = 'none'
    cars.style.display = 'none'
    packages.style.display = 'none'
    things.style.display = 'none'
    staysIcon.style.color = 'royalblue'
    flightsIcon.style.color = 'black'
    carsIcon.style.color = 'black'
    packagesIcon.style.color = 'black'
    thingsIcon.style.color = 'black'
}
function showFlights(){
    stays.style.display = 'none'
    flights.style.display = 'block'
    cars.style.display = 'none'
    packages.style.display = 'none'
    things.style.display = 'none'
    staysIcon.style.color = 'black'
    flightsIcon.style.color = 'royalblue'
    carsIcon.style.color = 'black'
    packagesIcon.style.color = 'black'
    thingsIcon.style.color = 'black'
}
function showCars(){
    stays.style.display = 'none'
    flights.style.display = 'none'
    cars.style.display = 'block'
    packages.style.display = 'none'
    things.style.display = 'none'
    staysIcon.style.color = 'black'
    flightsIcon.style.color = 'black'
    carsIcon.style.color = 'royalblue'
    packagesIcon.style.color = 'black'
    thingsIcon.style.color = 'black'
}
function showPackages(){
    stays.style.display = 'none'
    flights.style.display = 'none'
    cars.style.display = 'none'
    packages.style.display = 'block'
    things.style.display = 'none'
    staysIcon.style.color = 'black'
    flightsIcon.style.color = 'black'
    carsIcon.style.color = 'black'
    packagesIcon.style.color = 'royalblue'
    thingsIcon.style.color = 'black'
}
function showThings(){
    stays.style.display = 'none'
    flights.style.display = 'none'
    cars.style.display = 'none'
    packages.style.display = 'none'
    things.style.display = 'block'
    staysIcon.style.color = 'black'
    flightsIcon.style.color = 'black'
    carsIcon.style.color = 'black'
    packagesIcon.style.color = 'black'
    thingsIcon.style.color = 'royalblue'
}
function flightReturn(){
    document.getElementsByClassName("flights__returning")[0].style.display = 'flex'
    document.getElementsByClassName("flights__departing")[0].style.width = 'max-content'
}
function flightOneWay(){
    document.getElementsByClassName("flights__returning")[0].style.display = 'none'
    document.getElementsByClassName("flights__departing")[0].style.width = '300px'
}