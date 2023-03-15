const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
});
api.defaults.headers.common['x-api-key'] = 'live_1knuvHYlMuFYAhN0YcjJLgAQoGmS9GOZrotiROgapSw9lWoSjTbkK1ROLCsFWCh5'


const spanError = document.querySelector('.error');

function randomDog() {
    randomDogs();
}

async function randomDogs() {
    const { data, status } =await  api.get('/images/search?limit=2');

    if (status !== 200) {
        spanError.innerHTML = 'Error-- ' + status;

    } else {
        const img1 = document.querySelector('#img1');
        const img2 = document.querySelector('#img2');

        const bt1 = document.querySelector('#btn1');
        const bt2 = document.querySelector('#btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        bt1.onclick=()=> saveFavoriteDog(data[0].id)
        bt2.onclick=()=> saveFavoriteDog(data[1].id)

    }

}

async function favoritesDogs(){
    const {data,status}=await api.get('/favourites');

    console.log('favorites');
    console.log(data);

    if(status !==200){
        spanError.innerHTML=`Error:${status}`;
    }else{
        const section = document.querySelector('.favorites');
        section.innerHTML="";

        const h2= document.createElement('h2');
        const h2Text= document.createTextNode('favorites Dogs');

        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.map(item=>{
            const article=document.createElement('article');
            const img=document.createElement('img')
            const btn=document.createElement('button');
            const btnText=document.createTextNode('remove the dog from favorites');
            img.src= item.image.url;
            img.width=150;

            btn.appendChild(btnText);
            btn.onclick=()=> delateFavoriteDog(item.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });

    }



}


async function saveFavoriteDog(id){
    const {data,status}=await api.post('/favourites',{
        image_id:id,
    });

   
    console.log(data);


    if(status!==200){
        spanError.innerHTML=`Error : ${status}`;
    }else{
        console.log('added to favorites');
        favoritesDogs();
    }
}

async function delateFavoriteDog(id){
    const {data,status}=await api.delete(`/favourites/${id}`);
    console.log(data);
    if(status!==200){
        spanError.innerHTML=`Error : ${status}`;
    }else{
        console.log('deleted to favorites');
        favoritesDogs();
    }
}
// async function uploadDogPicture(){

//     const form=document.querySelector('.uploadingForm');
//     const formData=new FormData(form);
//     const {data,status}= await api.post('/upload',{
//         body:formData,
//     });

//     if (response.status !== 200) {
//         spanError.innerHTML = 'Error: ' + response.status;
//     } else {
//         console.log('DONE UPLOAD');
//         console.log({data});
//         console.log(data.url);
//         saveFavoriteDog(data.id);//to save in section favorites after upload the img 
//     }
// }
randomDogs();
favoritesDogs();