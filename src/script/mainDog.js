const API_KEY = 'api_key=live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5'
const DOG_API_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=2`;
const DOG_API_FAVORITES = `https://api.thedogapi.com/v1/favourites`;
const DOG_API_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
// const DOG_API_UPLOAD = `https://api.thedogapi.com/v1/images/upload`;

const spanError = document.querySelector('.error');

function randomDog() {
    randomDogs();
}

async function randomDogs() {
    const response = await fetch(DOG_API_RANDOM);
    const data = await response.json();
    console.log('random');
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status;
    } else {

        const img1 = document.querySelector('#img1');
        const img2 = document.querySelector('#img2');

        const btn1 = document.querySelector('#btn1')
        const btn2 = document.querySelector('#btn2')



        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);

    }


}
////////////////
async function favoritesDogs() {
    const response = await fetch(DOG_API_FAVORITES,{
        method:'GET',
        headers:{
            'x-api-key':'live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5',
        },
    });
    const data = await response.json();
    console.log('favorites');
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status;
    } else {
        const section = document.querySelector('.favorites');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites Dogs');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.map(item => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('remove the dog from favorites');
            img.src = item.image.url;
            img.width = 150;
            
            btn.appendChild(btnText);
            btn.onclick = () => delateFavoriteDog(item.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    }
}
///////////////////////////////////
async function saveFavoriteDog(id) {
    const response = await fetch(DOG_API_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key':'live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data= await response.json();

    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status;
    } else {
        console.log('save to favorites');
        favoritesDogs();
    }
    // const data = await response.json(); 
    // console.log(response);
}
//////////////////////////

async function delateFavoriteDog(id) {
    const response = await fetch(DOG_API_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers:{
            'x-api-key':'live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5',
        }
    });
    const data = response.json();
    console.log('Delete');
    console.log(data);
    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status;
    } else {
        console.log('delete');
        favoritesDogs();
    }


}

async function uploadDogPicture(){
    const form = document.querySelector('.uploadingForm');
    const formData= new FormData(form); //add all inputs values from form 

    console.log(formData.get('file'));//show information about the document uploading

    const response = await fetch(DOG_API_UPLOAD ,{
        method:'POST',
        headers:{
            // 'Content-Type': 'multipart/form-data', // we don't use because fetch() have this inside 
            'x-api-key':'live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5',
        },
        body:formData,
    });
    const data= response.json();


    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status;
    } else {
        console.log('DONE UPLOAD');
        console.log({data});
        console.log(data.url);
        saveFavoriteDog(data.id);//to save in section favorites after upload the img 
    }



}
////////////////////

randomDogs();
favoritesDogs();
// saveFavoriteDogs();