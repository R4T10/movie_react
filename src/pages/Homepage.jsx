import CarouselCard from "../components/CarouselCard";
import CarouselCenter from "../components/Carousel";
export function HomePage() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12">
          <CarouselCenter />
        </div>
        <div className="md:col-span-12">
          <CarouselCard />
        </div>
      </div>
    );
  }
  
  export default HomePage;
  
