function count() {
  let text = document.getElementById("textarea");
  document.getElementById("number").textContent = wordCount(text.value);
}
document.getElementById("b").addEventListener("click", count);
