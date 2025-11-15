export default function Header() {
  return (
    <header className="w-full h-[10vh] flex gap-22 px-12 bg-white items-center">
        <img className="h-[9vh]" src="./HavenSpaceLogo.png" alt="Logo" />
      <nav className="w-full">
        <ul className="flex justify-between">
            <div className="flex gap-12 h-[10vh] items-center">
            <li className="cursor-pointer hover:pb-0 hover:transition-all hover:border-b-2 border-black">HOME</li>
            <li className="cursor-pointer hover:pb-0 hover:transition-all hover:border-b-2 border-black">PROPERTIES</li>
            <li className="cursor-pointer hover:pb-0 hover:transition-all hover:border-b-2 border-black">CONTACT</li>
            </div>

            <div className="flex gap-12 items-center">
            <li>Login</li>
            <li>Register</li>
            </div>
        </ul>
      </nav>
    </header>
  );
}