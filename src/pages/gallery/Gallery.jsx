import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AnimateSvg } from "@/components/ui/AnimateSvgUnderLine";
import ShowDetails from "@/components/ui/ShowDetails";
import { useNavigate } from "react-router";
import useImages from "@/hooks/useImages"; // Import the hook
import { Loader2 } from "lucide-react"; // Assuming you have this for loading

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { images, loading, error } = useImages(); // Use the hook to fetch images

  // Remove the static images array

  return (
    <div className="bg-[#f0edde] min-h-screen">
      <div className="p-6 max-w-7xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl font-semibold mb-8 text-center tracking-tight text-black/80">
          Photo Gallery
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
        </h1>

        {/* Loading and Error Handling */}
        {loading && (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin mr-2" />
            <p className="text-black/60">Loading images...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-32">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
        {/* No Images */}
        {!loading && !error && images.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-black/60 text-lg">No images yet — add some to get started.</p>
          </div>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div
            className="
              grid 
              grid-cols-1
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-5
            "
          >
            {images.map((img, index) => (
              <div
                key={img.id || index} // Use img.id if available, else index
                className="
                  relative 
                  rounded-2xl 
                  overflow-hidden 
                  cursor-pointer 
                  shadow-md 
                  bg-white 
                  transition-all 
                  duration-300 
                  group
                  hover:shadow-xl 
                  hover:scale-[1.02]
                  hover:ring-2
                  hover:ring-rose-300/40
                "
              >
                <img
                  src={img.url} // Use the URL from Firebase
                  alt={img.fileName || `Image ${index}`}
                  className="
                    w-full 
                    h-96 
                    object-cover 
                    transition-transform 
                    duration-500 
                    group-hover:scale-110
                  "
                />
                {/* Preview Button - Appears on Hover */}
                <button
                  onClick={() => setSelectedImage(img.url)}
                  className="
                    absolute 
                    inset-0 
                    flex 
                    items-center 
                    justify-center 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-all 
                    duration-300 
                    rounded-2xl
                    bg-black/40 
                  "
                >
                  <span
                    className="
                      px-6 
                      py-2 
                      rounded-lg 
                      bg-white/80 
                      text-black 
                      font-semibold 
                      text-base 
                      shadow-lg
                      hover:text-white
                      hover:bg-yellow-600
                      border 
                      border-white/60
                      transition-all 
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    Preview
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <ShowDetails text="Back to Home" onClick={() => navigate("/")} />
        </div>

        {/* Image Preview Dialog */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-3xl p-0 ">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-3xl font-bold">Image Preview</DialogTitle>
                <DialogDescription className="sr-only">عرض الصورة المكبرة للشقة</DialogDescription>
              </DialogHeader>
              <img
                src={selectedImage}
                alt="معاينة الصورة"
                className="w-full h-auto object-cover rounded-lg max-h-[70vh]"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
