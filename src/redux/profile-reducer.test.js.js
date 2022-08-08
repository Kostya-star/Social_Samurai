import profileReducer, {addPostActionCreator} from './profile-reducer';

it('length of posts should be incremented', () => {
  let action = addPostActionCreator('yoyoyo');

  let state = {
    posts: [
      { id: 1, message: 'hey yo', likesCount: 15 },
      { id: 2, message: 'sup nigga', likesCount: 20 },
    ],
  };

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(5);
});

