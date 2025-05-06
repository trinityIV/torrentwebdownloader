const canvas = document.getElementById('spiderweb');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.onresize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};

const POINTS = 40, RADIUS = 120;
let points = [];
for (let i = 0; i < POINTS; i++) {
    points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    // Draw lines
    for (let i = 0; i < POINTS; i++) {
        for (let j = i + 1; j < POINTS; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < RADIUS) {
                ctx.strokeStyle = `rgba(51,255,51,${1 - dist/RADIUS})`;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
    // Move points
    for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    requestAnimationFrame(draw);
}
draw();
