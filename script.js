let mainWrapperPost = document.getElementById('post-block');
let overLayContent = document.getElementById('overLay');
let closeOverLay = document.getElementById('close');
let content = document.getElementById('content');
let addButton = document.getElementById('add');
let postOverLay = document.getElementById('postOverLay');
let form = document.getElementById('form');
let buttonPost = document.getElementById('post-Button');
let appearPost = document.getElementById('div-appearPost');

// ვაგზავნი მოთხოვნას
function ajax(url,callback) {
    let request= new XMLHttpRequest();
    request.open('GET',url);
    request.addEventListener('load',function() {
  let data=JSON.parse(request.responseText);
     callback(data);
    // ?????    ეს ცოტა ვერ გავიგე , აქ რას აკეთებს
     
    });
    request.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printData(data);
});

function printData(data) {
    data.forEach(element => {
        createPost(element);
    });
}

// ამ ფუნქციის საშუალებით ვქმნი პოსტებს ჯს-დან
function createPost(item){
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');
    // data-id -ს ვანიჭებთ მნიშვნელობას id ,რის შემდეგც მასში ვარდებ პოსტის id -ის ნომერი.
    divWrapper.setAttribute('data-id',item.id);
    // ????ID-ისთვის მნიშვნელობის მინიჭება შემიძლია თუ არა , როდესაც ვიყენებ createElementByid,an classlist.add

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.id;

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.title;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Post';
    deleteButton.setAttribute('data-id',item.id);

    divWrapper.appendChild(h2Tag);
    divWrapper.appendChild(h3Tag);
    divWrapper.appendChild(deleteButton);

    // ვუმათებ addeventlistener -ს რომ დვაჭერ პოსტს რა მინდა რომ მოხდეს.

    divWrapper.addEventListener('click', function(event){
        // წმოიღებს კონკრეტულ id -ს
          let id = event.target.getAttribute('data-id'); 
        //   დაემაატება ამ აიდის კლასი,რომლის საშუალებითაც გამოჩნდება აიდის  უნიკალური ნომერი
          openOverLay(id);
    })

    deleteButton.addEventListener('click',function(event){
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletePost(id);
    });

    mainWrapperPost.appendChild(divWrapper);
    console.log(divWrapper);
}


function openOverLay(id) {
    overLayContent.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url,function(data){
        overLayFunction(data);

    })
    console.log(id);
}

 function deletePost(id){
     let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
     fetch(url, {
         method:'DELETE'
     })
    
 }


function overLayFunction(item){
    let titlePost = document.createElement('h3');
    titlePost.innerText = item.title;

    let description = document.createElement('p');
    description.innerText = item.body;

    content.appendChild(titlePost);
    content.appendChild(description);

}

closeOverLay.addEventListener('click',function(){
    overLayContent.classList.remove('active');
    content.innerHTML = ' ';
})

addButton.addEventListener('click',function(){
    postOverLay.classList.add('active-add');
})

form.addEventListener('submit',function(event){
    event.preventDefault();
    console.log(event.target);



// როგორ დავამატოთ ბ102 პოსტი რაც სერვერის ლინკზე არ არის.
    let formData = {
        title:event.target[0].value,
        title:event.target[1].value

    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

    //    მომხმარებელი ინფორმაციას რომ ჩაწერრს და დააწვება  პოსტის დამატებას ინფორმაცია უნდა წაიშალოს
         postOverLay.classList.remove('active-add');
         console.log(formData);
})
buttonPost.addEventListener('click',function(event) {

    appearPost.classList.add('appear-div');

    let divPPost= document.createElement('p');
    divPPost.innerText = formData.event.target[0];

    let divPPosts= document.createElement('p');
    divPPost.innerText = event.target[1];
    
    div-appearPost.appendChild(divPPost);
    div-appearPost.appendChild(divPPosts);

    buttonPost.classList.add('post-active');
    console.log(div-appearPost);


})










 