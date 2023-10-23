const right_car = document.querySelector('#right_car');
const left_car = document.querySelector('#left_car');
const center_car = document.querySelector('#center_car');
const bottom_car = document.querySelector('#bottom_car');


window.addEventListener('scroll', () =>{
    let value = scrollY;

    right_car.style.right = `${300+value/3}px`;
    left_car.style.left = `${value/3}px`;
    center_car.style.height = `${40+value/2.5}px`;
    bottom_car.style.height = `${(400 - value/2.5)}px`;

})