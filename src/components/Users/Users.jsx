import s from './users.module.css'

let Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
    
      { id: 1, photoUrl: 'https://img.lovepik.com/free-png/20211229/lovepik-customer-service-personnel-icon-png-image_400960948_wh860.png', 
      fullName: 'Costya', status: 'Im the boss of course!', location: {city: 'Bender', country: 'Moldova'} },
  
      { id: 2, photoUrl: 'https://img.lovepik.com/free-png/20211229/lovepik-customer-service-personnel-icon-png-image_400960948_wh860.png', 
      fullName: 'Alexandro Van Den Boogert', status: 'Im the 2nd boss of course!', location: {city: 'Amsterdam', country: 'Netherlands'} },
  
      { id: 3, photoUrl: 'https://img.lovepik.com/free-png/20211229/lovepik-customer-service-personnel-icon-png-image_400960948_wh860.png', 
      fullName: 'Vika', status: 'Im the 3rd boss of course!', location: {city: 'Uhta', country: 'USA'} },
    ])
  }
  return <div>
      {
      props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={s.userPhoto}/>
            </div>
            <div>
              {u.followed ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>:
              <button onClick={() => {props.follow(u.id)}}>Follow</button>
            }

            </div>
          </span>

          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>)
        }
  </div>
}

export default Users;