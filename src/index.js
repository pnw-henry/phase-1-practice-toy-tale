let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');
  const newToyNameInput = document.getElementsByClassName("input-text")[0].value;
  const newToyURLInput = document.getElementsByClassName("input-text")[1].value;

  
  const toyBody = {};
      toyBody.name = newToyNameInput;
      toyBody.image = newToyURLInput;
      toyBody.likes = 0;
      toyBody.id = parseInt(Math.random());
  
    const toyConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyBody)
      };

  fetch('http://localhost:3000/toys')
  .then ((r) => r.json())
  .then ((data) => {
    
    for (const toyKey of data){
      divCreator(toyKey, toyCollection);
    }

    const toyCards = document.getElementsByClassName("card");
    for (const card of toyCards){
      const likesElement = card.querySelector("p");
      const IdElement = card.querySelector("button");
      
      IdElement.addEventListener("click", () => {
        const newLikeCount = parseInt(likesElement.innerText) + 1;
        likesElement.innerText = newLikeCount;

        const updatedToyBody = {};
        updatedToyBody.likes = newLikeCount;
        
        const toyPatchConfig = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(updatedToyBody)
        }

        fetch(`http://localhost:3000/toys/${IdElement.id}`, toyPatchConfig)
        .then ((r) => r.json())
        .then ((data) => {
          console.log(data);
        })
        .catch((error) =>{
          console.log(error);
        })
      
      
      })
    }

  })

  toyFormContainer.addEventListener("submit", (e) => {
    
      e.preventDefault();
  
      if (newToyNameInput && newToyURLInput){
  
        fetch ('http://localhost:3000/toys', toyConfig)
        .then((r) => r.json())
        .then((toyData) => {
          divCreator(toyData, toyCollection);
        })
        .catch((error) => {
          alert(error.message);
        });
      }
      else{
        alert("Enter valid input!");
      }
    })
  
    addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})

function divCreator (toyKey, form){
  const toyDiv = document.createElement('div');
  toyDiv.className = 'card';
      
  const toyHeading = document.createElement('h2');
  toyHeading.innerText = toyKey.name;
      
  const toyImage = document.createElement('img');
  toyImage.src = toyKey.image;
  toyImage.className = 'toy-avatar';

  const toyLikes = document.createElement('p');
  toyLikes.innerText = toyKey.likes;
      
  const toyButton = document.createElement('button');
  toyButton.id = toyKey.id;
  toyButton.className = 'like-btn';
  toyButton.innerText = 'Like'
      
  toyDiv.append(toyHeading, toyImage, toyLikes, toyButton);
  form.appendChild(toyDiv);
}