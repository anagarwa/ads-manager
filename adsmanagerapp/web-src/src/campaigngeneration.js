document.getElementById('campaignForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Extract data from form fields
    const title = document.getElementById('title').value;
    const startTime = new Date(document.getElementById('start-time').value).getTime(); // Convert to epoch time
    const endTime = new Date(document.getElementById('end-time').value).getTime(); // Convert to epoch time

    // Prepare the data object to be sent in the POST request
    const id = title.toLowerCase().replace(/\s/g, ''); // Lowercase without spaces
    const postData = {
        name: title,
        customer: 'starbucks',
        assets: [],
        stores: ['sanjose'],
        alottedSlots: 1,
        startDate: startTime,
        endDate: endTime
    };

    const thumbnailsContainer = document.getElementById('selected-thumbnails'); // Assuming this is the container for thumbnails

    // Iterate through the images in the thumbnailsContainer and gather their URLs
    const thumbnailImages = thumbnailsContainer.getElementsByTagName('img');
    for (let i = 0; i < thumbnailImages.length; i++) {
        postData.assets.push(thumbnailImages[i].src); // Push the image URLs into the assets array
    }

    // Send the POST request
    fetch(`https://postcampaign-p7pabzploq-uc.a.run.app?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post request successful:', data);
            alert('Campaign url : https://main--ads-campaign--sandesh-sinha.hlx.live/content/screens/locations/us/sanjose');
            // Perform actions with the response data if needed
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error);
            // Handle errors here, display an error message, etc.
        });
});