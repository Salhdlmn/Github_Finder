import Github from "./api.js";
import UI from "./ui.js";

const github = new Github()
const ui=new UI();


const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-btn");
const themBtn= document.getElementById('theme-btn')
const body = document.querySelector('body')

searchButton.addEventListener('click',getInput)
searchInput.addEventListener('keypress',(e)=>{
    if(e.code==='Enter'){
        getInput();
    }
});

themBtn.addEventListener('click',changeTheme)

function getInput(){

    if(searchInput.value !==''){


        // kullanıcı bilgileri ve repoları için api isteği at
        github.getUser(searchInput.value).then((data)=>{
            // eğer kullanıcı bulunamadıysa
            if(data.profile.message==='Not Found'){
                ui.showAlert('Kullanıcı Bulunamadı','alert-danger')
            }else{
                ui.showAlert('Kullanıcı Başarıyla Bulundu','alert-success')
                // api cevabına göre şekillenen 
                // kullanıcı detay alanını ekrana bas
                ui.showProfile(data.profile)   
        
                ui.showRepos(data.repos)

                

            }

        
        });

        return;
    }
    
    ui.showAlert('Form Alanı Boş Olamaz','alert-info')

}

function changeTheme(){
    body.classList.toggle('bg-dark')
    body.classList.toggle('text-bg-dark')

    if(body.classList.contains('bg-dark')){
        themBtn.innerText='Açık Mod'
    }else{
        themBtn.innerText='Koyu Mod'
    }

}