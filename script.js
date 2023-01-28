window.onload = function(){
    //значения при инициализации
    init(5,100)
    slideOne()
    slideTwo()
    //значения после инициализации
    setTimeout(() => {
        init(4,30)
    }, 3000)
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;


function init(a, b) {
    inputOne(a)
    inputTwo(b)
}

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value);
    }
    displayValOne.value = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value);
    }
    displayValTwo.value = sliderTwo.value;
    fillColor();
}

function inputOne(a){
    if (a) {
        displayValOne.value = a
    }
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    sliderOne.value = displayValOne.value;
    fillColor();
}

function inputTwo(b){
    if (b) {
        displayValTwo.value = b
    }
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    sliderTwo.value = displayValTwo.value;
    fillColor();
}

function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, gray ${percent1}% , #4b87db ${percent1}% , #4b87db ${percent2}%, gray ${percent2}%)`;
}

async function submit(e) {
    e.preventDefault()
    let fd = new FormData()
    fd.append('min', displayValOne.value)
    fd.append('max', displayValTwo.value)
    
    //с помощью fetch
    const response = await fetch('/api/post', {
        method: 'POST', 
        body: fd
    })
    .then((data) => {
        console.log(data)
    })
    .catch((data) => {
        console.log(data)
    })

    return response
    //с помощью XMLHttpRequest
    // const xhr = new XMLHttpRequest(); 
    // xhr.open('POST', '/api/post', true);
    // xhr.send(fd)
}
                                        
document.querySelector('.values').addEventListener('submit', (e) => {
    submit(e)
})