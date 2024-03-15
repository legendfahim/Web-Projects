let userInput = document.getElementById("dt");
userInput.max = new Date().toISOString().split("T")[0];

function calculate() {
  document.getElementById("result").removeAttribute("hidden");

  let birthDate = new Date(userInput.value);
  let bd, bm, by;
  bd = birthDate.getDate();
  bm = birthDate.getMonth() + 1;
  by = birthDate.getFullYear();

  let today = new Date();
  let d, m, y;
  d = today.getDate();
  m = today.getMonth() + 1;
  y = today.getFullYear();

  let d3, m3, y3;
  y3 = y - by;
  if (m >= bm) {
    m3 = m - bm;
  } else {
    y3--;
    m3 = 12 + m - bm;
  }
  if (d >= bd) {
    d3 = d - bd;
  } else {
    m3--;
    d3 = getDaysInMonth(by, bm) + d - bd;
  }
  if (m3 < 0) {
    m3 = 11;
    y3--;
  }
  let result = document.getElementById("result");
  result.innerHTML = `${d3} days ${m3} month ${y3} years`;
}
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
