// cv.js

// Fetch markdown file with name from the server.
function fetchMarkdown(name, then) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      then(req.responseText);
    }
  };

  req.open('GET', name + '.md');
  req.send();
}

function renderMarkdown(element) {
  fetchMarkdown(element.id, function(txt) {
    element.innerHTML = marked(txt);
  });
}

// Generate all markdown blocks on the page.
function generate() {
  var es = document.getElementsByClassName('md');
  for (var i = 0; i < es.length; i++) {
    var e = es[i];
    var txt = e.innerText;
    if (txt && txt.length > 0) {
      e.innerHTML = marked(txt);
    }
    else if (e.id) {
      renderMarkdown(e);
    }
  };
}

generate();
