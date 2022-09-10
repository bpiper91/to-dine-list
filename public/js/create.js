async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="restaurant-name"]').value;
    const cuisine_id = document.querySelector('select[name="cuisine"]').value;
    const location = document.querySelector('input[name="location"]').value;
    const rating = document.querySelector('select[name="rating"]').value;
    const note = document.querySelector('textarea[name="note"]').value;

    const response = await fetch(`/api/restaurants`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        cuisine_id,
        location,
        rating,
        note,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/restaurants');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#').addEventListener('submit', newFormHandler); //need to add btn id