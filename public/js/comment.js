//functions that creates a comment using the api
const newComment = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();

    if (event.target.hasAttribute('comment-id')) {
      const post_id = event.target.getAttribute('comment-id');


      if (comment_text) {
        const response = await fetch(`/api/comments`, {
          method: 'post',
          body: JSON.stringify({ 
            post_id, 
            comment_text 
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
//adds event listener to add comment button
  document.querySelector('.comment-post-form').addEventListener('click', newComment);