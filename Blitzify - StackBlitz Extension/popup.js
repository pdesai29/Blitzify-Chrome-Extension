//-t node -ti myexpress -des firstExpressApp -d express nodemon slugs lodash -f server.js app.js -s nodemon server.js

let input = "";

const regex = /-(t|ti|des|d|f|s|rc)\s+((?:(?!\s+-(t|ti|des|d|f|s|rc)).)+)?/g;
let flags = [];
function filterData(input) {
  let match;
  let result = {
    template: "node",
    title: "MyCoolProject",
    description: "My cool nodejs project",
    dependencies: ["lodash", "nodemon"],
    files: ["script.js", "index.html", "style.css"],
    startScript: "nodemon script.js",
  };

  while ((match = regex.exec(input))) {
    const [, key, value] = match;
    switch (key) {
      case "t":
        flags.push("t");
        result.template = value || "node";
        break;
      case "ti":
        flags.push("ti");
        result.title = value ? filterTitle(value) : "MyCoolProject";
        break;
      case "des":
        flags.push("des");
        result.description = value
          ? filterDescription(value)
          : "My cool nodejs project";
        break;
      case "d":
        flags.push("d");
        result.dependencies = value
          ? value.trim().split(/\s+/)
          : ["lodash", "nodemon"];
        break;
      case "f":
        flags.push("f");
        result.files = value
          ? value.trim().split(/\s+/)
          : ["script.js", "index.html", "style.css"];
        break;
      case "s":
        flags.push("s");
        result.startScript = value || "";
        break;
      default:
        break;
    }
  }

  if (!flags.includes("s")) {
    result.startScript = "";
  }
  if (!flags.includes("d")) {
    result.dependencies = [];
  }
  return result;
}
function filterTitle(title) {
  return title
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .map(capitalize)
    .join("");
}

function filterDescription(description) {
  return description.replace(/-/g, " ").replace(/\s+/g, " ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function openProject(e) {
  e.preventDefault();
  const data = filterData(document.getElementById("build-input").value);
  console.log(data);
  const packageJson = `{
  "name": "${data.title}",
  "version": "0.0.0",
  "scripts": {
    "start": "${data.startScript}"
    },
  "dependencies": {
    ${
      data.dependencies
        ? data.dependencies.map((dep) => `"${dep}": "*"`).join(",\n    ")
        : ""
    }
  }
  
}`;

  console.log(packageJson);

  let project = {
    template: data.template,
    title: data.title,
    description: data.description,
    files: {
      "package.json": packageJson,
    },
  };

  data.files?.forEach((file) => {
    project.files[file] = "";
  });

  console.log(project);

  StackBlitzSDK.openProject(project);
}

document.addEventListener("DOMContentLoaded", function () {
  function renderItems(category, targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    const items = data[category]?.data;

    if (!targetElement || !items || items.length === 0) return;

    const itemTemplate = (item) => `
      <a href="${item.link}" class="text-decoration-none" target="_blank">
      <div class="btn  btn-sm btn-outline-light m-2 content-button p-0" style="width:200px">
      <div class="row">
        <div class="col-auto m-1">
          <img src="${item.img}" class="img-fluid m-3" alt="${item.title}">
        </div>
        <div class="col-auto m-1">
           <p class="stack-title m-2">${item.title}</p>
           <p class="stack-subtitle">${item.subtitle}</p>
        </div>
        </div>
      </div>
      </a>
      `;

    const itemsHTML = items.map(itemTemplate).join("");
    targetElement.innerHTML = itemsHTML;
  }
  renderItems("popular", "popular-Builds-div");
  renderItems("frontEnd", "frontEnd-Builds-div");
  renderItems("backEnd", "backEnd-Builds-div");
  renderItems("fullStack", "fullStack-Builds-div");
  renderItems("vite", "vite-Builds-div");
  renderItems("docsBlogsSlides", "docsBlogsSlides-Builds-div");
  renderItems("creative", "creative-Builds-div");
  renderItems("mobile", "mobile-Builds-div");
  renderItems("vanilla", "vanilla-Builds-div");
  renderItems("popular", "popular-Builds-div");
  document
    .getElementById("build-button")
    .addEventListener("click", openProject);

  document
    .getElementById("build-input")
    .addEventListener("change", function (event) {
      input = event.target.value;
      console.log(input);
    });
});

function handleClick(e) {
  console.log(e.target);
}

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const optionsDivs = document.querySelectorAll(".option");

  function showOptionsDiv(id) {
    optionsDivs.forEach((div) => div.classList.remove("active"));
    navItems.forEach((item) => item.classList.remove("nav-btn"));
    const selectedDiv = document.getElementById(id + "-div");
    const selectedBtn = document.getElementById(id);
    if (selectedDiv) {
      selectedDiv.classList.add("active");
      selectedBtn.classList.add("nav-btn");
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const navItemId = this.getAttribute("id");

      showOptionsDiv(navItemId);
    });
  });

  showOptionsDiv("popular-Builds");
});
