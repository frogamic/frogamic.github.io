$(document).ready(function() {
  var MAXHEIGHT = 7;
  var MINTIME = 25;
  var TIMEVARIANCE = 75;

  function generateRandom(n) {
    return Math.floor(Math.random() * n);
  }

  function generateClip(height, variance) {
    var clipHeight = generateRandom(variance);
    var clipTop = generateRandom(height - clipHeight);
    var clipBottom = clipTop + clipHeight;
    return 'rect(' + clipTop + 'px, 100vw, ' + clipBottom + 'px, 0vw)';
  }

  function generateShadow(colour) {
    var offset = generateRandom(5) - 2;
    return offset + 'px 0 ' + colour;
  }

  function spawnAnimation($element, colour) {
    var frame = function() {
      $element.css('clip', generateClip($element.height(), MAXHEIGHT))
              .css('left', (generateRandom(5) - 2) + 'px')
              .css('text-shadow', generateShadow(colour));
      clearInterval($element.data('interval'));
      $element.data('interval', setInterval(frame, generateRandom(TIMEVARIANCE) + MINTIME));
    }
    $element.data('interval', setInterval(frame, generateRandom(TIMEVARIANCE) + MINTIME));
    return frame;
  }

  $.fn.glitch = function (colours) {
    var $duplicates = [];
    for (var i in colours) {
      var $glitch = this.clone();
      $glitch.removeClass('glitch');
      $glitch.addClass('glitchDuplicate')
      $duplicates.push($glitch);
    }

    for (i in $duplicates) {
      this.append($duplicates[i]);
      spawnAnimation($duplicates[i], colours[i])
    }
    return this;
  };

  $('.glitch').glitch(['red', 'aqua', 'lime', 'fuchsia', 'yellow']);
});
