let downloadedImg = '';

export const convertMillisecondsToMinutes = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const convertSecondsToMinutes = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let sec = parseInt(((seconds % 60)).toFixed(0));
    return minutes + ":" + (sec < 10 ? '0' : '') + sec;
}

export function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
    
}

export function getDataUri(url, callback) {
    var image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}

export const rgbToHex = function (rgb) { 
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

export const fullColorHex = function(r,g,b) {   
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    return red+green+blue;
};

export function startDownload(url) {
    let imageURL = url;
   
    downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = imageURL;
}

export function imageReceived(cb) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
  
    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
   
    context.drawImage(downloadedImg, 0, 0);
    // imageBox.appendChild(canvas);
   
    try {
      localStorage.setItem("saved-cover-art", canvas.toDataURL("image/png"));
    }
    catch(err) {
      console.log("Errorsd d sd: " + err);
    }  
}

export function getBrowserBreakpoint() {
    const width = document.body.offsetWidth;

    if(width >= 1200) {
        return 'xl';
    } else if(width >= 992) {
        return 'lg';
    } else if(width >= 768) {
        return 'md';
    } else if(width >= 540) {
        return 'sm';
    } else {
        return 'xs';
    }
}

export function removeTracksWithoutPreview(tracks) {
    return tracks.filter(track => track.preview_url);
  }