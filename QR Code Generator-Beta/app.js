function qrCode() {
  let text = document.getElementById("name").value;
  text = text.split(" ").join("");
  let qr = document.getElementById("qr");
  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + text;

  document.getElementById("qr").setAttribute("hidden", true);
  document.getElementById("txt").setAttribute("hidden", true);

  qr.onload = function () {
    document.getElementById("qr").removeAttribute("hidden");

    document.getElementById("txt").removeAttribute("hidden");
    document.getElementById("download").href = qr.src;
  };
}
