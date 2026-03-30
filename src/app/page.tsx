import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Couple from "@/components/Couple";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-theater-cream overflow-x-hidden">
      <MusicPlayer />
      <Hero />
      <Welcome />
      <Couple />
      <Countdown />
      <Events />
      <Gallery />
      <Footer />
    </main>
  );
}
