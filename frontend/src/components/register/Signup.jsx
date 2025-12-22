export default function Signup () {
    return(
         <form
            className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
            action=""
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
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            <button className="cursor-pointer font-light w-54 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
                Create Account
            </button>
          </form>
    )
}