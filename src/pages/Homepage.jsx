import CarouselCard from "../components/CarouselCard";
import CarouselCenter from "../components/Carousel";
export function HomePage() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12">
        <h1 className=" text-3xl text-white px-10 pt-10 font-bold" >Newest Movies</h1>
          <CarouselCenter />
        </div>
        <div className="md:col-span-12">
        <h1 className="text-3xl text-white px-10 pt-10 font-bold">Recommend Movies</h1>
          <CarouselCard />
        </div>
      </div>
    );
  }
  
  export default HomePage;
  
