function previewImage() {
    var file = document.getElementById('profilimageinput').files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function(event) {
            document.querySelector('.profile-bitemoji').setAttribute('src', event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
    }
}
