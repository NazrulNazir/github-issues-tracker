// card length
const issuLength = document.getElementById("issu-length");
const loading = document.getElementById('loading');
const modalClick = document.getElementById('my_modal_3');
const displayContent = document.getElementById('display-content');

const btnArea = document.getElementById('btn-area');



//===========================================
//      modal data fetch and display show
//===========================================

const modalData = async(id)=> {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    displayModaldata(data.data)
        
    }
// modal data display show
const displayModaldata = (data)=> {
    const status = data.status;
    const priority = data.priority;
    const displayModal = document.getElementById('displayModal');
    console.log(data)
    displayModal.innerHTML = '';
    modalClick.showModal()
    const div = document.createElement('div');
    div.className = 'bg-white modal-box sm:px-8 px-3';
    console.log(div)
        div.innerHTML = `

        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
            <div class="logo mt-5">
            <div class="flex justify-between items-center">
                <img class="w-10 h-10" src="${priority === 'low' ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt="#">
                <button class="px-10 py-1 text-lg ${priority === 'low' ? 'bg-gray-200 text-gray-500 rounded-3xl' : priority === 'high' ? 'bg-red-100 text-red-500 rounded-3xl' : 'bg-yellow-100 text-amber-600 rounded-3xl'}">${data.priority}</button>

            </div>
                <h3 class="text-lg font-semibold mt-5">${data.title}</h3>
                <p class="text-neutral-500 my-2">${data.description}</p>
                <div class="flex gap-5 mt-5">
                    <div 
                        class="${data.labels[0] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : data.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : data.labels[0] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : data.labels[0] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ' : 'text-pink-600 border bg-pink-100 border-pink-300 '} px-2 py-1.5 rounded-3xl flex items-center"
                    >
                        ${data.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : data.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': data.labels[0] === 'documentation' ? '<i class="ph ph-file-code"></i>' : data.labels[0] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : '<i class="ph ph-warning-octagon"></i>'} 
                        ${data.labels[0]}
                    </div>

                    <div 
                        class="${data.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : data.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : data.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : data.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl flex items-center"
                    >
                        ${data.labels[1] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : data.labels[1] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': data.labels[1] === 'documentation' ? '<i class="ph ph-file-code"></i>' : data.labels[1] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : data.labels[1] === 'good first issue' ? '<i class="ph ph-warning-octagon"></i>' : ''}${data.labels[1] ? data.labels[1] : '' }</div>
                </div>
            <div>

            </div>
        </div>
        <hr class="my-10 border-gray-300">
        <div>
            <p class="text-neutral-500 mb-1">#1by john_doe</p>
            <p class="text-neutral-500">1/15/2024</p>
        </div>
    `
    displayModal.appendChild(div);

}



const btnLoop = btnArea.children;
const allBtn = document.getElementById('all-btn');
// allBtn.addEventListener('click', ()=> {

//     for(let btn of btnLoop){
//         console.log(btn)
//     }
// })



//===========================================
//          all data fetch and display
//===========================================

