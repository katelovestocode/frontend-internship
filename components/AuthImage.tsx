import Image from "next/image";

const AuthImage = () => {
  return (
    <div className="flex items-center w-600">
      <Image
        src="/images/auth-round-min.png"
        alt="background"
        layout="responsive"
        width={418}
        height={427}
      />
    </div>
  );
};

export default AuthImage;
