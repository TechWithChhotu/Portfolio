const listItem = document.querySelectorAll(".NavbarItem");
// // console.log(listItem, "Type of ", typeof listItem);
listItem.forEach((e) => {
  e.addEventListener("click", () => {
    listItem.forEach((e) => {
      if (e.classList[1] === "Active") {
        e.classList.remove("Active");
      }
    });
    e.classList.add("Active");
  });
});

// =======================ChangeIconsWithMoves=======
function ChangeIcon() {
  let icon = document.querySelector(".ResponsiveIcon");
  if (icon.classList[1] === "fa-bars") {
    document.getElementById("Move").style.transform = "translateX(0)";
    icon.classList.replace("fa-bars", "fa-x");
  } else {
    document.getElementById("Move").style.transform = "translateX(-10rem)";
    icon.classList.replace("fa-x", "fa-bars");
  }
}

function myFunction(x) {
  if (x.matches) {
    document.getElementById("Move").style.transform = "translateX(-10rem)";
  } else {
    document.getElementById("Move").style.transform = "translateX(0)";
  }
}

var x = window.matchMedia("(max-width: 768px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

// ================================Mouse trail==============================
var dots = [],
  mouse = {
    x: 0,
    y: 0,
  };

// The Dot object used to scaffold the dots
var Dot = function () {
  this.x = 0;
  this.y = 0;
  this.node = (function () {
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  })();
};

Dot.prototype.draw = function () {
  this.node.style.left = this.x + 7 + "px";
  this.node.style.top = this.y + 17 + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
  var d = new Dot();
  dots.push(d);
}

// This is the screen redraw function
function draw() {
  var x = mouse.x,
    y = mouse.y;

  dots.forEach(function (dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * 0.6;
    y += (nextDot.y - dot.y) * 0.6;
  });
}

addEventListener("mousemove", function (event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();

// =================Integrate Project.json API==============
// ==============To Show Project Dynamically================
const setProject = (Tech) => {
  // implement fetch in Project.json
  fetch("Project.json")
    .then((res) => res.json())
    .then((data) =>
      data.Project.map((e) => {
        if (e.Technology === Tech) {
          ProjectsCard.innerHTML += `<div class="ProjectCard" data-aos=${e.data_aos}>
        <div class="ProjectImage">
          <img src=${e.ProjectDemo} />
        </div>
        <div class="ProjectBtns flexsa">
          <a
            href=${e.DemoWebLink}
            target="_blank"
          
          >
            <button class="btnBorder viewBtn">View Demo</button></a
          >
          <a href=${e.CodeLink}><button class="btnBGC sourceBtn">Get Code</button></a>
        </div>
      </div>`;
        }
      })
    );
};

let ProjectsCard = document.querySelector(".ProjectsCard");
setProject("JS");

let techUsed = document.querySelectorAll(".techUsed");
techUsed.forEach((e) => {
  e.addEventListener("click", (tech) => {
    ProjectsCard.innerHTML = ""; //ProjectsCard Section will be erased
    setProject(e.innerHTML);
  });
});
