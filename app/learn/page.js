// "use client";
// import Header from "../global-components/Header";

// export default function Learn() {
//   return (
//     <>
//       <Header />

//       <div className="relative isolate bg-black px-6 pt-24  lg:px-8">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
//         >
//           <div
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//             className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
//           />
//         </div>
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl mt-4">
//           <h2 className="text-base font-semibold leading-7 text-green-400">
//             What is Mission Maniac?
//           </h2>
//           {/* <p className="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
//             Empower Creators. Fuel Missions.
//           </p> */}
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           An interactive platform where you can support your favorite content
//           creators by challenging them with exciting missions.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="bg-black px-6  lg:px-8">
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             What can I do on Mission Maniac?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           There are three main characters that have different roles. Mission
//           Maniacs, Recruiters, and Supporters.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="bg-black px-6  lg:px-8 relative isolate">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-3 -left-40 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
//         >
//           <div
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//             className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
//           />
//         </div>
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             What is a Mission Maniac?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           A Mission Maniac is anyone who accepts and completes missions.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>

//       <div className="bg-black px-6  lg:px-8">
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             What is a Recruiter?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           A Recruiter is anyone who creates missions for Mission Maniacs to
//           complete.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>

//       <div className="bg-black px-6  lg:px-8">
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             Well... What's a Mission?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           A mission is just a specific request of content. For example: "Upload
//           a video of yourself doing a handstand for 10 seconds."
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>

//       <div className="bg-black px-6  lg:px-8">
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             What is a Supporter?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           Sometimes Mission Maniacs' might set a funding goal to indicate how
//           hard the mission will be to complete. A Supporter is anyone who adds{" "}
//           <span className="underline decoration-green-400">Mission Points</span>{" "}
//           to a mission to help reach this goal.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>

//       <div className="bg-black px-6  lg:px-8">
//         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
//           <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
//             What are Mission Points?
//           </h2>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
//           Mission Points are virtual currency that can be bought in the shop.
//           These points can be used to help back missions of your choice.
//         </p>
//         <div className="flex items-center justify-center mt-10">
//           <img
//             className="h-40 w-40 rounded-full"
//             src="/mission_maniac_spy.webp"
//             alt=""
//           />
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import Header from "../global-components/Header";

export default function Learn() {
  return (
    <>
      <Header />

      <section className="relative isolate bg-black px-6 pt-24 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl mt-4">
          <h2 className="text-base font-semibold leading-7 text-green-400">
            What is Mission Maniac?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Mission Maniac is an interactive platform where content creators and
          fans can come together. Fans can challenge their favorite creators
          with missions, providing support and engagement.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_maniac_content.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            What can I do on Mission Maniac?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          On Mission Maniac, there are three main roles: Mission Maniacs,
          Recruiters, and Supporters.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_maniac_what_can_i_do.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8 relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -left-40 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            Who are the Mission Maniacs?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Mission Maniacs are content creators who accept and complete missions.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_maniac_spy.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            Who are the Recruiters?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Recruiters are users who create missions for Mission Maniacs to
          complete.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_recruiter.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            What is a Mission?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          A mission is a specific content request. For example: "Upload a video
          of yourself doing a handstand for 10 seconds."
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_maniac_mission.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            Who are the Supporters?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Supporters contribute Mission Points to help fund missions. These
          points help Mission Maniacs reach their funding goals for more
          challenging missions.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_supporters.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            What are Mission Points?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Mission Points are a virtual currency that you can buy in the shop.
          Use these points to support missions of your choice.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_points.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>

      {/* <section className="bg-black px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-green-400 pt-20">
            So basically...
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Mission Maniac is an interactive platform where content creators and
          fans can collaborate in a fun and engaging way. Users can request
          specific content from any creator on the web app, making it easy to
          work together on exciting ideas. Mission Points allow fans to support
          their favorite creators by contributing funds to a mission. If a
          mission is not completed, the Mission Points are refundable to the
          user. Content creators, known as Mission Maniacs, can only collect the
          Mission Points once the mission is successfully completed.
          Additionally, after a mission is marked as "completed," all supporters
          have the opportunity to vote on its authenticity, ensuring honesty and
          transparency.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-40 w-40 rounded-full"
            src="/mission_points.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section> */}
    </>
  );
}
