chrome.tabs.executeScript( {
code: "window.getSelection().toString();"
}, function(selection) {
  console.log("hi");
  document.getElementById("output").innerHTML = selection[0];
  console.log(selection[0]);
  console.log(document.getElementById("output").innerHTML);
  chrome.storage.sync.set("list", function(getEvent) {
      let clippings = [selection[0]];
      chrome.storage.sync.set({
          "list": clippings
      });
  });
});

console.log("Stuff");

