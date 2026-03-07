
const fetchData = async()=> {
    try{
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        displayData(data.data)

    }catch(error){
        console.log(error);
    }
}

const displayData = (data)=> {
    const displayContent = document.getElementById('display-content');
    displayContent.innerHTML = '';


    data.forEach(element => {
        // const status = element.status;
        const priority = element.priority;
        
        console.log(priority);
        // if(status === 'open'){

        // }
        
        console.log(element)
        console.log(element.id)
        const div = document.createElement('div');
        div.className = `bg-white px-3 py-6 rounded-lg shadow-xl ${priority === 'low' ? 'border-t-5 border-t-violet-700/60' : 'border-t-5 border-t-green-600/70'} `;
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
                            ${element.labels[0] === 'bug' ? '<i class="ph ph-bug-droid text-lg"></i>' : element.labels[0] === 'enhancement' ? '<i class="ph ph-sparkle"></i>' : '<i class="fa-regular fa-life-ring"></i>'} 
                            ${element.labels[0]}
                        </div>

                        <div 
                            class="${element.labels[1] === 'bug' ? 'bg-red-100 text-red-500 border border-red-300' : element.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-300' : element.labels[1] === 'help wanted' ? 'text-amber-600 border bg-amber-100 border-amber-300 ' : element.labels[1] === 'good first issue' ? 'text-blue-600 border bg-blue-100 border-blue-300 ': ''} px-1 py-1.5 rounded-3xl"
                        >
                            ${element.labels[1] ? '<i class="fa-regular fa-life-ring"></i>' : '' }${element.labels[1] ? element.labels[1] : '' }</div>
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

fetchData()