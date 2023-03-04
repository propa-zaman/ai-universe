const loadTools = () =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools))
}

const displayTools = (tools) =>{
    const toolsContainer = document.getElementById('tools-container');
    
    // display all AI tools
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card" style="width: 25rem;">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Features</h5>
            <ol class="list-group list-group-flush ps-4">
                
                <li>${tool.features[0] ? tool.features[0] : '<b class="text-danger">No Data Found</b>'}</li>
                <li>${tool.features[1] ? tool.features[1] : '<b class="text-danger">No Data Found</b>'}</li>
                <li>${tool.features[2] ? tool.features[2] : '<b class="text-danger">No Data Found</b>'}</li>
            </ol>


            <h4 class="card-title">${tool.name}</h4>
            <p class="card-text">${tool.published_in}</p>
        </div>
        <button onclick = "loadToolDetails('${tool.id}')" href="#" class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#toolDetailsModal">Show Details</button>
    </div>`;
    toolsContainer.appendChild(toolDiv);
        
    });
}

// load tool details
const loadToolDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayToolDetails(data.data);
}

const displayToolDetails = tool =>{
    console.log(tool);
    const modalTitle = document.getElementById('toolDetailsModalLabel');
    modalTitle.innerText = tool.tool_name;

    const leftCardTitle = document.getElementById('left-card-title');
    leftCardTitle.innerText = tool.description;

    const pricing = document.getElementById('pricing');
    pricing.innerHTML = `
    
    `;
}


loadTools();

