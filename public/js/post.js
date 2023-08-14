//new, edit and delete functions
const newPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  
  };
  
  const editPost = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('update-id')) {
      const id = event.target.getAttribute('update-id');
      const title = document.querySelector('#post-title').value.trim();
      const content = document.querySelector('#post-desc').value.trim();
  
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('POST EDITED')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };
// when update post button is pressed sends the user to the corresponding page
  const sendToUpdate = async (event) =>{
    if (event.target.hasAttribute('update-id')){
      const id = event.target.getAttribute('update-id');
      console.log('Update post id',id)
      document.location.replace(`./post/${id}/edit`)
    }
  }
  
  const deletePost = async (event) => {
    if (event.target.hasAttribute('delete-id')) {
      const id = event.target.getAttribute('delete-id');
      document.location.replace('/dashboard');
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete post. Status: ${response.status}`);
        }
        document.location.replace('/dashboard');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (document.querySelector('.new-post-form')) {
    document.querySelector('.new-post-form').addEventListener('submit', newPost);
  }
  if (document.querySelector('.post-list')){
    document.querySelector('.post-list').addEventListener('click', sendToUpdate)
  }
  if (document.querySelector('.edit-post-form')) {
      document.querySelector('.edit-post-form').addEventListener('click', editPost);
  }
  if (document.querySelector('.post-list')) {
    document.querySelector('.post-list').addEventListener('click', deletePost);
  }