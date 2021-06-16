$(function () {
    let page = 1
    let pageLimit = 10
    let totalRecord = 0

    getData()

    $(".prev").on("click", function (){
        if (page > 1) {
            page--
            getData()
        }
    })

    $(".next").on("click", function (){
        if (page * pageLimit < totalRecord) {
            page++
            getData()
        }
    })

    function getData() {
        $.ajax({
            url: "https://swapi.dev/api/people",
            type: "GET",
            data: {
                page: page,
                pageLimit: pageLimit
            },
            success: function (data) {
                totalRecord = data.count
                const results = data.results
                let html = "";

                for(let i = 0; i < results.length; i++) {
                    const idArr = results[i].url.split('/')
                    const id = idArr[idArr.length - 2]

                    html += createCharacter({
                        id: id,
                        name: results[i].name,
                        height: results[i].height,
                        img:  `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
                    })
                    $("#characters").html(html)
                }
            }
        })
    }

    const createCharacter = ({img, name, height, id}) => {
        return `<li class="character" id="character_${id}">
                    <div class="image">
                       <img
                           src="${img}"
                           alt=""
                       />
                    </div>

                    <div class="info">
                       <h2>${name}</h2>
                       <p>Height: ${height}</p>
                    </div>
                </li>`
    }
});

