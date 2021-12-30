window.onload = function() {
    var nnqUploads = document.getElementsByClassName("nnq-upload");
    for (var i = 0; i < nnqUploads.length; i++) {
        if (nnqUploads[i]) {
            nnqUploads[i].addEventListener("click", function(event) {
                event.cancelBubble = true;
                var uploadInput = this.getElementsByClassName("nnq-upload__input");
                for (var i = 0; i < uploadInput.length; i++) {
                    if (uploadInput[i]) {
                        uploadInput[i].click();
                    }
                }
            }, true)
        }
    }
}