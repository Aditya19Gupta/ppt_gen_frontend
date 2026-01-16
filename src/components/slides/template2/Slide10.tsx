import Image from "next/image";

export default function Slide1() {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#113029] overflow-hidden px-16">
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto invert"
          width={160}
          height={32}
        />
      </div>
      <div className="absolute top-1/3">
        <h1 className="text-8xl text-white font-extrabold">Thank you!</h1>
        <p className="text-2xl text-white font-normal mt-10  w-3/4">If there’s any question please kindly to ask me. <span className="font-semibold">Let’s Discuss</span></p>
      </div>
    </div>
  );
}
