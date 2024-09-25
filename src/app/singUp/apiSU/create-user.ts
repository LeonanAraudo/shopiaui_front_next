interface UsersInfos{
    username: string
    password: string
}
export async function createUser({username, password}: UsersInfos){
   await fetch('http://127.0.0.1:3000/users',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
   })
}