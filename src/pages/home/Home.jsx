// import WishesCarousel from "@/components/WishesCarousel";

import CircularText from "@/components/ui/CircularText";
import HeroSection from "./HeroSection";
import ScrollDown from "@/components/ui/ScrollDown";
import LeafletMap from "@/components/ui/LeafletMap";

import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ShowDetails from "@/components/ui/ShowDetails";

import { ImageUp } from 'lucide-react';
// import { InfiniteMovingImages } from "@/components/ui/infinite-moving-cards";

import weddingImg1 from "@/assets/images/img1.jpeg";
import weddingImg2 from "@/assets/images/img2.jpeg";
import weddingImg3 from "@/assets/images/img3.jpeg";
import weddingImg4 from "@/assets/images/img4.jpeg";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { AnimateSvg } from "@/components/ui/AnimateSvg";
import Loader from "@/components/ui/Loader";

export default function Home() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const carouselImages = [weddingImg1, weddingImg2, weddingImg3, weddingImg4];
    const [api, setApi] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const plugin = Autoplay({ delay: 3000 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
        api.on("select", onSelect);

        return () => api.off("select", onSelect);
    }, [api]);


    const handleFilesChange = (files) => {
        const newImages = Array.from(files)
            .filter(file => file.type.startsWith("image/"))
            .map(file => {
                const reader = new FileReader();
                return new Promise(resolve => {
                    reader.onload = () => resolve({ src: reader.result, file });
                    reader.readAsDataURL(file);
                });
            });

        Promise.all(newImages).then(results => {
            setImages(prev => [...prev, ...results]);
        });
    };

    const handleFileInputChange = (e) => {
        handleFilesChange(e.target.files);
    };

    const handleDelete = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const openFileDialog = () => {
        document.getElementById("fileInput").click();
    };

    const handleAddToGallery = () => {
        if (onAddToGallery) {
            onAddToGallery(images); // send images to gallery
            setImages([]); // clear uploaded images
        }
    };
    return (
        <>
            {loading && <Loader onFinish={() => setLoading(false)} />}
            {!loading &&
                <>
                    <div className="relative">
                        
                        <HeroSection />
                        

                        <div className="absolute bottom-2 right-1/2 translate-x-1/2 z-50 hidden lg:block">
                            <ScrollDown onClick={() => {
                                document
                                    .getElementById("show-details")
                                    .scrollIntoView({ behavior: "smooth", });
                            }} />
                        </div>
                    </div>

                    <div className="w-full py-20 flex items-center justify-center bg-[#f5f1e9]">
                        <div id="show-details" className="max-w-7xl mx-auto w-full px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="w-full bg-white/60 backdrop-blur-md shadow-lg rounded-3xl p-6 border border-black/10"
                            >
                                <h2 className="text-4xl sm:text-5xl font-semibold text-center text-black/80 mb-8 tracking-wide">
                                    Engagement Information
                                    <div className="w-48 sm:w-64 mx-auto">
                                        <AnimateSvg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 225 43"
                                            className="my-svg-animation"
                                            path="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
                                            strokeColor="#e0bfb2"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            animationDuration={1.5}
                                            animationDelay={0}
                                            animationBounce={0.3}
                                            reverseAnimation={false}
                                            enableHoverAnimation={false}
                                        />
                                    </div>
                                </h2>

                                {/* 2 COLUMN LAYOUT */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* LEFT SIDE (INFO + BUTTON) */}
                                    <div className="flex flex-col justify-center gap-10">

                                        {/* INFO ITEMS */}
                                        <div className="space-y-10">

                                            {/* DATE */}
                                            <div className="flex flex-col sm:flex-row text-center sm:text-left items-center gap-4">
                                                <Calendar className="w-10 h-10 text-black/60" />
                                                <div>
                                                    <p className="text-lg font-medium text-black/80">Date</p>
                                                    <p className="text-xl font-semibold text-black">9 / 12 / 2024</p>
                                                </div>
                                            </div>

                                            {/* TIME */}
                                            <div className="flex flex-col sm:flex-row text-center sm:text-left items-center gap-4">
                                                <Clock className="w-10 h-10 text-black/60" />
                                                <div>
                                                    <p className="text-lg font-medium text-black/80">Time</p>
                                                    <p className="text-xl font-semibold text-black">7:30 PM</p>
                                                </div>
                                            </div>

                                            {/* LOCATION */}
                                            <div className="flex flex-col sm:flex-row text-center sm:text-left items-center gap-4">
                                                <MapPin className="w-10 h-10 text-black/60" />
                                                <div>
                                                    <p className="text-lg font-medium text-black/80">Location</p>
                                                    <p className="text-xl font-semibold text-black">
                                                        Analia, Al-Golf, Salah Salem St,<br />
                                                        Nasr City – Military Factories Club
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* BUTTON */}
                                        <div className="text-center sm:text-left">
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=30.082257,31.319505"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block"
                                            >
                                                <ShowDetails text="Open Location" />
                                            </a>
                                        </div>

                                    </div>

                                    {/* RIGHT SIDE (MAP) */}
                                    <div className="w-full h-[350px] rounded-xl overflow-hidden border border-black/20 shadow-md">
                                        <LeafletMap />
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                    <div id="view-gallery" className="max-w-7xl mx-auto py-16 mb-10 px-6">
                        <h2 className="text-4xl sm:text-5xl font-semibold text-center text-black/80 mb-8 tracking-wide">
                            Gallery

                            <div className="w-48 sm:w-64 mx-auto">
                                <AnimateSvg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 225 43"
                                    className="my-svg-animation"
                                    path="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
                                    strokeColor="#e0bfb2"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    animationDuration={1.5}
                                    animationDelay={0}
                                    animationBounce={0.3}
                                    reverseAnimation={false}
                                    enableHoverAnimation={false}
                                />
                            </div>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* LEFT: Upload Box */}
                            <div className="w-full flex flex-col justify-between rounded-lg border-2 border-dashed border-gray-400 h-40 md:h-80">
                                <div
                                    className="overflow-auto flex-1 cursor-pointer"
                                    onClick={images.length === 0 ? openFileDialog : undefined}
                                >
                                    {images.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full w-full">
                                            <ImageUp className="text-4xl text-gray-500 mb-4" />
                                            <p className="text-center text-gray-600 px-4">
                                                Click or drag images here to upload
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                                            {images.map((img, idx) => (
                                                <div key={idx} className="relative border rounded-lg overflow-hidden">
                                                    <img
                                                        src={img.src}
                                                        alt={`Uploaded ${idx}`}
                                                        className="w-full h-30 object-contain rounded-lg"
                                                        loading="lazy"
                                                    />
                                                    <button
                                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs sm:text-sm rounded"
                                                        onClick={() => handleDelete(idx)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {images.length > 0 && (
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <button
                                            onClick={() => document.getElementById("fileInput").click()}
                                            className="flex-1 bg-green-500 px-4 py-2 rounded text-white font-medium text-sm sm:text-base"
                                        >
                                            Add More Images
                                        </button>

                                        <button
                                            onClick={handleAddToGallery}
                                            className="flex-1 bg-blue-600 px-4 py-2 rounded text-white font-medium text-sm sm:text-base"
                                        >
                                            Add to Gallery
                                        </button>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileInputChange}
                                />
                            </div>

                            {/* RIGHT: Carousel */}
                            <div className="w-full">
                                <Carousel
                                    className="w-full"
                                    opts={{ loop: true, align: "center" }}
                                    plugins={[plugin]}
                                    setApi={setApi}
                                >
                                    <CarouselContent>
                                        {carouselImages.map((img, index) => (
                                            <CarouselItem key={index} className="basis-3/4 sm:basis-1/2">
                                                <div className="p-2">
                                                    <div className="h-60 sm:h-72 rounded-xl overflow-hidden">
                                                        <img
                                                            src={img}
                                                            alt="carousel"
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <CarouselPrevious className="left-0 top-full mt-5" />
                                    <CarouselNext className="left-10 top-full mt-5" />
                                </Carousel>

                                <div className="flex justify-end gap-3 mt-3 w-full">
                                    {carouselImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => api?.scrollTo(index)}
                                            className={`h-3 w-3 rounded-full transition-all ${selectedIndex === index
                                                ? "bg-[#e7d4b5] scale-125"
                                                : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 flex justify-center mt-3">
                                <ShowDetails text="View Gallery" />
                            </div>

                        </div>
                    </div>



                    <div className="w-full bg-[#f5f1e9] py-10">
                        <div className="max-w-7xl mx-auto px-6">

                            {/* SECTION TITLE */}
                            <h2 className="text-4xl sm:text-5xl font-semibold text-center text-black/80 mb-8 tracking-wide">
                                Wish A Wish
                                <div className="w-48 sm:w-64 mx-auto">
                                    <AnimateSvg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 225 43"
                                        className="my-svg-animation"
                                        path="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
                                        strokeColor="#e0bfb2"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        animationDuration={1.5}
                                        animationDelay={0}
                                        animationBounce={0.3}
                                        reverseAnimation={false}
                                        enableHoverAnimation={false}
                                    />
                                </div>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* ───────────────────── LEFT: WISHES CAROUSEL ───────────────────── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="
    w-full 
    bg-[#faf7ef]/90 
    backdrop-blur-xl 
    rounded-3xl 
    shadow-xl 
    border border-black/10 
    p-10 
    flex flex-col
    order-2 lg:order-1
  "
                                >
                                    <h3 className="text-2xl font-semibold text-black/80 mb-6">
                                        Wishes Preview
                                    </h3>

                                    {/* SCROLLABLE GRID (6 max visible) */}
                                    <div className="overflow-y-auto max-h-[340px] pr-3 pb-2">
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                "Wishing you a lifetime of love and happiness!",
                                                "So happy for you both — congratulations!",
                                                "May your marriage be filled with endless joy.",
                                                "Can’t wait to celebrate with you!",
                                                "Your love story is truly beautiful — congratulations!",
                                                "Wishing you endless joy in your new journey together!",
                                                "Extra wish — to show scroll!",
                                                "Another extra wish!",
                                            ].map((wish, i) => (
                                                <div
                                                    key={i}
                                                    className="
            bg-linear-to-br 
            from-[#faf7ef] 
            to-[#f3ece1] 
            border border-black/10 
            rounded-2xl 
            shadow-md 
            p-5 
            hover:shadow-xl 
            transition-all 
            duration-300
          "
                                                >
                                                    <p className="text-black/70 text-xl lg:text-2xl leading-relaxed">
                                                        {wish}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BUTTON AT BOTTOM */}
                                    <div className="mt-8 flex justify-end">
                                        <ShowDetails text="View All Wishes" onClick={() => navigate("/wishes")} />
                                    </div>
                                </motion.div>

                                {/* ───────────────────── RIGHT: GUEST MESSAGE FORM ───────────────────── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="
    w-full 
    bg-[#faf7ef]/90 
    backdrop-blur-xl 
    rounded-3xl 
    shadow-xl 
    border border-black/10 
    p-10 
    flex flex-col
    order-1 lg:order-2
  "
                                >
                                    <h3 className="text-2xl font-semibold text-black/80 mb-6">
                                        Leave a Wish
                                    </h3>

                                    <form className="space-y-6 flex-1">
                                        <div>
                                            <label className="block text-black/80 mb-1 font-medium">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-black/20 bg-white/70"
                                                placeholder="Enter your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-black/80 mb-1 font-medium">
                                                Your Message
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-xl border border-black/20 bg-white/70"
                                                placeholder="Write your wishes..."
                                            ></textarea>
                                        </div>
                                    </form>

                                    {/* BUTTON AT BOTTOM */}
                                    <div className="mt-8 flex justify-end">
                                        <ShowDetails text="Send Message" />
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </div>

                    <div
                        className="
        w-full 
        py-6 
        bg-linear-to-r 
        from-[#f5ede2] 
        via-[#f7e7dd] 
        to-[#f3dfd8]
        border-t 
        border-black/10
        text-center
    "
                    >
                        <span className="text-black/60 tracking-wide text-base sm:text-lg">
                            © {new Date().getFullYear()} — Crafted with love for my brother’s engagement
                        </span>

                        <Heart className="inline-block align-middle ml-1 w-4 h-4 text-rose-400 fill-rose-300/60" />
                    </div>
                </>
            }
        </>
    );
}



