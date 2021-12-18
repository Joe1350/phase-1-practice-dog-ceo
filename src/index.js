document.addEventListener('DOMContentLoaded', () => {
        // url's
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

        // grab stuff
    const imgContainer = document.querySelector('#dog-image-container')
    const breedContainer = document.querySelector('#dog-breeds')
    const dropdown = document.querySelector('#breed-dropdown')

        // fetches
    fetch(imgUrl)
        .then(r => r.json())
        .then(images => images.message.forEach(imageLink => renderImgs(imageLink)));

    fetch(breedUrl)
        .then(r => r.json())
        .then(allBreeds => renderBreeds(allBreeds))//allBreeds.message.forEach(breed => renderBreeds(breed)))

        // callbacks
    function renderImgs(imageLink) {
        const img = document.createElement('img')
        img.src = imageLink
        img.style.width = '50%';
        img.style.marginLeft = '1%';
        imgContainer.append(img)
    }

    function renderBreeds(allBreeds) {
        for(let breed in allBreeds.message) {
            let breedArray = allBreeds.message[breed];
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

})