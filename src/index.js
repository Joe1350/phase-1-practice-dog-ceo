document.addEventListener('DOMContentLoaded', () => {
        // url's
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

        // grab stuff
    const imgContainer = document.querySelector('#dog-image-container')
    const breedContainer = document.querySelector('#dog-breeds')
    const dropdown = document.querySelector('#breed-dropdown')

        // fetches
    function getImages() {
        fetch(imgUrl)
        .then(r => r.json())
        .then(images => images.message.forEach(imageLink => renderImgs(imageLink)));
    }

    function getDogs() {
        fetch(breedUrl)
        .then(r => r.json())
        .then(breeds => renderBreeds(breeds))
    }

        //event listeners
    dropdown.addEventListener('change', (e) => {
        breedContainer.innerText = ''
        let value = e.target.value
        fetch(breedUrl)
        .then(r => r.json())
        .then(breeds => renderFilteredBreeds(breeds, value))
    })

        // callbacks
    function renderImgs(imageLink) {
        const img = document.createElement('img')
        img.src = imageLink
        img.style.width = '50%';
        img.style.marginLeft = '1%';
        imgContainer.append(img)
    }

    function renderBreeds(breeds) {
        for(let breed in breeds.message) {
            let breedArray = breeds.message[breed];
            if(breedArray.length > 0) {
                for(let i=0; i < breedArray.length; i++) {
                    let dogBreed = document.createElement("li")
                    dogBreed.textContent = `${breedArray[i]} ${breed}`;
                    breedContainer.append(dogBreed)
                    dogBreed.addEventListener('click', () => dogBreed.style.color = 'red')
                }
            } else {
                let dogBreed = document.createElement("li")
                dogBreed.textContent = breed;
                breedContainer.append(dogBreed);
                dogBreed.addEventListener('click', () => dogBreed.style.color = 'red')
            }
        }
    }

    function renderFilteredBreeds(breeds, value) {
        for(let breed in breeds.message) {
            let breedArray = breeds.message[breed]
            if(breed.charAt(0) == value) {
                if(breedArray.length > 0) {
                    for(let i=0; i < breedArray.length; i++) {
                        let dogBreed = document.createElement("li")
                        dogBreed.textContent = `${breedArray[i]} ${breed}`;
                        breedContainer.append(dogBreed)
                        dogBreed.addEventListener('click', () => dogBreed.style.color = 'red')
                    }
                } else {
                    let dogBreed = document.createElement("li")
                    dogBreed.textContent = breed;
                    breedContainer.append(dogBreed);
                    dogBreed.addEventListener('click', () => dogBreed.style.color = 'red')
                }
            }
        }
    }

        //initialize
    getImages()
    getDogs()
})