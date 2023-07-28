(() => {
  let currentRepo = "";

  const handleClickLaunchStackBlitzBtn = () => {
    const url = new URL(window.location);
    url.host = "pr.new" + url.host;
    chrome.runtime.sendMessage({
      type: "OPEN_TAB",
      url: url.toString(),
    });
  };
  const onGitHubRepo = () => {
    const LaunchStackBlitzBtn1 = document.getElementById(
      "Launch-StackBlitz-Btn-1"
    );
    const LaunchStackBlitzBtn2 = document.getElementById(
      "Launch-StackBlitz-Btn-2"
    );
    if (!LaunchStackBlitzBtn1) {
      const btn1 = document.createElement("button");
      const li = document.createElement("li");
      li.appendChild(btn1);
      const actions = document.querySelector(".pagehead-actions");
      btn1.classList.add("Launch-StackBlitz-Btn");
      btn1.id = "Launch-StackBlitz-Btn-1";
      btn1.classList.add("stackBlitzLaunchStackBlitzBtnStyle");
      btn1.innerHTML = "Launch";
      actions.prepend(li);
      btn1.addEventListener("click", handleClickLaunchStackBlitzBtn);
    }
    if (!LaunchStackBlitzBtn2) {
      const container = document.querySelector("#responsive-meta-container");
      const btn2 = document.createElement("button");
      btn2.classList.add("Launch-StackBlitz-Btn");
      btn2.id = "Launch-StackBlitz-Btn-2";
      btn2.classList.add("stackBlitzLaunchStackBlitzBtnStyle");
      btn2.innerHTML = "Launch";

      const div = container.children[0];
      const newElement = document.createElement("div");
      newElement.classList.add("small-btn-styles");
      newElement.appendChild(btn2);
      div.prepend(newElement);
      btn2.addEventListener("click", handleClickLaunchStackBlitzBtn);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, repo, url } = obj;
    console.log(url);
    if (type === "GITHUB_REPO") {
      currentRepo = repo;
      onGitHubRepo();
    }
  });

  onGitHubRepo();
})();