const fetchData = async()=> {

    try{
        loading.classList.remove("hidden");
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        displayData(data.data)
        const allCardLength = data.data.length;
        issuLength.innerHTML = `${allCardLength} Issues`;
        loading.classList.add("hidden");
    }catch(error){
        console.log(error);
    }
}
// display show all, open, and closed data
const displayData = (data)=> {
    displayContent.innerHTML = '';
    const openData = data;


    const allBtn = document.getElementById('all-btn');
    allBtn.addEventListener('click', ()=> {
        const allCardLength = data.length;
        issuLength.innerHTML = `${allCardLength} Issues`;

        closeBtn.style.backgroundColor = '';
        closeBtn.style.color = '';
        openBtn.style.backgroundColor = '';
        openBtn.style.color = '';
        allBtn.classList.add('btn-background');
    })
    data.forEach(element => {
        const status = element.status;
        const priority = element.priority;        
        const div = document.createElement('div');

        div.addEventListener('click', ()=> {
            modalData(element.id)
        })

        div.className = `bg-white px-2 py-6 rounded-lg shadow-xl ${status === 'closed' ? 'border-t-5 border-t-violet-700/60' : 'border-t-5 border-t-green-600/70'} `;
        div.innerHTML = `
             <div class="logo">
                <div class="flex justify-between items-center">
                    <img class="w-10 h-10" src="${priority === 'low' ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt="#">
                    <button class="px-10 py-1 text-lg ${priority === 'low' ? 'bg-gray-200 text-gray-500 rounded-3xl' : priority === 'high' ? 'bg-red-100 text-red-500 rounded-3xl' : 'bg-yellow-100 text-amber-600 rounded-3xl'}">${element.priority}</button>

                </div>
                    <h3 class="text-lg font-semibold mt-5">${element.title}</h3>
                    <p class="text-neutral-500 my-2 line-clamp-2">${element.description}</p>
                    <div class="flex gap-1 mt-5">
                        <div 
                            class="${element.labels[0] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[0] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[0] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ' : 'text-pink-600 border bg-pink-100 border-pink-300 '} px-2 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[0] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[0] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : '<i class="ph ph-warning-octagon"></i>'} 
                            ${element.labels[0]}
                        </div>

                        <div 
                            class="${element.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[1] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[1] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[1] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[1] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : element.labels[1] === 'good first issue' ? '<i class="ph ph-warning-octagon"></i>' : ''}${element.labels[1] ? element.labels[1] : '' }</div>
                    </div>
                <div>

                </div>
            </div>
            <hr class="my-10 border-gray-300">
            <div>
                <p class="text-neutral-500 mb-1">#1by john_doe</p>
                <p class="text-neutral-500">1/15/2024</p>
            </div>
        `
        displayContent.appendChild(div);
    });

    // openbtn data display
    const openBtn = document.getElementById('open-btn');
    openBtn.addEventListener('click', ()=> {
        displayContent.innerHTML = '';
        const findOpenData = openData.filter(item => {

        openBtn.style.backgroundColor = '#155dfc';
        openBtn.style.color = '#fff';
        closeBtn.style.backgroundColor = '';
        closeBtn.style.color = '';
        allBtn.classList.remove('btn-background');

        return item.status !== 'closed';
;
    } )
    // console.log(filter)
    issuLength.innerHTML = `${findOpenData.length} Issues`;

    findOpenData.forEach(element => {
        const status = element.status;
        const priority = element.priority;
        const div = document.createElement('div');
        div.className = `bg-white px-2 py-6 rounded-lg shadow-xl ${status === 'closed' ? 'border-t-5 border-t-violet-700/60' : 'border-t-5 border-t-green-600/70'} `;

         div.addEventListener('click', ()=> {
            modalData(element.id)
        })
        
        div.innerHTML = `
             <div class="logo">
                <div class="flex justify-between items-center">
                    <img class="w-10 h-10" src="${priority === 'low' ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt="#">
                    <button class="px-10 py-1 text-lg ${priority === 'low' ? 'bg-gray-200 text-gray-500 rounded-3xl' : priority === 'high' ? 'bg-red-100 text-red-500 rounded-3xl' : 'bg-yellow-100 text-amber-600 rounded-3xl'}">${element.priority}</button>

                </div>
                    <h3 class="text-lg font-semibold mt-5">${element.title}</h3>
                    <p class="text-neutral-500 my-2 line-clamp-2">${element.description}</p>
                    <div class="flex gap-1 mt-5">
                        <div 
                            class="${element.labels[0] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[0] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[0] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ' : 'text-pink-600 border bg-pink-100 border-pink-300 '} px-2 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[0] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[0] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : '<i class="ph ph-warning-octagon"></i>'} 
                            ${element.labels[0]}
                        </div>

                        <div 
                            class="${element.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[1] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[1] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[1] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[1] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : element.labels[1] === 'good first issue' ? '<i class="ph ph-warning-octagon"></i>' : ''}${element.labels[1] ? element.labels[1] : '' }</div>
                    </div>
                <div>

                </div>
            </div>
            <hr class="my-10 border-gray-300">
            <div>
                <p class="text-neutral-500 mb-1">#1by john_doe</p>
                <p class="text-neutral-500">1/15/2024</p>
            </div>
        `
        displayContent.appendChild(div);
    });

    })


    // closebtn data display
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', ()=> {
        displayContent.innerHTML = '';
        const closeData = openData.filter(item => {

        closeBtn.style.backgroundColor = '#155dfc';
        closeBtn.style.color = '#fff';
        openBtn.style.backgroundColor = '';
        openBtn.style.color = '';
        allBtn.classList.remove('btn-background');

        return item.status !== 'open';
;
    } )
    issuLength.innerHTML = `${closeData.length} Issues`;

    closeData.forEach(element => {
        const status = element.status;
        const priority = element.priority;
        
        const div = document.createElement('div');
        div.className = `bg-white px-2 py-6 rounded-lg shadow-xl ${status === 'closed' ? 'border-t-5 border-t-violet-700/60' : 'border-t-5 border-t-green-600/70'} `;

         div.addEventListener('click', ()=> {
            modalData(element.id)
        })

        
        div.innerHTML = `
             <div class="logo">
                <div class="flex justify-between items-center">
                    <img class="w-10 h-10" src="${priority === 'low' ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt="#">
                    <button class="px-10 py-1 text-lg ${priority === 'low' ? 'bg-gray-200 text-gray-500 rounded-3xl' : priority === 'high' ? 'bg-red-100 text-red-500 rounded-3xl' : 'bg-yellow-100 text-amber-600 rounded-3xl'}">${element.priority}</button>

                </div>
                    <h3 class="text-lg font-semibold mt-5">${element.title}</h3>
                    <p class="text-neutral-500 my-2 line-clamp-2">${element.description}</p>
                    <div class="flex gap-1 mt-5">
                        <div 
                            class="${element.labels[0] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[0] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[0] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ' : 'text-pink-600 border bg-pink-100 border-pink-300 '} px-2 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[0] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[0] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : '<i class="ph ph-warning-octagon"></i>'} 
                            ${element.labels[0]}
                        </div>

                        <div 
                            class="${element.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[1] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[1] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[1] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[1] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : element.labels[1] === 'good first issue' ? '<i class="ph ph-warning-octagon"></i>' : ''}${element.labels[1] ? element.labels[1] : '' }</div>
                    </div>
                <div>

                </div>
            </div>
            <hr class="my-10 border-gray-300">
            <div>
                <p class="text-neutral-500 mb-1">#1by john_doe</p>
                <p class="text-neutral-500">1/15/2024</p>
            </div>
        `
        displayContent.appendChild(div);
    });

    })

}

