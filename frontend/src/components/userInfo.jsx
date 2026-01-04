import { useAuth } from "../hooks/useAuth";

export default function UserInfo() {
  const { user } = useAuth();
  if (user) {
    return (
      <div className="w-12/12 mx-auto min-h-96 h-auto flex items-center gap-10 justify-start bg-gray-200 relative rounded-md p-5">
            
    <a href='/' className="absolute top-5 right-10 bg-gray-600 p-3 hover:p-4 transition-all text-white rounded-md" >View More Iformations</a>
        <img
          className="w-74 h-74 object-cover rounded-2xl"
          src={`http://localhost:8080/assets/${user.avatar}`}
          alt="Agent image"
        />
        <div className="flex flex-col gap-5">
          <div>
              <p className="font-bold text-2xl">{user.name} {user.surname}</p>
            <p className="text-sm font-light text-gray-600">{user.position}</p>
          </div>
          <div className="w-74">
            <p className="text-sm text-left max-w-full wrap-break-word">{user.description}</p>
          </div>
        </div>
        <div>
            <div className="flex gap-5"><p className=" text-2xl text-center">{user.soldProperties} <br /> Sold Properties</p> <p className="text-2xl text-center">{user.totalSales} <br /> Total Sales</p></div>
        </div>
        <div className="w-64 flex flex-col items-center gap-5">
            <p>{user.email}</p>
            <p className="text-xl font-bold">{user.phone}</p>
        </div>
      </div>
    );
  }
}
