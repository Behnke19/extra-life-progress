let pathParam = window.location.search.substring(1);
let myId = '';
let teamId = '';
let param = pathParam.split("=");
let url = '';
if (param[0] == "participantID") {
  myId = param[1];
  let myUrl = 'https://www.extra-life.org/api/1.3/participants/' + myId;
  url = myUrl;
  document.getElementById("label-team").hidden=true;
} else if (param[0] == "teamID") {
  teamId = param[1];
  let teamUrl = 'https://www.extra-life.org/api/1.3/teams/' + teamId;
  url = teamUrl;
  document.getElementById("label-mine").hidden=true;
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
