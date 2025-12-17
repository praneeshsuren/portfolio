import { useRef, useState } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();
  const [activeEducation, setActiveEducation] = useState(1);

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1: Intro */}
        <div className="grid-default-color grid-1 bg-black-200 flex flex-col h-full relative rounded-3xl overflow-hidden pt-6">
          <div className="absolute inset-0 h-full w-full flex flex-col">
            <video
              src="assets/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="flex-1 relative z-10">
              <img
                src="assets/praneesh.png"
                className="absolute h-95 w-full -bottom-2 left-4 object-contain"
                alt="Praneesh Surendran"
              />
            </div>

            <div className="z-20 relative w-full backdrop-blur-md bg-black/30 p-6 border-t border-white/10">
              <p className="headtext text-white">Hi, I&apos;m Praneesh Surendran</p>
              <p className="subtext text-white/80">
                I build complete software solutions, from frontend interfaces to
                backend systems, focused on quality, performance, and scalability.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-black-200 via-black-200/50 to-transparent" />
          </div>
        </div>

        {/* Grid 2: Code is Craft */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="OOP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div>
        </div>

        {/* Grid 6: Education */}
        <div className="grid-default-color grid-6 relative overflow-hidden">
          <div className="z-10 h-full flex flex-col p-4">
            <p className="headtext text-white/90">Education</p>
            <div className="mt-7 flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2 relative h-full">
              {/* Timeline Line */}
              <div className="absolute left-[5px] top-[8px] bottom-8 w-0.5 bg-white/20 pointer-events-none" />

              <div
                className="flex gap-4 group relative z-10 cursor-pointer"
                onMouseEnter={() => setActiveEducation(1)}
              >
                <div
                  className={`flex flex-col items-center mt-1.5 flex-none transition-transform duration-300 ${activeEducation === 1 ? "scale-110" : "group-hover:scale-110"
                    }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)] ${activeEducation === 1
                      ? "bg-mint shadow-[0_0_10px_#57db96]"
                      : "bg-white group-hover:bg-mint group-hover:shadow-[0_0_10px_#57db96]"
                      }`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold transition-colors duration-300 ${activeEducation === 1
                      ? "text-mint"
                      : "text-white group-hover:text-mint"
                      }`}
                  >
                    B.Sc (Hons) in Software Engineering
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${activeEducation === 1 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`flex items-center gap-3 mt-2 transition-opacity duration-500 delay-75 ${activeEducation === 1 ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg bg-white/10 p-1.5 flex items-center justify-center border transition-colors duration-300 ${activeEducation === 1
                            ? "border-mint/30"
                            : "border-white/10 group-hover:border-mint/30"
                            }`}
                        >
                          <img
                            src="assets/education/ucsc.png"
                            alt="UCSC Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-300 font-medium">
                            University of Colombo School of Computing
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                            2023 - 2027
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex gap-4 group relative z-10 cursor-pointer"
                onMouseEnter={() => setActiveEducation(2)}
              >
                <div
                  className={`flex flex-col items-center mt-1.5 flex-none transition-transform duration-300 ${activeEducation === 2 ? "scale-110" : "group-hover:scale-110"
                    }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)] ${activeEducation === 2
                      ? "bg-mint shadow-[0_0_10px_#57db96]"
                      : "bg-white group-hover:bg-mint group-hover:shadow-[0_0_10px_#57db96]"
                      }`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold transition-colors duration-300 ${activeEducation === 2
                      ? "text-mint"
                      : "text-white group-hover:text-mint"
                      }`}
                  >
                    Higher Secondary Education
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${activeEducation === 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`flex items-center gap-3 mt-2 transition-opacity duration-500 delay-75 ${activeEducation === 2 ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg bg-white/10 p-1.5 flex items-center justify-center border transition-colors duration-300 ${activeEducation === 2
                            ? "border-mint/30"
                            : "border-white/10 group-hover:border-mint/30"
                            }`}
                        >
                          <img
                            src="assets/education/sack.png"
                            alt="SACK Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-300 font-medium">
                            St. Anthony&apos;s College, Kandy
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                            2019 - 2022
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-mint/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Grid 7: Certifications */}
        <div className="grid-default-color grid-7">
          <div className="z-10 h-full flex flex-col justify-between p-2">
            <div>
              <p className="headtext text-white/90">Certifications</p>
              <p className="subtext">
                Continuous learning is my passion. Here are some of my achievements.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {["AWS Certified Developer", "Meta Frontend Developer", "Google UX Design", "HackerRank Problem Solving"].map((cert, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mint/50 transition-all duration-300 cursor-default">
                  <span className="text-sm text-neutral-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid 3: Globe */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-full h-full flex flex-col justify-between">
            <div>
              <p className="headtext">Time Zone</p>
              <p className="subtext">I&apos;m from planet Earth, and open to remote work.</p>
            </div>
            <div className="self-center translate-y-4 scale-110">
              <Globe />
            </div>
          </div>
        </div>

        {/* Grid 4: Contact */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full p-4">
            <p className=" headtext text-white">
              Ready to create something amazing?
            </p>
            <CopyEmailButton />
          </div>
        </div>

        {/* Grid 5: Tech Stack */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools that
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
