const UI = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    nameAnswer: document.querySelector('.name_answer'),
    genderAnswer: document.querySelector('.gender_answer'),
    countryAnswer: document.querySelector('.country_answer'),
}

const serverGenderUrl = 'https://api.genderize.io'
const serverCountryUrl = 'https://api.nationalize.io'
let firstName = ''
const wrongName = 'Wrong name!'

const noGender = 'Cant find gender'
const noCountry = 'Cant find country'


function resetAnswers() {
    UI.nameAnswer.innerText = ''
    UI.genderAnswer.innerText = ''
    UI.countryAnswer.innerText = ''
}

function getFirstName() {
    firstName = UI.input.value.trim()
    if (!firstName) {
        throw new Error(wrongName)
    }
}

UI.form.addEventListener('submit', function () {
    resetAnswers()
    try {
        getFirstName()
        this.reset()
        UI.nameAnswer.innerText = firstName

        const urlGender = `${serverGenderUrl}?name=${firstName}`;
        fetch(urlGender)
            .then(response => {
                return response.json()
            })
            .then(info => {
                const gender = info.gender
                if (!gender) {
                    throw new Error(noGender)
                }
                UI.genderAnswer.innerText = gender
            })
            .catch(e => {
                UI.genderAnswer.innerText = e.message
            })

        const urlCountry = `${serverCountryUrl}?name=${firstName}`;
        fetch(urlCountry)
            .then(response => {
                return  response.json()
            })
            .then(info => {
                const country = info.country[0].country_id
                if (!country) {
                    throw new Error(noCountry)
                }
                UI.countryAnswer.innerText = country
            })
            .catch(e => {
                UI.countryAnswer.innerText = noCountry
            })

    } catch (e) {
        if (e.message === wrongName) {
            UI.nameAnswer.innerText = e.message
        }
    }
})