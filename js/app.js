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
        <button class="btn btn-info text-light"> Show Details </button>
    </div>`;
    toolsContainer.appendChild(toolDiv);
        
    });
}

// load tool details
const loadToolDetails = () =>{
    
}

loadTools();

