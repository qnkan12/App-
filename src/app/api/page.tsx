import { Background3D } from "@/components/Background3D";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Stats } from "@/components/Stats";
import { TechStack } from "@/components/TechStack";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";

export default function Page() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Process />
        <Stats />
        <TechStack />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <Loader />
    </>
  );
}
