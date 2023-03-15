const API_KEY = 'api_key=live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5'
const DOG_API_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=2`;
const DOG_API_FAVORITES = `https://api.thedogapi.com/v1/favourites?${API_KEY}`;
const DOG_API_FAVORITES_DELETE =(id)=> `https://api.thedogapi.com/v1/favourites/${id}?${API_KEY}`;

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

        const btn1=document.querySelector('.btn1')
        const btn2=document.querySelector('.btn2')



        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick=()=> saveFavoriteDog(data[0].id);
        btn1.onclick=()=> saveFavoriteDog(data[1].id);

    }


}
////////////////
async function favoritesDogs() {
    const response = await fetch(DOG_API_FAVORITES);
    const data = await response.json();
    console.log('favorites');
    console.log(data);

    if (response.status !== 200) {
      spanError.innerHTML = 'Error: ' + response.status;
    }else{
        data.map(item=>{
            const section=document.querySelector('.favorites');

            const article=document.createElement('article');
            const img= document.createElement('img');
            const btn= document.createElement('button');
            const btnText=document.createTextNode('remove the dog from favorites');
            img.src=item.image.url;
            img.width=150;
           
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    }
}
///////////////////////////////////
async function saveFavoriteDog(id){
    const response= await fetch(DOG_API_FAVORITES,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            image_id:id
        }),
    });
    // const data= await response.json();

    if (response.status !== 200) {
        spanError.innerHTML = 'Error: ' + response.status ;
      }
    // const data = await response.json();  
    console.log(response); 
}
//////////////////////////

async function delateFavoriteDog(id){
    const response = await fetch(DOG_API_FAVORITES_DELETE(id),{
        method:'DELATE', 
    });

}



randomDogs();
favoritesDogs();
// saveFavoriteDogs();