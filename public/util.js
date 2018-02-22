function downloadAsFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("\ufeff" + text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function pad(num, width, chr) {
  if (chr === undefined) {
    chr = '0';
  }
  var str = '' + num;
  for (var i = 0; str.length < width; i++) {
    str = chr + str;
  }
  return str;
}

Array.prototype.flatten = function(func) {
  return this.reduce((acc, cur) => {
    if (func !== undefined) {
      cur = func(cur);
    }
    return acc.concat(cur);
  }, []);
}

Array.prototype.multiFlatten = function(times, func) {
  var o = this;
  for (var i = 0; i < times; i++) {
    o = o.flatten(func);
  }
  return o;
}
