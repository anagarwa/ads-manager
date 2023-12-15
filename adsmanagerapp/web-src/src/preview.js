function openPreviewDialog() {
    var dialog = document.getElementById('my-dialog');
    //dialog.style.display = 'flex';

    // Show the dialog
    dialog.showModal();

}
function closePreviewDialog() {
    var dialog = document.getElementById('my-dialog');
    dialog.style.display = 'none';

    // Show the dialog
    dialog.close();

}

document.getElementsByClassName('dialog-thumbnail')[0].addEventListener('click', function() {
    var imageUrl = this.src;
    window.open(imageUrl, '_blank');
});

document.getElementsByClassName('dialog-thumbnail')[1].addEventListener('click', function() {
    var imageUrl = this.src;
    window.open(imageUrl, '_blank');
});