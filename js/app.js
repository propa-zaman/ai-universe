const loadTools = () => {
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools.slice(0, 6)))
}

const displayTools = (tools) => {
  const toolsContainer = document.getElementById('tools-container');

  // display 6 AI tools
  const seeMore = document.getElementById('see-more');
  if (tools.length > 6) {
    seeMore.classList.add('d-none');
  }
  else {
    seeMore.classList.remove('d-none');
  }

  //  sort by date call

  document.getElementById('sort-by-date').addEventListener('click', function () {

    sortByDate(tools);
  })


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



// see more button
const seeMore = () => {
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools.slice(6, 12)))
}

// sort by date
const sortByDate = (tools) => {
  // newest first
  tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
}



// load tool details
const loadToolDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  displayToolDetails(data.data);
}

const displayToolDetails = tool => {
  console.log(tool);
  const modalTitle = document.getElementById('toolDetailsModalLabel');
  modalTitle.innerText = tool.tool_name;

  const leftCardTitle = document.getElementById('left-card-title');
  leftCardTitle.innerText = tool.description;


  document.getElementById('right-div').innerHTML = `
         <img src="${tool.image_link[0] ? tool.image_link[0] : 'Not Found Image'}" class="card-img-top rounded" alt="...">
         <div class="accuracy">
                    ${tool.accuracy.score * 100 > 80 ? '<button class="btn btn-success">Accuracy: ' + tool.accuracy.score * 100 + '%</button>' : '<button class="btn btn-danger">Accuracy Low</button>'
    }

        </div>
            <div class="card-body">
                <h5 class="card-title text-center">${tool.input_output_examples[0].input}</h5>
                <p class="card-text text-center">${tool.input_output_examples[0].output}</p>
                
            </div>
    `;

  const divPricing = document.getElementById('pricing');
  divPricing.innerHTML = `
    <div class="col">
    <div class="card py-3 pricing-card ">
      <div class="card-body p-4  p-lg-1 text-center">
        <h5 class="card-title text-success">${tool.pricing[0].price}</h5>
        <h5 class="card-title text-success">${tool.pricing[0].plan}</h5>
      </div>
    </div>
  </div> 
  <div class="col">
  <div class="card py-3 pricing-card">
    <div class="card-body p-4  p-lg-1 text-center">
    <h5 class="card-title text-warning">${tool.pricing[1].price}</h5>
    <h5 class="card-title text-warning">${tool.pricing[1].plan}</h5>
    </div>
  </div>
</div> 
<div class="col">
<div class="card py-1 pricing-card">
  <div class="card-body p-4 p-lg-1 text-center">
    <h5 class="card-title text-danger">${tool.pricing[2].price}</h5>
    <h5 class="card-title text-danger">${tool.pricing[2].plan}</h5>
  </div>
</div>
</div> 
    `;

  const featureIntegration = document.getElementById('feature-integration');
  featureIntegration.innerHTML = `
    <div class="col">
    <div class="card pricing-card ">
      <div class="card-body p-1">
        <h3 class="card-title fw-bold">Feature</h3>
        <ul>
        <li>${tool.features[1].feature_name} </li>
        <li>${tool.features[2].feature_name} </li>
        <li>${tool.features[3].feature_name} </li>
        </ul>
      </div>
    </div>
  </div> 
  <div class="col">
  <div class="card pricing-card ">
    <div class="card-body p-1">
    <h3 class="card-title fw-bold">Integration</h3>
        <ul>
        <li>${tool.integrations[0] ? tool.integrations[0] : '<b class="text-danger">No Data Found</b>'} </li>
        <li>${tool.integrations[1] ? tool.integrations[1] : '<b class="text-danger">No Data Found</b>'} </li>
        <li>${tool.integrations[2] ? tool.integrations[2] : '<b class="text-danger">No Data Found</b>'} </li>
        </ul>
    </div>
  </div>
</div> 
    `
}


loadTools();

