

function loadData(formatter) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './photos/data.json?t=' + new Date(), true);
    xhr.onload = function () {

        if (this.status >= 200 && this.status < 300) {
            formatter(JSON.parse(this.response));
            //lightGallery(document.getElementById('lightgallery'));

            
            $('#lightgallery').lightGallery({
                pager: true
              });
          
        } else {
            console.error(this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error(this.statusText);
    };

    xhr.send();
}

function formatJson(res) {

    let ulContent = "";
    for (let index = 0; index < res.list.length; index++) {
        let ulItem = res.list[index].arr;
        let liContent = "";
        for (let i = 0; i < ulItem.link.length; i++) {
            let liItem = ulItem.link[i];

            let type = ulItem.type[i];

            var minSrc = 'https://raw.githubusercontent.com/xinglinbaobao/xinglinbaobao.github.io/master/album/min_photos/' + ulItem.link[i];

            var src = 'https://raw.githubusercontent.com/xinglinbaobao/xinglinbaobao.github.io/master/album/photos/' + ulItem.link[i];


            liContent +=
                '<li data-src="'+ src +'">'+ 
                    '<a href="">' + 
                        '<img class="img-responsive" src="' + minSrc + '">' +
                        '<div class="gallery-poster">'+
                            '<img src="https://sachinchoolur.github.io/lightgallery.js/static/img/zoom.png">'+
                        '</div>'+
                    '</a>'+
                '</li>';
        }
        ulContent +=
            '<ul id="lightgallery">'
            + liContent
            + '</ul>';

    }

    document.querySelector('.gallery').innerHTML = ulContent;

}

-(function () {
    loadData(formatJson);
})();