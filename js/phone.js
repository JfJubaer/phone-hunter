const loadPhone = (searchText,datalimit) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=>res.json())
    .then(data=>displayPhone(data.data,datalimit));
}

const displayPhone = (phones,datalimit)=>{
    const container = document.getElementById('phone-container');
    container.innerHTML = '';
    const show = document.getElementById('show');
    if(datalimit && phones.length >5){
        phones = phones.slice(0,5);
        show.classList.remove('d-none');
    }
    else{
        show.classList.add('d-none');
    }
    
    const info = document.getElementById('info');
    if(phones.length ==0){
        info.classList.remove('d-none');
    }
    else{
        info.classList.add('d-none');
    }
   phones.forEach(phone => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML =`
    <div class="card">
                    <img src="${phone.image}" class="card-img-top p-5" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.brand}</h5>
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <button onclick="loadDetails('${phone.slug}')"  class="btn btn-primary text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                  </div>`
                ;
    container.appendChild(div);
    
   });
   spinner(false);
}



const spinner = isLoading =>{
    const spinner = document.getElementById('loader');
    if(isLoading == true){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

const searchProcess = (datalimit) =>{
    spinner(true);
    const input = document.getElementById('search-input');
    const inputValue = input.value ;
    loadPhone(inputValue,datalimit);

}

document.getElementById('search-button').addEventListener('click',function(){
    
   searchProcess(5);

})
document.getElementById('search-input').addEventListener('keypress',function(e){
    if(e.key== 'Enter'){
   searchProcess(5);
    }
})

document.getElementById('show-all').addEventListener('click',function(){

   searchProcess();

})

const loadDetails = id =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data=>displayPhonedetails(data.data));
}

const displayPhonedetails = phone =>{
    console.log(phone);
    const container = document.getElementById('exampleModalLabel');
    container.innerText = phone.name;
    const container2 = document.getElementById('modal-body');
    container2.innerHTML = `<p>${phone.mainFeatures.storage}</p>
                            <p>${phone.mainFeatures.displaySize}</p>
                            <p>${phone.mainFeatures.chipSet}</p>
                            
    `;
  
}

// loadPhone('oppo');
