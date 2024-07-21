$('.search-button').on('click', function(){
    $.ajax({
        url:'http://www.omdbapi.com/?apikey=2c61ce09&s=' + $('.input-keyword').val(),
        success: (results) => {
            const movies = results.Search;
            let card = ``;
            movies.forEach(element => {
                card += showCards(element);
            })
    
            $('.movie-container').html(card);
    
            // Ketika tombol detail di klik maka akan menjalankan ajax baru
            $('.detail-button').on('click', function(){
                $.ajax({
                    url:'http://www.omdbapi.com/?apikey=2c61ce09&i&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMoviesDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});

function showCards(element){
    return `<div class="col-md-3">
                    <div class="card my-4 mr-3" style="width: 18rem;">
                        <img src="${element.Poster}" alt="${element.Title}">
                        <div class="card-body">
                          <h5 class="card-title">${element.Title}</h5>
                          <h6 class="text-muted">Rilis: ${element.Year}</h6>
                          <a href="#" class="btn btn-primary detail-button" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${element.imdbID}">Show more</a>
                        </div>
                    </div>
                </div>`;
}

function showMoviesDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                        <div class="col-md-3">
                            <img src="${m.Poster}" alt="${m.Title}" class="img-fluid rounded">
                        </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <strong>Judul : </strong>${m.Title} (${m.Year})
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Rating : </strong>${m.imdbRating} / 
                                        <i class='bx bxs-star' style="color:#FFDE4D; font-size:12px;"></i>
                                        <i class='bx bxs-star' style="color:#FFDE4D; font-size:12px;"></i>
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Rilis : </strong>${m.Released}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Genre : </strong>${m.Genre}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Aktor : </strong>${m.Actors}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Deskripsi : </strong>${m.Plot}
                                    </li>
                                  </ul>
                            </div>
                        </div>
                    </div>`;
}