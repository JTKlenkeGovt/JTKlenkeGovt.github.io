const slider = document.getElementById('poverty-line-slider');
const canvas = document.getElementById('lineCanvas');
const ctx = canvas.getContext('2d');
const padding = 1;
var svgContent = '';

function getSliderX(slider) {
    return slider.value / 100 * (canvas.width - 2 * padding) + padding;
}

function calcSliderVal(slider) {
    return Math.round(((slider.value - slider.min) * 100000 / (slider.max - slider.min)) / 10) * 10
}

function drawLine() {
    document.getElementById('current-choice').textContent =
        `Poverty Line: $${calcSliderVal(slider)} `;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = getSliderX(slider)
    ctx.beginPath();
    ctx.moveTo(x, .06 * canvas.height);
    ctx.lineTo(x, .91 * canvas.height);
    ctx.setLineDash([5, 10]);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function confirmLine() {
    const sliderVal = calcSliderVal(slider);
    document.getElementById('final-choice').textContent = `You Chose the Poverty Line to be $${sliderVal}`;

    const extra = `Let's explore how that choice would affect people's lives.`
    const percent = Math.round(sliderVal / 12760 * 100);
    if (Math.abs(percent - 100) < 10) {
        var commentary = `That's about what it actually was in 2020. ${extra}`;
    } else {
        var commentary = `That's about ${percent}% of what it actually was in 2020. ${extra}`;
    }
    console.log(commentary)
    document.getElementById('final-commentary').textContent = commentary;

    document.getElementById('show').classList.remove('hidden');


    document.querySelectorAll('.to-hidden').forEach(function (item) {
        if (!item.classList.contains('hidden')) {
            item.classList.add('hidden');
        }
    });



    if (percent == 0) {
        var id = '1'

    } else if (sliderVal <= 5000) {
        var id = '2'

    } else if (sliderVal <= 14000) {
        var id = '3'
    }
    else if (sliderVal <= 25000) {
        var id = '4'
    }
    else if (sliderVal <= 42000) {
        var id = '5'
    }
    else {
        var id = '6'
    }

    document.getElementById(id).classList.remove('hidden');

    document.getElementById('show').scrollIntoView({
        behavior: 'smooth'
    });

}

slider.addEventListener('input', drawLine);

drawLine();