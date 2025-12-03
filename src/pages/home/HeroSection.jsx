import weddingImg from "@/assets/images/img4.jpeg";
import { AnimateSvg } from "@/components/ui/AnimatedSvgMobile";
import CircularText from "@/components/ui/CircularText";
import ShowDetails from "@/components/ui/ShowDetails";
import ViewGallery from "@/components/ui/ViewGallery";
import { motion } from "framer-motion";
import centerImg from "@/assets/images/letters2.png"; 
export default function HeroSection() {
    return (<>
        <div className="min-h-screen bg-[#f0edde] flex items-center justify-center pb-10 lg:pb-0">
            <div className="w-full max-w-7xl mx-auto  px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">

                {/* LEFT CONTENT LIKE REFERENCE */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="space-y-4 mb-10 lg:mb-0 text-center lg:text-left"
                >
                    <h1 className="text-4xl text-black leading-tight mt-10 sm:mt-0">
                        With joyful hearts<br />
                        we invite you to share<br />
                        in the celebration of<br />
                        our love and new beginning.
                    </h1>

                    <p className="text-black/70 text-2xl lg:w-64 w-full">
                        Capturing the moments that will captivate your heart
                    </p>

                    <div className="pt-5 text-center lg:text-left">
                        <ViewGallery
                            className="font-semibold tracking-wide"
                            onClick={() => {
                                document
                                    .getElementById("view-gallery")
                                    .scrollIntoView({ behavior: "smooth" });
                            }}
                        />
                    </div>
                </motion.div>

                <div className="relative flex items-center justify-center">

                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-0 lg:top-3 -translate-y-1/2 right-1/2 translate-x-1/2 z-50"
                    >
                        <CircularText
                            text="Join Us On Our Special Day "
                            spinDuration={20}
                            onHover="speedUp"
                            centerImage={centerImg}
                            className="text-black/60"
                        />
                    </motion.div>
                    {/* TOP HALF ARC BORDER */}
                    <div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 
                        lg:w-[430px] md:w-[380px]
                                w-[325px] h-[170px] md:h-[220px] lg:h-[252px]
                        border-t-4 border-l-4 border-r-4
                        border-black/30 rounded-t-full"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(to bottom,transparent, black 90%, transparent)",
                            maskImage:
                                "linear-gradient(to bottom, transparent, black 90%, transparent)",
                        }}
                    ></div>

                    {/* LEFT aligned ARC BORDER */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 lg:-translate-y-15 -translate-y-10
                        lg:w-[430px] md:w-[380px]
                               w-[325px] h-26 lg:h-24
                        border-l-4 border-black/30"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(to bottom,transparent, black 40%, transparent)",
                            maskImage:
                                "linear-gradient(to bottom,transparent, black 40%, transparent)",
                        }}
                    ></div>

                    {/* VERTICAL TEXT LEFT */}
                    <div className="absolute left-1/2 -translate-x-1/2 translate-y-8 -ml-3.5
                        lg:w-[430px] md:w-[380px]
                               w-[325px] h-36
                                    rotate-180 
                                    [writing-mode:vertical-rl] 
                                    text-black/70 text-lg tracking-wide font-semibold">
                        Save The Date
                    </div>

                    {/* VERTICAL TEXT RIGHT */}
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-2 ml-3
                        lg:w-[430px] md:w-[380px]
                               w-[325px] h-36 
                                    [writing-mode:vertical-rl] 
                                    text-black/70 text-lg tracking-wide font-semibold">
                        9 • 12 • 2025
                    </div>

                    {/* IMAGE */}
                    <img
                        src={weddingImg}
                        alt="wedding"
                        loading="lazy"
                        className="lg:w-[430px] md:w-[340px] md:h-[520px]
                                lg:h-[600px] w-[280px] 
                                h-[420px] 
                                   object-cover 
                                   object-center 
                                   rounded-full col-span-2"
                    />
                </div>

                {/* RIGHT CONTENT (CREATIVE WEDDING STYLE) */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-5 pl-0 lg:pl-20 text-black/80 text-center lg:text-left"
                >
                    <div className="relative">
                        <h2 className="text-5xl font-semibold tracking-wide">
                            Youssef <span className="text-black/40">&</span> Aya
                            <br />
                            <span>engagement</span>
                        </h2>

                        <div className="absolute -top-22 right-10 translate-x-1/2 -translate-y-1/2 rotate-155 w-0 sm:w-64 mx-auto">
                            <AnimateSvg
                                width="100%"
                                height="100%"
                                viewBox="0 0 355 162"
                                className="my-svg-animation"
                                path="M3 153.9C19.7648 151.422 58.3853 148.645 58.3853 123.767C58.3853 109.758 41.9931 109.583 35.4673 119.947C29.8677 128.841 29.3802 151.014 41.6212 155.385C68.0833 164.836 96.3337 155.089 121.41 146.367C158.021 133.632 195.283 106.274 215.841 72.7318C223.827 59.7017 248.721 3.98332 214.143 3.02276C159.312 1.49957 148.663 76.8016 170.111 114.748C179.098 130.649 200.663 140.818 217.963 143.29C237.073 146.02 266.527 131.63 270.271 111.035C273.351 94.0976 254.758 100.754 250.43 111.884C244.084 128.203 258.692 140.196 273.773 140.531C298.453 141.08 318.113 127.233 334.463 109.974C339.288 104.881 348.912 91.2687 350.484 84.1909C351.915 77.7539 351.661 81.7626 350.697 86.1007C349.794 90.1648 352.5 94.2726 352.5 98.5146C352.5 100.006 350.591 90.7585 350.591 88.0105C350.591 74.942 333.087 85.5908 325.763 87.0556"
                                strokeColor="oklch(71.2% 0.194 13.428)"
                                strokeWidth={2}
                                strokeLinecap="round"
                                animationDuration={1.5}
                                animationDelay={0.5}
                                animationBounce={0.3}
                                reverseAnimation={false}
                                enableHoverAnimation={false}

                            />
                        </div>
                        <div className="absolute -top-20 -translate-y-1/2 rotate-160 w-33 sm:w-0 mx-auto">
                            <AnimateSvg
                                width="100%"
                                height="100%"
                                viewBox="0 0 97 115"
                                className="my-svg-animation"
                                path="M3 108.48C15.3006 111.796 56.5166 119.169 57.3999 94.4354C57.6501 87.4301 49.7613 76.0749 41.3999 80.0354C30.25 85.3168 41.8105 99.1945 49.3999 100.835C69.3933 105.158 87.4937 84.6447 92.5111 67.5021C96.7246 53.106 93.3175 37.3222 88.1555 23.6798C85.7341 17.2804 80.8805 12.9113 78.2 6.87984C74.053 -2.45097 84.2122 7.76023 89.3111 9.99094C99.7295 14.5489 82.5828 7.67225 78.9999 6.07983C73.0883 3.4524 70.5472 19.4382 68.6 25.2798"
                                strokeColor="oklch(71.2% 0.194 13.428)"
                                strokeWidth={2}
                                strokeLinecap="round"
                                animationDuration={1.5}
                                animationDelay={0}
                                animationBounce={0.3}
                                reverseAnimation={false}
                                enableHoverAnimation={false}
                            />
                        </div>
                    </div>


                    <p className="leading-relaxed text-black/80 tracking-wide text-2xl">
                        Join us as we celebrate the beginning of our forever, surrounded by the ones we love.<br />
                        <span className="font-bold text-black/90 text-2xl">
                            Your presence means the world to us.
                        </span>
                    </p>

                    <div className="flex gap-2 items-center justify-center lg:justify-start">
                        <ShowDetails
                            text="show Details"
                            onClick={() => {
                                document
                                    .getElementById("show-details")
                                    .scrollIntoView({ behavior: "smooth" });
                            }}
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    </>
    );
}
