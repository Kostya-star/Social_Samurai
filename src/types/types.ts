export type InitialStateProfilePhotosType = {small: string | null, large: string | null}
export type InitialStatePostsType = {id: number, message: string, likesCount: number}
export type InitialStateProfileContactsType = {
  github: string,
  vk: string,
  facebook: string,
  instagram: string,
  twitter: string,
  website: string,
  youtube: string,
  mainLink: string,
}
export type InitialStateProfileType = {
  userId: number, 
  lookingForAJob: boolean, 
  lookingForAJobDescription: string, 
  fullName: string,
  contacts: InitialStateProfileContactsType,
  photos: InitialStateProfilePhotosType,
}

export type UsersType = {
  id: number, 
  name: string, 
  status: string, 
  photos: InitialStateProfilePhotosType,
  followed: boolean
  }

