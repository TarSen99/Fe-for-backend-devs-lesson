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
