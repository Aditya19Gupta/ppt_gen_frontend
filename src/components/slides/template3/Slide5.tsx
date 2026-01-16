"use client";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Slide5Props {
  title?: string;
  subtitle?: string;
  bar1Title?: string;
  bar1Value: string;
  bar2Title?: string;
  bar2Value: string;
  bar3Title?: string;
  bar3Value: string;
  item1Title?: string;
  item1Desc?: string;
  item2Title?: string;
  item2Desc?: string;
  item3Title?: string;
  item3Desc?: string;
  item4Title?: string;
  item4Desc?: string;
  imageLink1?: string;
  imageLink2?: string;
  imageLink3?: string;
}

export default function Slide5({
  title,
  subtitle,
  bar1Title,
  bar1Value,
  bar2Title,
  bar2Value,
  bar3Title,
  bar3Value,
  item1Title,
  item1Desc,
  item2Title,
  item2Desc,
  item3Title,
  item3Desc,
  item4Title,
  item4Desc,
  imageLink1,
  imageLink2,
  imageLink3,
}: Slide5Props) {
  const [bar1AnimatedValue, setBar1AnimatedValue] = useState(0);
  const [bar2AnimatedValue, setBar2AnimatedValue] = useState(0);
  const [bar3AnimatedValue, setBar3AnimatedValue] = useState(0);

  useEffect(() => {
    const targetValue1 = parseInt(bar1Value);
    const targetValue2 = parseInt(bar2Value);
    const targetValue3 = parseInt(bar3Value);

    const duration = 1500; // 1.5 seconds animation
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setBar1AnimatedValue(Math.floor(targetValue1 * progress));
      setBar2AnimatedValue(Math.floor(targetValue2 * progress));
      setBar3AnimatedValue(Math.floor(targetValue3 * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setBar1AnimatedValue(targetValue1);
        setBar2AnimatedValue(targetValue2);
        setBar3AnimatedValue(targetValue3);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [bar1Value, bar2Value, bar3Value]);

  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-9 gap-3 h-[85vh]">
        <div className="col-span-4 px-16 pt-16">
          <div className="flex flex-col items-start mb-20">
            <h1 className="text-4xl font-extrabold text-[#545A61] leading-relaxed max-w-4xl mb-5">
              {title}
            </h1>
            <p className="text-sm text-[#113029] font-light mb-3">{subtitle}</p>
            <Separator className="max-w-10 h-1 border border-[#113029] text-center" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#545A61]">{bar1Title}</p>
              <p className="text-sm text-[#545A61]">{bar1AnimatedValue}%</p>
            </div>
            <Progress className="bg-gray-300 mb-5" value={bar1AnimatedValue} />
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#545A61]">{bar2Title}</p>
              <p className="text-sm text-[#545A61]">{bar2AnimatedValue}%</p>
            </div>
            <Progress className="bg-gray-300 mb-5" value={bar2AnimatedValue} />
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#545A61]">{bar3Title}</p>
              <p className="text-sm text-[#545A61]">{bar3AnimatedValue}%</p>
            </div>
            <Progress className="bg-gray-300" value={bar3AnimatedValue} />
          </div>
        </div>
        <div className="col-span-2 h-full bg-[#2D3139]">
          <div className="flex flex-col h-full">
            {imageLink1 && (
              <Image 
                key="image1" 
                src={imageLink1} 
                alt="Project progress image 1" 
                width={400} 
                height={400} 
                className="object-cover h-1/3 w-full"
              />
            )}
            {imageLink2 && (
              <Image 
                key="image2" 
                src={imageLink2} 
                alt="Project progress image 2" 
                width={400} 
                height={400} 
                className="object-cover h-1/3 w-full"
              />
            )}
            {imageLink3 && (
              <Image 
                key="image3" 
                src={imageLink3} 
                alt="Project progress image 3" 
                width={400} 
                height={400} 
                className="object-cover h-1/3 w-full"
              />
            )}
          </div>
        </div>
        <div className="col-span-3 h-full">
          <div className="flex flex-col gap-4 justify-end h-full pb-20 w-full">
            {[
              { title: item1Title, desc: item1Desc },
              { title: item2Title, desc: item2Desc },
              { title: item3Title, desc: item3Desc },
              { title: item4Title, desc: item4Desc },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-5 w-full"
              >
                <h1 className="text-gray-400 text-4xl font-extrabold">
                  0{index + 1}
                </h1>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
