const urlParams = new URLSearchParams(window.location.search);
let root = document.documentElement;
let myId = urlParams.get("participantID");
let teamId = urlParams.get("teamID");
let url = '';
// Logic for individual vs team data.
if (myId) {
  let myUrl = 'https://www.extra-life.org/api/1.3/participants/' + myId;
  url = myUrl;
  document.getElementById("label-team").hidden=true;
} else if (teamId) {
  let teamUrl = 'https://www.extra-life.org/api/1.3/teams/' + teamId;
  url = teamUrl;
  document.getElementById("label-mine").hidden=true;
}

// logic to influence the style of the page.
let progressBackgroundColor = urlParams.get("progressBackgroundColor");
if (progressBackgroundColor) {
  root.style.setProperty("--progress-color-background", "#" + progressBackgroundColor);
}
let progressColor = urlParams.get("progressColor");
if (progressColor) {
  root.style.setProperty("--progress-color", "#" + progressColor);
}
let labelColor = urlParams.get("labelColor");
if (labelColor) {
  root.style.setProperty("--label-color", "#" + labelColor);
}
let percentTextColor = urlParams.get("percentTextColor");
if (percentTextColor) {
  document.getElementById("progressBar").style.color = "#" + percentTextColor;
}

function reload() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let raised = data.sumDonations;
      let goal = data.fundraisingGoal;
      document.getElementById("progress").innerHTML = "$" + raised + "/$" + goal;

      let percent = Math.round(raised / goal * 100);
      document.getElementById("progressBar").innerHTML = percent + "%";
      document.getElementById("progressBar").style.width = percent + "%";

    });
  setTimeout(function() {
          reload();
        } ,60000);
} reload();
