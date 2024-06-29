function qrCode() {
  let text = document.getElementById("name").value;
  if (!text) {
    alert("Please enter a URL");
    return;
  }

  let qr = document.getElementById("qr");
  let src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(text);
  qr.src = src;

  document.getElementById("qr").setAttribute("hidden", true);
  document.getElementById("txt").setAttribute("hidden", true);

  qr.onload = function () {
    document.getElementById("qr").removeAttribute("hidden");
    document.getElementById("txt").removeAttribute("hidden");

    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.getElementById("download");
        downloadLink.href = url;
        downloadLink.download = "QrCode.png";
      })
      .catch(() => {
        alert("Failed to generate QR code. Please try again.");
      });
  };

  qr.onerror = function () {
    alert("Failed to generate QR code. Please try again.");
  };
}

document.getElementById("download").addEventListener("click", function (event) {
  let qr = document.getElementById("qr");
  if (!qr.src) {
    event.preventDefault();
    alert("Please generate a QR code first.");
  }
});
