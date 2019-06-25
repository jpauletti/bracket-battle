/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var saveData = {
  teams: [
      ["Atlanta Thrashers","Tampa Bay Lightning"],
      ["Dallas Stars", "Nashville Preditors"]
    ],
  results: [
    [
      [3, 4],
      [4, 2]
    ]
  ]
};

function saveFn(data, userData) {
  var json = jQuery.toJSON(data);
  $("#saveOutput").text("POST " + userData + " " + json);
}

$(function() {
  var container = $("div#save .demo");
  container.bracket({
    init: saveData,
    save: saveFn,
    userData: ""
  });

  var data = container.bracket("data");
  $("#dataOutput").text(jQuery.toJSON(data));
});

export {function, saveFn, saveData};
