import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { NavItem } from "./components/landing-page";
import pattern from './assets/images/circle-scatter-haikei.svg'
import snapshot from './assets/images/screenshot.jpeg'
function App() {
  const dropDownItems = [
    {
      name: "Platform",
      children: [
        {
          name: "Admin",
          link: "/auth/admin/login",
        },
        {
          name: "Employee",
          link: "/employee",
        },
      ],
    },
    {
      name: "Product",
      children: [
        {
          name: "Payroll",
          link: "/employee",
        },
        {
          name: "Leave Management",
          link: "/auth/admin/login",
        },
        {
          name: "Attendance Management",
          link: "/employee",
        },
        {
          name: "Recruitment Management",
          link: "/employee",
        },
      ],
    },
    {
      name: "Developer",
      children: [
        {
          name: "API Documentation",
          link: "/auth/admin/login",
        },
        {
          name: "Node SDK",
          link: "/employee",
        },
        {
          name: "Spring SDK",
          link: "/employee",
        },
        {
          name: "React SDK",
          link: "/employee",
        },
      ],
    },
    {
      name: "Pricing",
      children: [
        {
          name: "Startup",
          link: "/auth/admin/login",
        },
        {
          name: "Business",
          link: "/employee",
        },
        {
          name: "Enterprise",
          link: "/employee",
        },
      ],
    },
  ];
  return (
    <>
      <div className="bg-[#f1eee4] min-h-screen pb-12 hidden lg:block">
        <header className="flex justify-between items-center py-6 border-b-[0.75px] border-gray-300 px-6">
          <h1 className="text-left text-primary font-semibold text-2xl">
            HR<span className=" text-background">Xpert</span>
            <span className=" text-xs">ADMIN</span>
          </h1>

          <nav className="flex items-center gap-8">
            {dropDownItems.map((el, index) => {
              return <NavItem {...el} index={index} key={index} />;
            })}
          </nav>

          <div className="flex items-center text-[0.9rem] gap-4 ">
            <h4 className="text-[#2f0b6a] font-bold hover:bg-primary/10 p-2 rounded-lg cursor-pointer">
              Get Started
            </h4>

            <div className="hover:bg-[#E9E6D7FF] p-2 rounded-lg cursor-pointer flex gap-2 items-center">
              <h4>Log in</h4>
              <ArrowRightIcon className="h-4" />
            </div>
          </div>
        </header>

        <section className="max-w-[70%] mx-auto bg-[#2f0b6a] rounded-[4rem] p-[2.7rem] my-[3rem] relative z-[0]  ">
          <div className="flex items-center flex-col">
            <h2 className="text-center text-[3.2rem] text-white font-[800]">
              Revolutionize Workplace.
              <br />
              Elevate Efficiency.
              <br />
              with so much ease!
            </h2>
            <p className="text-center text-white my-8 text-[1.2rem] font-[300]">
              Effortlessly Enhance Operations and Unlock Untapped Team
              <br />
              Potential with Our Innovative HR Management App.
            </p>

            <button className="bg-white px-4 py-[0.75rem] text-[1rem] rounded-2xl hover:bg-[#ece8ff]">
              Get Started
            </button>
          </div>
          <div className="w-[45%]  bg-[#2f0b6a]/60   mt-[4rem]  text-black outline-2  mx-auto rounded-3xl p-4 border-[0.7rem] border-white g">
            <img src={snapshot} className="rounded-2xl  " alt="hrXpert" />
          </div>
          <img src={pattern} alt="" className="absolute left-0 bottom-0 z-[-1]  right-0 w-full" />
        </section>

        {/* <section className="max-w-[70%] mx-auto border-[0.9px] border-gray-300 rounded-2xl p-[2.7rem] bg-slate-100/25 text-primary">
            <p className="py-8 text-center">Serving hundreds of businesses of all types</p>
        </section> */}
      </div>
      <div className="min-h-[100svh] grid place-items-center lg:hidden">
        <p className="text-center">Gotch 🤣 and open it on a large screens(desktop)</p>
      </div>
    </>
  );
}

export default App;
