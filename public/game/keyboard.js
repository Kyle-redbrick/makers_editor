function convertKey(key) {
  if (!key) {
    return key;
  }
  key = key.toLowerCase();
  switch (key) {
    case " ":
      return "space";
    case "arrowup":
      return "up";
    case "arrowdown":
      return "down";
    case "arrowleft":
      return "left";
    case "arrowright":
      return "right";
    case "escape":
      return "esc";
    default:
      return key;
  }
}
