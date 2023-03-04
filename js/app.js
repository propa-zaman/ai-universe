const loadTools = () =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools))
}

const displayTools = (tools) =>{
    const toolsConatiner = document.getElementById('tools-container');
    
    // display all AI tools
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card" style="width: 25rem;">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">

            <ol class="list-group list-group-flush">
                <h5 class="card-title">Features</h5>
                <li class="list-group-item">${tool.features[0]}</li>
                <li class="list-group-item">${tool.features[1]}</li>
                <li class="list-group-item">${tool.features[2]}</li>
            </ol>


            <h4 class="card-title">${tool.name}</h4>
            <p class="card-text">${tool.published_in}</p>
        </div>
    </div>`;
    toolsConatiner.appendChild(toolDiv);
        
    });
}

loadTools();

