"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-3xl font-bold">{title}</div>
      <div className="font-light text-[#737373]">{subtitle}</div>
    </div>
  );
};

export default Heading;
