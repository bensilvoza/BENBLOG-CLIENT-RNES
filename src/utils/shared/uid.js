function uid() {
  var output = "";
  var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 1; i <= 10; i++) {
    output = output + letters[Math.floor(Math.random() * 52)];
  }
  return output;
}

export default uid;
