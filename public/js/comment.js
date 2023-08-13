const newFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-text').value.trim();

    if (event.target.hasAttribute('data-id')) {
      const post_id = event.target.getAttribute('data-id');


      if (content) {
        const response = await fetch(`/api/comments`, {
          method: 'post',
          body: JSON.stringify({ 
            post_id, 
            content 
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace(`/post/${post_id}`);
        } else {
          alert('Failed to update post');
        }
      }
    }
  };


  document
  .querySelector('.comment-post-form')
  .addEventListener('click', newFormHandler);