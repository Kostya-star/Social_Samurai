import './App.css';

const App = () => {
  return (
    <div className='app-wrapper'>
      <header className='header'>
        <img src='https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/02/9388351_orig.png?auto=format&q=60&fit=max&w=930'></img>
      </header>
      <nav className='nav'>
        <div>
         <a>Profile</a> 
        </div>
        <div>
        <a>Messages</a> 
        </div>
      </nav>
      <div className='content'>
        <div>
          <img className='nature-img' src='https://picfiles.alphacoders.com/278/278586.jpg'></img>
        </div>
        <div>
          ava + description
        </div>
        <div>
          My posts
          <div>
            New post
          </div>
          <div>
            <div>
              post1
            </div>
            <div>
              post2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
