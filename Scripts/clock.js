const clock = document.querySelector('.clock');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function setClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    if(secondsDegrees >= 90 && secondsDegrees <= 180){
        let adding = (secondsDegrees - 90)/90 * 10 + 8;
        secondHand.style.width = adding + '%';
        secondHand.style.left = (62 - (secondsDegrees - 90)/90 * 10) + '%';
    }
    else if(secondsDegrees > 180 && secondsDegrees <= 270){
        let adding = -(secondsDegrees - 180)/90 * 10 + 18;
        secondHand.style.width = adding + '%';
        secondHand.style.left = (52 + (secondsDegrees - 180)/90 * 10) + '%';

    }
    else if(secondsDegrees > 270 && secondsDegrees <= 360){
        let adding = (secondsDegrees - 270)/90 * 10 + 8;
        secondHand.style.width = adding + '%';
        secondHand.style.left = (62 - (secondsDegrees - 270)/90 * 10) + '%';

    }
    else{
        let adding = -(secondsDegrees - 360)/90 * 10 + 18;
        secondHand.style.width = adding + '%';
        secondHand.style.left = (52 + (secondsDegrees - 360)/90 * 10) + '%';
    }
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;


    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(setClock, 1000);
setClock();

function showProject(){
    const container = document.querySelector('.projectContainer');
    container.classList.toggle('visible');
    const projects = document.querySelectorAll('.project');
    projects.forEach(element => {
        element.classList.toggle('visible');
    });

}

