import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
  width?: string;
  height?: string;
}

function Logo({ className, width = 'w-1/4', height = 'h-[300px]' }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Logo"
      className={`select-none ${width} ${height} ${className}`}
    />
  );
}

export default Logo;