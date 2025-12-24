export default function Login (){

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })

    const data = await result.json();

    localStorage.setItem('token', data.token);

    console.log(data)
  }

    return (
         <form
            className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
            onSubmit={loginHandler}
          >
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="password"
              placeholder="Password"
              name="password"
            />
            <button type="submit" className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
                Login
            </button>
          </form>
    )
}