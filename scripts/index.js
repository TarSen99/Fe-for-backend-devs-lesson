// const nameBtn = document.querySelector("#button_name_1");
// const nameColorBtn = document.querySelector("#button_name_color_1");
// const removeNameBtn = document.querySelector("#button_remove_1");
// const nameText = document.querySelector("h2");

const charactersContainer = document.getElementById('characters')

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

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://swapi.dev/api/people");

xhr.send();

xhr.onload = function () {
  const parsed = JSON.parse(xhr.response)
  const results = parsed.results

  for(let i = 0; i < results.length; i++) {
    const idArr = results[i].url.split('/')
    const id = idArr[idArr.length - 2]

    charactersContainer.insertAdjacentHTML('beforeend', createCharacter({
        id: id,
        name: results[i].name,
        height: results[i].height,
        img:  `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
    }))
  }

  console.log(results);

};
const aa = (lel) => {
    alert(lel)
}
const generateButton = ({text, onclickText}) => {
    return `<button onclick="${onclickText}">${text}</button>`;
}
const generateButtons = (prevUrl, nextUrl, contentContainerSelector, buttonsContainerSelector) => {
    let buttonsContainer = $(buttonsContainerSelector);
    buttonsContainer.empty();
    if (prevUrl !== null) {
        let previousButton = generateButton({
            text: "Назад",
            onclickText: `generateCharacters('${prevUrl}', '${contentContainerSelector}', '${buttonsContainerSelector}')`
        });
        buttonsContainer.append(previousButton);
    }
    if (nextUrl !== null) {
        let nextButton = generateButton({
            text: "Вперед",
            onclickText: `generateCharacters('${nextUrl}', '${contentContainerSelector}', '${buttonsContainerSelector}')`
        });
        buttonsContainer.append(nextButton);
    }
}

const generateCharacter = ({img, name, height, id}) => {
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

const generateCharacters = (url, contentContainerSelector, buttonsContainerSelector) => {
    $.get(url, function(data) {
        generateButtons(data.previous, data.next, contentContainerSelector, buttonsContainerSelector);

        let contentContainer = $(contentContainerSelector);
        contentContainer.empty();
        for (let result of data.results) {
            const idArr = result.url.split('/');
            const id = idArr[idArr.length - 2];
            contentContainer.append(generateCharacter({
                id: id,
                name: result.name,
                height: result.height,
                img:  `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            }));
        }
    });
}
$(function() {
    generateCharacters("https://swapi.dev/api/people", "#characters", ".buttons");

});
