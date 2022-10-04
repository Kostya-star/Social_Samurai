import { InitialStatePostsType } from '../types/types';
import profileReducer, {profileActions} from './profile-reducer';


let state = {
  posts: [
    { id: 1, message: 'hey yo', likesCount: 15 },
    { id: 2, message: 'sup nigga', likesCount: 20 },
  ] as Array<InitialStatePostsType>,
  profile: null,
  status: '',
  newPostText: '',
};

it('length of posts should be incremented', () => {
  let action = profileActions.addPostActionCreator('yoyoyo');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(5);
});

