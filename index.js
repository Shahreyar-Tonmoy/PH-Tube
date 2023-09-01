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

        <button onclick="handleLoadVideo('${category?.category_id}')" class="btn active btn-sm bg-gray hover:bg-[#FF1F3D] text-lg hover:text-white rounded-md"><a class="tab hover:text-white">${category?.category}</a></button>

        
        `
        toggleLoadingSpinner(false)
        tabContainer.appendChild(div)


    });



}
const handleLoadVideo = async (categoryId) => {
    
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const videoData = data.data
    // console.log(videoData)
    const cardContainer = document.getElementById('card-container')

    cardContainer.innerHTML = ""
    videoData.forEach((cardCategory) => {
        // console.log(cardCategory?.authors?.[0]?.profile_name)
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        

        <div class="card">
        <figure><img class="rounded-lg w-[312px] h-[200px]" src="${cardCategory?.thumbnail}" alt="Shoes" /></figure>
        <div>
            <div class="flex gap-3 mt-5 ">
            <img class=" w-10 h-10 rounded-[40px]" src="${cardCategory?.authors?.[0]?.profile_picture
            }" />
            
                <h1 class="text-[18px] font-bold">
                   ${cardCategory?.title}
                </h1>
                

            </div>
            <div class="">
                <p class="ml-[51px] text-[14px] font-medium text-[#1b1a1a88] ">
                    ${cardCategory?.authors?.[0]?.profile_name}
                </p>
                <p class="pl-[51px] pt-[10px] text-[#1b1a1a88]">${cardCategory?.others?.views} views</p>
            </div>
             
        </div>
      </div>


        `
        
        cardContainer.appendChild(cardDiv)
    })

    


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


loadVideo()
handleLoadVideo(1000)