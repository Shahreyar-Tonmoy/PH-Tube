
const loadVideo = async () => {
    toggleLoadingSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    const video = data.data
    // console.log(video)
    const tabContainer = document.getElementById("tab-container")

    video.forEach((category) => {
        const div = document.createElement('div')
        div.innerHTML = `

        <button onclick="handleLoadVideo('${category?.category_id}')" class="btn active btn-sm bg-gray hover:bg-[#FF1F3D] text-lg  hover:text-white rounded-md"><a class="tab hover:text-white">${category?.category}</a></button>

        
        `
        toggleLoadingSpinner(false)
        tabContainer.appendChild(div)


    });



}


const handleLoadVideo = async (categoryId) => {
    toggleLoadingSpinner(true)

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const videoData = data.data

    // console.log(videoData)



    const cardContainer = document.getElementById('card-container')

    cardContainer.innerHTML = ""

   


    videoData.forEach((cardCategory) => {


        const cardDiv = document.createElement('div')


        function secondsToHMS(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);

            return { hours, minutes };
        }
        const postedDate = parseFloat(cardCategory?.others?.posted_date);
        const { hours, minutes } = secondsToHMS(postedDate);



        cardDiv.innerHTML = `
        

        <div class="card">
        <div class="relation">
        <img class="rounded-lg w-[312px] h-[200px]" src="${cardCategory?.thumbnail}" alt="Shoes" />
        

        </div>
        <div class="absolute ">
     ${postedDate ? `<p class="absolute w-[100px] text-[9px] lg:px-2 ml-[165px] md:ml-[175px] lg:ml-[165px]  bg-[#0000009a]  text-white rounded-[8px]
     py-1 pl-3  mt-[165px] ">${hours} hrs ${minutes} min ago</p>` : ""}
      </div>
        
        
        <div>
            <div class="flex gap-3 mt-5 ">
            <img class=" w-10 h-10 rounded-[40px]" src="${cardCategory?.authors?.[0]?.profile_picture
            }" />
            
                <h1 class="text-[18px] font-bold">
                   ${cardCategory?.title}
                </h1>
                

            </div>
            <div class="">
                <div class="flex gap-2 items-center">
                <p class="ml-[51px] text-[14px] font-medium text-[#1b1a1a88] ">
                    ${cardCategory?.authors?.[0]?.profile_name}
                </p>
                <div>
                ${cardCategory?.authors?.[0]?.verified ? `<img src="./images/fi_10629607.png" alt="">` : ""}
                </div>
                
                </div>
                <p class="pl-[51px] pt-[10px] text-[#1b1a1a88]">${cardCategory?.others?.views} views</p>
            </div>
             
        </div>
      </div>


        `



        cardContainer.appendChild(cardDiv)






    })
    const error = document.getElementById('error')

    const div = document.createElement("div")
    div.innerHTML = `
    <div class="block justify-center -mt-10">${videoData?.length ? "" : `<img class="mx-auto" src="./images/Icon.png" alt=""> <br> <h1 class="text-center font-bold mb-8 text-xl lg:text-3xl">Oops!! Sorry, There is no <br> content here</h1>`}</div>
    
    `
    error.innerHTML = ""
    toggleLoadingSpinner(false)
    error.appendChild(div)




}

const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isloading) {
        loadingSpinner.classList.remove('hidden')

    }

    else (
        loadingSpinner.classList.add('hidden')
    )
}





const sortByViews=async()=>{
    
    const res= await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data=await res.json();
    const sortData=data.data
 
    
    
    sortData.sort((a,b)=>{
        a=Number.parseFloat(a.others.views);
        b=Number.parseFloat(b.others.views);
        if(a>b){
            return -1;
        }
        else if(a<b){
            return 1;
        }
        return 0;
    })
    
    const displaySortData=document.getElementById('card-container')
    displaySortData.innerHTML=" ";
    
  
    sortData.forEach((displayAllData) =>{
    function secondsToHMS(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      
      return { hours, minutes };
      }
      const postedDate = parseFloat(displayAllData?.others?.posted_date);
      const { hours, minutes } = secondsToHMS(postedDate);
      
  
  
    const div = document.createElement('div')
    div.innerHTML = `
       
      

    <div class="card">
    <div class="relation">
    <img class="rounded-lg w-[312px] h-[200px]" src="${displayAllData?.thumbnail}" alt="Shoes" />
    

    </div>
    <div class="absolute ">
 ${postedDate ? `<p class=" w-[100px] text-[9px] lg:px-2 ml-[165px] md:ml-[175px] lg:ml-[165px]  bg-[#0000009a]  text-white rounded-[8px]
 py-1 pl-3  mt-[165px] ">${hours} hrs ${minutes} min ago</p>` : ""}
  </div>
    
    
    <div>
        <div class="flex gap-3 mt-5 ">
        <img class=" w-10 h-10 rounded-[40px]" src="${displayAllData?.authors?.[0]?.profile_picture
        }" />
        
            <h1 class="text-[18px] font-bold">
               ${displayAllData?.title}
            </h1>
            

        </div>
        <div class="">
            <div class="flex gap-2 items-center">
            <p class="ml-[51px] text-[14px] font-medium text-[#1b1a1a88] ">
                ${displayAllData?.authors?.[0]?.profile_name}
            </p>
            <div>
            ${displayAllData?.authors?.[0]?.verified ? `<img src="./images/fi_10629607.png" alt="">` : ""}
            </div>
            
            </div>
            <p class="pl-[51px] pt-[10px] text-[#1b1a1a88]">${displayAllData?.others?.views} views</p>
        </div>
         
    </div>
  </div>


    `
    displaySortData.appendChild(div)
  
  })


  }


loadVideo()
handleLoadVideo(1000)









