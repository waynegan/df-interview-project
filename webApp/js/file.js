Dropzone.options.myAwesomeDropzone = {
    init: function() {
      this.on("success", function(file,response) { alert(response); });
    }
  };