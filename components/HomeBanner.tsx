import React from "react";
import Title from "./Title";

const HomeBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Title className="uppercase text-3xl md:text-4xl font-bold text-center text-[--foreground]">
        100% Organic Essentials
      </Title>
      <p className="text-sm text-center font-medium max-w-[480px] text-foreground/80">
        Discover pure, chemical-free goodness with Desi Home. Shop premium
        organic products for a healthier lifestyle.
      </p>
    </div>
  );
};

export default HomeBanner;