fetchData()



//===========================================
//             search random data
//===========================================

document.getElementById('search-btn')
.addEventListener('click', ()=> {    
    const getSearchValue = document.getElementById('search-input-data').value;
    searchData(getSearchValue)
})

const searchData = async(searchText)=> {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await res.json();
    displayShowSearchData(data.data);
}


// search data display show
const displayShowSearchData = (data)=> {
    displayContent.innerHTML = '';
    data.forEach(element => {
        const status = element.status;
        const priority = element.priority;        
        const div = document.createElement('div');

        div.addEventListener('click', ()=> {
            modalData(element.id)
        })

        div.className = `bg-white px-2 py-6 rounded-lg shadow-xl ${status === 'closed' ? 'border-t-5 border-t-violet-700/60' : 'border-t-5 border-t-green-600/70'} `;
        div.innerHTML = `
             <div class="logo">
                <div class="flex justify-between items-center">
                    <img class="w-10 h-10" src="${priority === 'low' ? './assets/Closed- Status .png' : './assets/Open-Status.png'}" alt="#">
                    <button class="px-10 py-1 text-lg ${priority === 'low' ? 'bg-gray-200 text-gray-500 rounded-3xl' : priority === 'high' ? 'bg-red-100 text-red-500 rounded-3xl' : 'bg-yellow-100 text-amber-600 rounded-3xl'}">${element.priority}</button>

                </div>
                    <h3 class="text-lg font-semibold mt-5">${element.title}</h3>
                    <p class="text-neutral-500 my-2 line-clamp-2">${element.description}</p>
                    <div class="flex gap-1 mt-5">
                        <div 
                            class="${element.labels[0] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[0] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[0] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ' : 'text-pink-600 border bg-pink-100 border-pink-300 '} px-2 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[0] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[0] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : '<i class="ph ph-warning-octagon"></i>'} 
                            ${element.labels[0]}
                        </div>

                        <div 
                            class="${element.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl flex items-center"
                        >
                            ${element.labels[1] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[1] === 'enhancement' ? '<i class="ph ph-sparkle"></i>': element.labels[1] === 'documentation' ? '<i class="ph ph-file-code"></i>' : element.labels[1] === 'help wanted' ? '<i class="fa-regular fa-life-ring"></i>' : element.labels[1] === 'good first issue' ? '<i class="ph ph-warning-octagon"></i>' : ''}${element.labels[1] ? element.labels[1] : '' }</div>
                    </div>
                <div>

                </div>
            </div>
            <hr class="my-10 border-gray-300">
            <div>
                <p class="text-neutral-500 mb-1">#1by john_doe</p>
                <p class="text-neutral-500">1/15/2024</p>
            </div>
        `
        displayContent.appendChild(div);
    });
}