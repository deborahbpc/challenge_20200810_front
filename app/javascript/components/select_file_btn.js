const selectFile = () => {
    const check = document.querySelector('.upload-file');

    if (check) {
        $('.btn-select').on('click', function() {
            $('.upload-file').trigger('click');
        });
          
        $('.upload-file').on('change', function() {
            var fileName = $(this)[0].files[0].name;
            $('#file-box').val(fileName);
        });
    };
};

export { selectFile }